const Decimal = require("../lib/decimal");
const prisma = require("../lib/prisma");
const crypto = require("crypto");
const {
  getGames: fetchGames,
  getGame: fetchGame,
  launchGame: launchGameApi,
  launchDemo: launchDemoApi
} = require("../lib/sweeppark");

const SIGNING_SECRETS = [
  process.env.SWEEPPARK_SIGNING_SECRET,
  process.env.SWEEPPARK_SIGNING_SECRET_PREVIOUS
].filter(Boolean);

/**
 * Verifies the SweepPark HMAC signature on the raw request body.
 * Returns { valid: boolean, errorCode?: string }
 */
function verifySignature(req) {
  const timestamp = req.get("x-sweep-park-timestamp");
  const nonce = req.get("x-sweep-park-nonce");
  const signature = req.get("x-sweep-park-signature") || "";

  if (!timestamp || !nonce || !signature) return { valid: false, errorCode: "invalidSignature" };

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return { valid: false, errorCode: "invalidSignature" };

  const rawBody = req.body.toString("utf8");
  const payload = `${timestamp}.${nonce}.${rawBody}`;

  const valid = SIGNING_SECRETS.some((secret) => {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    // Check buffer lengths before timingSafeEqual
    if (expected.length !== signature.length) return false;
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  });

  if (!valid) return { valid: false, errorCode: "invalidSignature" };
  return { valid: true };
}

/**
 * Claims a nonce atomically via unique constraint.
 * Returns { allowed: boolean, errorCode?: string }
 * - If nonce not seen: stores it, returns allowed=true
 * - If nonce already exists with SAME bodyHash: returns allowed=true (legitimate retry)
 * - If nonce already exists with DIFFERENT bodyHash: returns allowed=false with errorCode "invalidSignature" (tampering)
 */
async function claimNonce(nonce, bodyHash) {
  try {
    await prisma.nonce.create({ data: { nonce, bodyHash } });
    return { allowed: true };
  } catch (err) {
    if (err.code === "P2002") {
      // Nonce already exists - check if bodyHash matches
      const existing = await prisma.nonce.findUnique({ where: { nonce } });
      if (existing && existing.bodyHash === bodyHash) {
        // Same body - legitimate retry allowed
        return { allowed: true };
      }
      // Different body - tampering detected
      return { allowed: false, errorCode: "invalidSignature" };
    }
    throw err;
  }
}

/**
 * Computes SHA256 hash of body for nonce tracking
 */
function hashBody(body) {
  return crypto.createHash("sha256").update(body).digest("hex");
}

/**
 * Logs correlationId for wallet call tracing
 */
function logCorrelation(call, action, correlationId) {
  const cid = correlationId || call.meta?.correlationId;
  if (cid) {
    console.log(JSON.stringify({
      correlationId: cid,
      txRef: call.txRef,
      action,
      playerRef: call.playerRef,
      currency: call.currency
    }));
  }
}

/**
 * Clean up old nonces (fire-and-forget, throttled to once per 30 seconds)
 */
let lastNonceCleanup = 0;
const NONCE_CLEANUP_INTERVAL_MS = 30 * 1000; // 30 seconds

function cleanupOldNonces() {
  const now = Date.now();
  if (now - lastNonceCleanup < NONCE_CLEANUP_INTERVAL_MS) {
    return; // throttle
  }
  lastNonceCleanup = now;

  const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);
  prisma.nonce.deleteMany({
    where: { createdAt: { lt: fiveMinutesAgo } }
  }).catch(() => {}); // fire-and-forget
}

/**
 * Validates currency is GC or SC
 */
function validateCurrency(currency) {
  return currency === "GC" || currency === "SC";
}

/**
 * Validates amount matches /^\d+(\.\d{1,8})?$/ (non-negative, max 8 decimals)
 */
function validateAmount(amount) {
  return /^\d+(\.\d{1,8})?$/.test(amount);
}

