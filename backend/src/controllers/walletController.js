const crypto = require("crypto");
const prisma = require("../lib/prisma");
const { soapRequest } = require("../lib/soapClient");

const TERMINAL_STATUS_MAP = {
  failed: "failed",
  returned: "returned",
  voided: "voided",
  expired: "expired",
};

function sendWalletError(res, err) {
  const status = err.status ? 502 : 500;
  return res.status(status).json({ error: err.message || "Something went wrong." });
}

function debugSoapWebhook(message, details) {
  if (process.env.DEBUG_SOAP_WEBHOOKS !== "true") {
    return;
  }

  console.log(`SOAP WEBHOOK ${message}:`, details);
}

function getCheckoutId(event) {
  return event?.id;
}

function getAmountCents(event, transaction) {
  return Number.isInteger(event?.charge?.amount_cents)
    ? event.charge.amount_cents
    : transaction.amountCents || 0;
}

function getChargeStatus(event) {
  return event?.charge?.status;
}

function getChargeId(event) {
  return event?.charge?.id;
}

async function ensureSoapCustomer(user) {
  if (user.soapCustomerId) {
    return user;
  }

  const data = await soapRequest("/api/v1/customers", {
    method: "POST",
    body: {
      first_name: user.name || user.username,
      last_name: "-",
      email: user.email,
    },
  });

  return prisma.user.update({
    where: { id: user.id },
    data: { soapCustomerId: data.id },
  });
}

async function createDeposit(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const soapUser = await ensureSoapCustomer(user);
    const fixedAmountCents = Number(req.body?.fixed_amount_cents ?? req.body?.amountCents);
    const body = {
      customer_id: soapUser.soapCustomerId,
      type: "deposit",
    };

    if (Number.isInteger(fixedAmountCents) && fixedAmountCents > 0) {
      body.fixed_amount_cents = fixedAmountCents;
    }

    const data = await soapRequest("/api/v1/checkouts", { method: "POST", body });

    await prisma.transaction.create({
      data: {
        checkoutId: data.id,
        type: "deposit",
        status: "pending",
        amountCents: body.fixed_amount_cents,
        userId: user.id,
      },
    });

    return res.status(201).json({ url: data.url });
  } catch (err) {
    console.error("Create deposit error:", err);
    return sendWalletError(res, err);
  }
}