/**
 * GET /casino-games/balance
 * Returns the player's current balance in GC or SC.
 */
async function balance(req, res) {
  const correlationId = req.get("x-sweep-park-correlation-id");

  try {
    const sigResult = verifySignature(req);
    if (!sigResult.valid) {
      return res.json({ code: sigResult.errorCode, balance: "0.00000000", currency: "GC" });
    }

    const rawBody = req.body.toString("utf8");
    const nonce = req.get("x-sweep-park-nonce");
    const bodyHash = hashBody(rawBody);

    // Claim nonce atomically
    const nonceResult = await claimNonce(nonce, bodyHash);
    if (!nonceResult.allowed) {
      return res.json({ code: nonceResult.errorCode, balance: "0.00000000", currency: "GC" });
    }

    let call;
    try {
      call = JSON.parse(rawBody);
    } catch {
      return res.json({ code: "invalidSignature", balance: "0.00000000", currency: "GC" });
    }

    logCorrelation(call, "balance", correlationId);

    // Fast-path idempotency check
    const seen = await prisma.walletCall.findUnique({ where: { txRef: call.txRef } });
    if (seen) {
      return res.json({ code: seen.resultCode, balance: seen.balanceAfter, currency: seen.currency });
    }

    // Validate currency
    if (!validateCurrency(call.currency)) {
      return res.json({ code: "currencyNotSupported", balance: "0.00000000", currency: call.currency || "GC" });
    }

    const user = await prisma.user.findUnique({ where: { id: call.playerRef } });

    if (!user) {
      return res.json({ code: "playerNotFound", balance: "0.00000000", currency: call.currency });
    }

    const bal = call.currency === "SC" ? user.scBalance : user.gcBalance;
    const balanceFixed = new Decimal(bal).toFixed(8);

    // Store the balance check as a wallet call for idempotency
    await prisma.walletCall.create({
      data: {
        txRef: call.txRef,
        playerRef: user.id,
        currency: call.currency,
        action: "balance",
        amount: "0.00000000",
        status: "ok",
        resultCode: "ok",
        balanceAfter: balanceFixed,
        meta: call.meta
      }
    });

    cleanupOldNonces();

    return res.json({ code: "ok", balance: balanceFixed, currency: call.currency });
  } catch (err) {
    console.error("Balance error:", err);
    return res.json({ code: "systemError", balance: "0.00000000", currency: "GC" });
  }
}

/**
 * POST /casino-games/bet
 * Debits a stake from the player's balance.
 */
async function bet(req, res) {
  const correlationId = req.get("x-sweep-park-correlation-id");

  const sigResult = verifySignature(req);
  if (!sigResult.valid) {
    return res.json({ code: sigResult.errorCode, balance: "0.00000000", currency: "GC" });
  }

  const rawBody = req.body.toString("utf8");
  const nonce = req.get("x-sweep-park-nonce");
  const bodyHash = hashBody(rawBody);

  // Claim nonce atomically
  const nonceResult = await claimNonce(nonce, bodyHash);
  if (!nonceResult.allowed) {
    return res.json({ code: nonceResult.errorCode, balance: "0.00000000", currency: "GC" });
  }

  let call;
  try {
    call = JSON.parse(rawBody);
  } catch {
    return res.json({ code: "invalidSignature", balance: "0.00000000", currency: "GC" });
  }

  logCorrelation(call, "bet", correlationId);

  // Validate currency
  if (!validateCurrency(call.currency)) {
    return res.json({ code: "currencyNotSupported", balance: "0.00000000", currency: call.currency || "GC" });
  }

  // Validate amount
  if (!validateAmount(call.amount)) {
    return res.json({ code: "systemError", balance: "0.00000000", currency: call.currency });
  }

  try {
    const answer = await prisma.$transaction(async (tx) => {
      // 1. Fast-path idempotency check (for already-committed calls)
      const seen = await tx.walletCall.findUnique({ where: { txRef: call.txRef } });
      if (seen) return { code: seen.resultCode, balance: seen.balanceAfter, currency: seen.currency, operatorTxRef: seen.txRef };

      // 2. Lock user for update
      const [user] = await tx.$queryRawUnsafe('SELECT * FROM "User" WHERE id = $1 FOR UPDATE', call.playerRef);
      if (!user) return { code: "playerNotFound", balance: "0.00000000", currency: call.currency };

      // 3. Re-check idempotency AFTER lock (race condition fix)
      const seenAfterLock = await tx.walletCall.findUnique({ where: { txRef: call.txRef } });
      if (seenAfterLock) return { code: seenAfterLock.resultCode, balance: seenAfterLock.balanceAfter, currency: seenAfterLock.currency, operatorTxRef: seenAfterLock.txRef };

      const currentBalance = new Decimal(call.currency === "SC" ? user.scBalance : user.gcBalance);
      const betAmount = new Decimal(call.amount);

      // 4. Check funds
      if (currentBalance.lt(betAmount)) {
        const decline = { code: "insufficientFunds", balance: currentBalance.toFixed(8), currency: call.currency };
        await tx.walletCall.create({
          data: {
            txRef: call.txRef, playerRef: user.id, currency: call.currency, action: "bet",
            amount: call.amount, status: "declined", resultCode: decline.code,
            balanceAfter: decline.balance, meta: call.meta
          }
        });
        return decline;
      }

      // 5. Apply debit
      const newBalance = currentBalance.sub(betAmount).toFixed(8);
      const balanceField = call.currency === "SC" ? "scBalance" : "gcBalance";

      await tx.user.update({
        where: { id: user.id },
        data: {
          [balanceField]: newBalance
        }
      });

      await tx.walletCall.create({
        data: {
          txRef: call.txRef, playerRef: user.id, currency: call.currency, action: "bet",
          amount: call.amount, status: "ok", resultCode: "ok",
          balanceAfter: newBalance, meta: call.meta
        }
      });

      return { code: "ok", balance: newBalance, currency: call.currency, operatorTxRef: call.txRef };
    });

    cleanupOldNonces();
    return res.json(answer);
  } catch (err) {
    console.error("Bet error:", err);
    return res.json({ code: "systemError", balance: "0.00000000", currency: call.currency });
  }
}

/**
 * POST /casino-games/win
 * Credits winnings to the player's balance.
 */