async function createWithdrawal(req, res) {
  try {
    const amountCents = Number(req.body?.amountCents);
    if (!Number.isInteger(amountCents) || amountCents <= 0) {
      return res.status(400).json({ error: "Withdrawal amount must be a positive integer." });
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // TODO: split into goldCoinBalance vs sweepsCoinBalance. coinBalance is currently
    // play-money gold coins, but redemptions should be checked against redeemable coins.
    if (amountCents > user.coinBalance) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    const soapUser = await ensureSoapCustomer(user);
    const data = await soapRequest("/api/v1/checkouts", {
      method: "POST",
      body: {
        customer_id: soapUser.soapCustomerId,
        type: "withdrawal",
        fixed_amount_cents: amountCents,
        return_url: `${process.env.FRONTEND_ORIGIN || "http://localhost:5173"}/dashboard`,
      },
    });

    await prisma.transaction.create({
      data: {
        checkoutId: data.id,
        type: "withdrawal",
        status: "pending",
        amountCents,
        userId: user.id,
      },
    });

    return res.status(201).json({ url: data.url });
  } catch (err) {
    console.error("Create withdrawal error:", err);
    return sendWalletError(res, err);
  }
}

async function getTransactions(req, res) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        checkoutId: true,
        type: true,
        status: true,
        amountCents: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ transactions });
  } catch (err) {
    console.error("Get transactions error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

function verifyWebhookSignature(req) {
  const signature = req.headers["soap-webhook-signature"];
  const secret = process.env.SOAP_WEBHOOK_SECRET;

  if (!signature || !secret || !Buffer.isBuffer(req.body)) {
    return false;
  }

  const parts = Object.fromEntries(
    signature.split(",").map((part) => {
      const [key, ...value] = part.trim().split("=");
      return [key, value.join("=")];
    })
  );

  if (!parts.t || !parts.v1) {
    return false;
  }

  const signedPayload = `${parts.t}.${req.body.toString("utf8")}`;
  const expected = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex");
  const actualBuffer = Buffer.from(parts.v1, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return (
    actualBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

async function handleCheckoutSucceeded(event, transaction) {
  if (transaction.status === "succeeded") {
    return;
  }

  const chargeId = getChargeId(event);
  if (chargeId) {
    const alreadyProcessed = await prisma.transaction.findUnique({
      where: { processedWebhookEventId: chargeId },
    });

    if (alreadyProcessed) {
      return;
    }
  }

  const amountCents = getAmountCents(event, transaction);
  if (amountCents <= 0) {
    throw new Error(`Soap checkout ${transaction.checkoutId} succeeded without a valid amount.`);
  }

  // Soap reports cents. For now the wallet uses a 1 cent = 1 coin mapping.
  const balanceDelta = transaction.type === "deposit" ? amountCents : -amountCents;

  await prisma.$transaction([
    prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: "succeeded",
        amountCents: transaction.amountCents || amountCents,
        processedWebhookEventId: chargeId || undefined,
      },
    }),
    prisma.user.update({
      where: { id: transaction.userId },
      data: { coinBalance: { increment: balanceDelta } },
    }),
  ]);
}

async function handleSoapWebhook(req, res) {
  try {
    if (!verifyWebhookSignature(req)) {
      debugSoapWebhook("REJECTED", {
        reason: "invalid_signature",
        hasSignature: Boolean(req.headers["soap-webhook-signature"]),
        hasSecret: Boolean(process.env.SOAP_WEBHOOK_SECRET),
        isRawBody: Buffer.isBuffer(req.body),
      });
      return res.sendStatus(422);
    }

    const event = JSON.parse(req.body.toString("utf8"));
    if (process.env.DEBUG_SOAP_WEBHOOKS === "true") {
      console.log("SOAP WEBHOOK EVENT:", JSON.stringify(event, null, 2));
    }

    const checkoutId = getCheckoutId(event);
    if (!checkoutId) {
      debugSoapWebhook("IGNORED", { reason: "missing_checkout_id" });
      return res.sendStatus(200);
    }

    const chargeStatus = getChargeStatus(event);
    debugSoapWebhook("DISPATCH", {
      checkoutId,
      chargeId: getChargeId(event),
      chargeStatus,
      amountCents: event?.charge?.amount_cents,
    });

    if (chargeStatus === "hold") {
      const transaction = await prisma.transaction.findUnique({
        where: { checkoutId },
        include: { user: true },
      });

      if (!transaction) {
        debugSoapWebhook("IGNORED", { reason: "hold_transaction_not_found", checkoutId });
        return res.sendStatus(404);
      }

      const amountCents = getAmountCents(event, transaction);
      // TODO: split into goldCoinBalance vs sweepsCoinBalance before production redemptions.
      return transaction.user.coinBalance >= amountCents ? res.sendStatus(200) : res.sendStatus(402);
    }

    const transaction = await prisma.transaction.findUnique({ where: { checkoutId } });
    if (!transaction) {
      debugSoapWebhook("IGNORED", { reason: "transaction_not_found", checkoutId, chargeStatus });
      return res.sendStatus(200);
    }

    if (chargeStatus === "succeeded") {
      await handleCheckoutSucceeded(event, transaction);
      return res.sendStatus(200);
    }

    const status = TERMINAL_STATUS_MAP[chargeStatus];
    if (status) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status },
      });
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error("Soap webhook error:", err);
    return res.sendStatus(500);
  }
}

module.exports = {
  createDeposit,
  createWithdrawal,
  getTransactions,
  handleSoapWebhook,
};