async function win(req, res) {
  const correlationId = req.get("x-sweep-park-correlation-id");

  const sigResult = verifySignature(req);
  if (!sigResult.valid) {
    return res.json({ code: sigResult.errorCode, balance: "0.00000000", currency: "GC" });
  }

  const rawBody = req.body.toString("utf8");
  const nonce = req.get("x-sweep-park-nonce");
  const bodyHash = hashBody(rawBody);

  // Claim nonce atomically
  const nonceResult = await claimNonce(nonce, bodyHash);
  if (!nonceResult.allowed) {
    return res.json({ code: nonceResult.errorCode, balance: "0.00000000", currency: "GC" });
  }

  let call;
  try {
    call = JSON.parse(rawBody);
  } catch {
    return res.json({ code: "invalidSignature", balance: "0.00000000", currency: "GC" });
  }

  logCorrelation(call, "win", correlationId);

  // Validate currency
  if (!validateCurrency(call.currency)) {
    return res.json({ code: "currencyNotSupported", balance: "0.00000000", currency: call.currency || "GC" });
  }

  // Validate amount
  if (!validateAmount(call.amount)) {
    return res.json({ code: "systemError", balance: "0.00000000", currency: call.currency });
  }

  try {
    const answer = await prisma.$transaction(async (tx) => {
      // Fast-path idempotency check
      const seen = await tx.walletCall.findUnique({ where: { txRef: call.txRef } });
      if (seen) return { code: seen.resultCode, balance: seen.balanceAfter, currency: seen.currency, operatorTxRef: seen.txRef };

      // Lock user for update
      const [user] = await tx.$queryRawUnsafe('SELECT * FROM "User" WHERE id = $1 FOR UPDATE', call.playerRef);
      if (!user) return { code: "playerNotFound", balance: "0.00000000", currency: call.currency };

      // Re-check idempotency AFTER lock
      const seenAfterLock = await tx.walletCall.findUnique({ where: { txRef: call.txRef } });
      if (seenAfterLock) return { code: seenAfterLock.resultCode, balance: seenAfterLock.balanceAfter, currency: seenAfterLock.currency, operatorTxRef: seenAfterLock.txRef };

      const currentBalance = new Decimal(call.currency === "SC" ? user.scBalance : user.gcBalance);
      const winAmount = new Decimal(call.amount);
      const newBalance = currentBalance.add(winAmount).toFixed(8);
      const balanceField = call.currency === "SC" ? "scBalance" : "gcBalance";

      await tx.user.update({
        where: { id: user.id },
        data: {
          [balanceField]: newBalance
        }
      });

      await tx.walletCall.create({
        data: {
          txRef: call.txRef, playerRef: user.id, currency: call.currency, action: "win",
          amount: call.amount, status: "ok", resultCode: "ok",
          balanceAfter: newBalance, meta: call.meta
        }
      });

      return { code: "ok", balance: newBalance, currency: call.currency, operatorTxRef: call.txRef };
    });

    cleanupOldNonces();
    return res.json(answer);
  } catch (err) {
    console.error("Win error:", err);
    return res.json({ code: "systemError", balance: "0.00000000", currency: call.currency });
  }
}

/**
 * POST /casino-games/rollback
 * Reverses an earlier bet or win.
 */
async function rollback(req, res) {
  const correlationId = req.get("x-sweep-park-correlation-id");

  const sigResult = verifySignature(req);
  if (!sigResult.valid) {
    return res.json({ code: sigResult.errorCode, balance: "0.00000000", currency: "GC" });
  }

  const rawBody = req.body.toString("utf8");
  const nonce = req.get("x-sweep-park-nonce");
  const bodyHash = hashBody(rawBody);

  // Claim nonce atomically
  const nonceResult = await claimNonce(nonce, bodyHash);
  if (!nonceResult.allowed) {
    return res.json({ code: nonceResult.errorCode, balance: "0.00000000", currency: "GC" });
  }

  let call;
  try {
    call = JSON.parse(rawBody);
  } catch {
    return res.json({ code: "invalidSignature", balance: "0.00000000", currency: "GC" });
  }

  logCorrelation(call, "rollback", correlationId);

  // Validate currency
  if (!validateCurrency(call.currency)) {
    return res.json({ code: "currencyNotSupported", balance: "0.00000000", currency: call.currency || "GC" });
  }

  try {
    const answer = await prisma.$transaction(async (tx) => {
      // 1. Fast-path duplicate check
      const seen = await tx.walletCall.findUnique({ where: { txRef: call.txRef } });
      if (seen) return { code: seen.resultCode, balance: seen.balanceAfter, currency: seen.currency, operatorTxRef: seen.txRef };

      // 2. Find transaction to reverse
      const original = await tx.walletCall.findUnique({ where: { txRef: call.reversesTxRef } });
      if (!original || original.status !== "ok") {
        // We only rollback successful movements. If declined or noop, it moved nothing.
        // Return current balance for nothingToRollback.
        const user = await tx.user.findUnique({ where: { id: call.playerRef } });
        const bal = user ? (call.currency === "SC" ? user.scBalance : user.gcBalance) : "0.00000000";
        const balanceFixed = new Decimal(bal).toFixed(8);
        // Store this rollback as "noop" so its txRef is deduped
        await tx.walletCall.create({
          data: {
            txRef: call.txRef,
            playerRef: call.playerRef,
            currency: call.currency,
            action: "rollback",
            amount: "0.00000000",
            reversesTxRef: call.reversesTxRef,
            status: "noop",
            resultCode: "nothingToRollback",
            balanceAfter: balanceFixed,
            meta: call.meta
          }
        });
        return { code: "nothingToRollback", balance: balanceFixed, currency: call.currency };
      }

      // 3. Check if already rolled back (by another rollback with status "ok")
      const alreadyRolledBack = await tx.walletCall.findFirst({
        where: { reversesTxRef: call.reversesTxRef, action: "rollback", status: "ok" }
      });
      if (alreadyRolledBack) {
        return { code: "duplicateIgnored", balance: alreadyRolledBack.balanceAfter, currency: alreadyRolledBack.currency };
      }

      // 4. Lock user and reverse using ORIGINAL playerRef, currency, amount
      const [user] = await tx.$queryRawUnsafe('SELECT * FROM "User" WHERE id = $1 FOR UPDATE', original.playerRef);
      if (!user) return { code: "playerNotFound", balance: "0.00000000", currency: original.currency };

      // 5. Re-check duplicate AFTER lock (race condition fix)
      const seenAfterLock = await tx.walletCall.findUnique({ where: { txRef: call.txRef } });
      if (seenAfterLock) return { code: seenAfterLock.resultCode, balance: seenAfterLock.balanceAfter, currency: seenAfterLock.currency, operatorTxRef: seenAfterLock.txRef };

      // Re-check alreadyRolledBack after lock
      const alreadyRolledBackAfterLock = await tx.walletCall.findFirst({
        where: { reversesTxRef: call.reversesTxRef, action: "rollback", status: "ok" }
      });
      if (alreadyRolledBackAfterLock) {
        return { code: "duplicateIgnored", balance: alreadyRolledBackAfterLock.balanceAfter, currency: alreadyRolledBackAfterLock.currency };
      }

      const currentBalance = new Decimal(call.currency === "SC" ? user.scBalance : user.gcBalance);
      const originalAmount = new Decimal(original.amount);

      // If it was a bet, we add it back. If it was a win, we take it away.
      let newBalance;
      if (original.action === "bet") {
        newBalance = currentBalance.add(originalAmount);
      } else if (original.action === "win") {
        newBalance = currentBalance.sub(originalAmount);
      } else {
        // Original was noop or something else - nothing to rollback
        const balanceFixed = currentBalance.toFixed(8);
        await tx.walletCall.create({
          data: {
            txRef: call.txRef,
            playerRef: original.playerRef,
            currency: original.currency,
            action: "rollback",
            amount: original.amount,
            reversesTxRef: call.reversesTxRef,
            status: "noop",
            resultCode: "nothingToRollback",
            balanceAfter: balanceFixed,
            meta: call.meta
          }
        });
        return { code: "nothingToRollback", balance: balanceFixed, currency: call.currency };
      }

      const balanceStr = newBalance.toFixed(8);
      const balanceField = call.currency === "SC" ? "scBalance" : "gcBalance";

      await tx.user.update({
        where: { id: user.id },
        data: {
          [balanceField]: balanceStr
        }
      });

      await tx.walletCall.create({
        data: {
          txRef: call.txRef, playerRef: original.playerRef, currency: original.currency, action: "rollback",
          amount: original.amount, reversesTxRef: call.reversesTxRef, status: "ok", resultCode: "ok",
          balanceAfter: balanceStr, meta: call.meta
        }
      });

      return { code: "ok", balance: balanceStr, currency: original.currency, operatorTxRef: call.txRef };
    });

    cleanupOldNonces();
    return res.json(answer);
  } catch (err) {
    console.error("Rollback error:", err);
    return res.json({ code: "systemError", balance: "0.00000000", currency: call.currency });
  }
}

/**
 * Maps games-api error codes to clean frontend messages.
 * @param {Error} err - Error from games-api with status and code
 * @returns {object} Clean error response
 */
function mapGamesApiError(err) {
  const errorMap = {
    "game.notFound": { status: 404, code: "gameNotFound", message: "Game not found" },
    "launch.providerUnavailable": { status: 503, code: "providerUnavailable", message: "Game provider is temporarily unavailable" },
    "launch.providerFailed": { status: 503, code: "providerUnavailable", message: "Game provider is temporarily unavailable" },
    "rateLimit.exceeded": { status: 429, code: "rateLimited", message: "Too many requests, please try again later" },
    "error.malformedJson": { status: 400, code: "badRequest", message: "Invalid request format" },
    "launch.currencyNotEnabled": { status: 400, code: "badRequest", message: "Currency not enabled for this game" },
    "launch.invalidIp": { status: 400, code: "badRequest", message: "Invalid IP address" },
    "launch.playerRefTooLong": { status: 400, code: "badRequest", message: "Player reference too long" },
    "launch.gameNotLaunchable": { status: 400, code: "badRequest", message: "Game cannot be launched" },
  };

  const mapped = errorMap[err.code] || { status: err.status || 500, code: err.code || "systemError", message: err.message || "An error occurred" };
  return mapped;
}

/**
 * GET /api/games
 * Returns paginated list of games with optional search and currency filtering.
 * Query params:
 * - q: search query (matches game name, studio)
 * - currency: filter by GC or SC (optional)
 * - limit: number of games per page (default 25, max 100)
 * - cursor: pagination cursor
 */
async function getGames(req, res) {
  try {
    const { q, currency, limit = 25, cursor } = req.query;

    // Fetch all games from database with search filter
    const where = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { studioName: { contains: q, mode: "insensitive" } },
        { slug: { contains: q, mode: "insensitive" } },
      ];
    }

    // Currency filtering: only show games that support the currency
    // For now, we'll include all games since we don't have currency-specific data in our cache
    // This could be extended to filter based on game tags or provider settings

    const games = await prisma.game.findMany({
      where,
      take: Math.min(parseInt(limit, 10), 100),
      skip: cursor ? 1 : 0,
      cursor: cursor ? { slug: cursor } : undefined,
      orderBy: { createdAt: "desc" },
    });

    // Filter by currency if needed (games that support the currency)
    // This is a placeholder - in reality you'd check game metadata or provider support

    // Build next cursor
    const nextCursor = games.length === parseInt(limit, 10) ? games[games.length - 1].slug : null;

    return res.json({
      data: games.map((g) => ({
        id: g.id,
        slug: g.slug,
        name: g.name,
        studio: { slug: g.studioSlug, name: g.studioName },
        categories: g.categories,
        icon: g.icon,
        thumbnails: g.thumbnails,
        rtp: g.rtp,
        volatility: g.volatility,
        tags: g.tags,
        maintenance: g.maintenance,
      })),
      pagination: {
        limit: parseInt(limit, 10),
        hasMore: !!nextCursor,
        nextCursor,
      },
    });
  } catch (err) {
    console.error("Get games error:", err);
    return res.status(500).json({ code: "systemError", message: "Failed to fetch games" });
  }
}

/**
 * GET /api/games/:slug
 * Returns a single game by slug.
 */
async function getGame(req, res) {
  try {
    const { slug } = req.params;

    const game = await prisma.game.findUnique({ where: { slug } });

    if (!game) {
      return res.status(404).json({ code: "gameNotFound", message: "Game not found" });
    }

    return res.json({
      data: {
        id: game.id,
        slug: game.slug,
        name: game.name,
        studio: { slug: game.studioSlug, name: game.studioName },
        categories: game.categories,
        icon: game.icon,
        thumbnails: game.thumbnails,
        rtp: game.rtp,
        volatility: game.volatility,
        tags: game.tags,
        maintenance: game.maintenance,
      },
    });
  } catch (err) {
    console.error("Get game error:", err);
    return res.status(500).json({ code: "systemError", message: "Failed to fetch game" });
  }
}

/**
 * POST /api/casino-games/launch
 * Launches a real-money game session.
 * Requires JWT authentication.
 * Body: { game, currency, returnUrl?, depositUrl? }
 * Returns: { gameUrl, sessionId }
 */
async function launchGame(req, res) {
  try {
    const userId = req.user?.userId;

    if (userId == null || String(userId).trim() === "") {
      return res.status(401).json({ code: "unauthorized", message: "Authentication required" });
    }

    const playerRef = String(userId);
    const { game, currency, returnUrl, depositUrl, mobile, language, country } = req.body || {};

    if (!game || !currency) {
      return res.status(400).json({ code: "badRequest", message: "game and currency are required" });
    }

    if (currency !== "GC" && currency !== "SC") {
      return res.status(400).json({ code: "badRequest", message: "Currency must be GC or SC" });
    }

    // Verify game exists in our catalogue
    const gameData = await prisma.game.findUnique({ where: { slug: game } });
    if (!gameData) {
      return res.status(404).json({ code: "gameNotFound", message: "Game not found" });
    }

    // Get real client IP (trust proxy)
    const ipAddress = req.ip || req.socket.remoteAddress;

    // Launch game via games-api
    const launchParams = {
      playerRef,
      game,
      currency,
      ipAddress,
      mobile: mobile || false,
      language: language || "en",
      country: country || "US",
      returnUrl: returnUrl || `${process.env.FRONTEND_ORIGIN || "https://casino-dusky-two.vercel.app"}/lobby`,
      depositUrl: depositUrl || `${process.env.FRONTEND_ORIGIN || "https://casino-dusky-two.vercel.app"}/deposit`,
    };

    const response = await launchGameApi(launchParams);

    return res.json({
      gameUrl: response.data.gameUrl,
      sessionId: response.data.sessionId,
    });
  } catch (err) {
    console.error("Launch game error:", err);

    // Map games-api errors to clean frontend messages
    if (err.status && err.code) {
      const mapped = mapGamesApiError(err);
      return res.status(mapped.status).json({ code: mapped.code, message: mapped.message });
    }

    return res.status(500).json({ code: "systemError", message: "Failed to launch game" });
  }
}

/**
 * POST /api/casino-games/launch/demo
 * Launches a demo game session (no auth required).
 * Body: { game, returnUrl? }
 * Returns: { gameUrl, sessionId }
 */
async function launchDemo(req, res) {
  try {
    const { game, returnUrl, mobile, language } = req.body;

    if (!game) {
      return res.status(400).json({ code: "badRequest", message: "game is required" });
    }

    // Verify game exists in our catalogue
    const gameData = await prisma.game.findUnique({ where: { slug: game } });
    if (!gameData) {
      return res.status(404).json({ code: "gameNotFound", message: "Game not found" });
    }

    // Get real client IP (trust proxy)
    const ipAddress = req.ip || req.socket.remoteAddress || "127.0.0.1";

    // Launch demo via games-api
    const launchParams = {
      game,
      ipAddress,
      mobile: mobile || false,
      language: language || "en",
      returnUrl: returnUrl || `${process.env.FRONTEND_ORIGIN || "https://casino-dusky-two.vercel.app"}/lobby`,
    };

    const response = await launchDemoApi(launchParams);

    return res.json({
      gameUrl: response.data.gameUrl,
      sessionId: response.data.correlationId, // Demo doesn't return sessionId, use correlationId
    });
  } catch (err) {
    console.error("Launch demo error:", err);

    // Map games-api errors to clean frontend messages
    if (err.status && err.code) {
      const mapped = mapGamesApiError(err);
      return res.status(mapped.status).json({ code: mapped.code, message: mapped.message });
    }

    return res.status(500).json({ code: "systemError", message: "Failed to launch demo" });
  }
}

module.exports = { balance, bet, win, rollback, getGames, getGame, launchGame, launchDemo, mapGamesApiError };
