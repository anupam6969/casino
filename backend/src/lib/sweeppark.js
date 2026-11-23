const { createHmac, randomUUID } = require("crypto");

const BASE_URL = "https://api-nightly.sweeppark.com";

// Trim and sanitize environment variables to handle malformed .env files
// (e.g., "KEY_ID = value" with spaces, "KEY_ID=value," with trailing comma)
function getCreds() {
  const rawKeyId = process.env.SWEEPPARK_KEY_ID;
  const rawSecret = process.env.SWEEPPARK_KEY_SECRET;

  return {
    keyId: rawKeyId ? rawKeyId.trim().replace(/,\s*$/, "") : null,
    secret: rawSecret ? rawSecret.trim() : null,
  };
}

let cachedCreds = null;
let warnShown = false;

function getCredentials() {
  if (!cachedCreds) {
    cachedCreds = getCreds();
    if (!cachedCreds.keyId || !cachedCreds.secret) {
      if (!warnShown) {
        console.warn("SWEEPPARK_KEY_ID or SWEEPPARK_KEY_SECRET not set in environment");
        warnShown = true;
      }
    }
  }
  return cachedCreds;
}

// Allow tests to reset cached credentials
function resetCredentials() {
  cachedCreds = null;
}

/**
 * Sorts query parameters by key, then value for canonical signing.
 * Matches JavaScript's URLSearchParams encoding.
 */
function sortedQuery(search) {
  const pairs = [...new URLSearchParams(search)];
  pairs.sort(([ak, av], [bk, bv]) =>
    ak === bk ? (av < bv ? -1 : av > bv ? 1 : 0) : ak < bk ? -1 : 1,
  );
  return new URLSearchParams(pairs).toString();
}

/**
 * Creates the canonical string for signing.
 */
function createCanonicalString(method, url, rawBody, timestamp, nonce) {
  const sorted = sortedQuery(url.search);
  return `${timestamp}.${nonce}.${method} ${url.pathname}?${sorted}.${rawBody}`;
}

/**
 * Generates HMAC-SHA256 signature.
 */
function generateSignature(canonicalString, secret) {
  return createHmac("sha256", secret).update(canonicalString).digest("hex");
}

/**
 * Main SweepPark API client function.
 * @param {string} method - HTTP method (GET, POST)
 * @param {string} pathAndQuery - Path with query string (e.g., "/v1/games?limit=25")
 * @param {object} [body] - Request body for POST requests
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} With status and code properties on non-2xx responses
 */
async function sweepPark(method, pathAndQuery, body) {
  const { keyId, secret } = getCredentials();

  if (!keyId || !secret) {
    throw new Error("SweepPark credentials not configured");
  }

  const url = new URL(pathAndQuery, BASE_URL);
  const rawBody = body === undefined ? "" : JSON.stringify(body);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = randomUUID();

  const canonical = createCanonicalString(method, url, rawBody, timestamp, nonce);
  const signature = generateSignature(canonical, secret);

  const response = await fetch(url.toString(), {
    method,
    headers: {
      "content-type": "application/json",
      "x-sweep-park-key": keyId,
      "x-sweep-park-timestamp": timestamp,
      "x-sweep-park-nonce": nonce,
      "x-sweep-park-signature": signature,
    },
    body: rawBody || undefined,
  });

  const json = await response.json();
  if (!response.ok) {
    const error = new Error(json.message || "SweepPark API error");
    error.status = response.status;
    error.code = json.code;
    error.errors = json.errors;
    throw error;
  }
  return json;
}

/**
 * Fetches all games with pagination support.
 * @param {object} [options] - Query options
 * @param {number} [options.limit] - Number of games per page (1-100, default 25)
 * @param {string} [options.cursor] - Pagination cursor
 * @param {string} [options.q] - Search query for game name/studio
 * @returns {Promise<{data: Array, pagination: object}>}
 */
async function getGames(options = {}) {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", options.limit.toString());
  if (options.cursor) params.set("cursor", options.cursor);
  if (options.q) params.set("q", options.q);

  const queryString = params.toString();
  const path = `/v1/games${queryString ? `?${queryString}` : ""}`;
  return sweepPark("GET", path);
}

/**
 * Fetches a single game by slug.
 * @param {string} slug - Game slug
 * @returns {Promise<object>} Game data
 */
async function getGame(slug) {
  return sweepPark("GET", `/v1/games/${encodeURIComponent(slug)}`);
}

/**
 * Launches a real-money game session.
 * @param {object} launchParams - Launch parameters
 * @param {string} launchParams.playerRef - Player ID (1-128 chars)
 * @param {string} launchParams.game - Game slug from /v1/games
 * @param {string} launchParams.currency - "GC" or "SC"
 * @param {string} launchParams.ipAddress - Player's IP address
 * @param {boolean} [launchParams.mobile] - Default false
 * @param {string} [launchParams.language] - e.g., "en", "en-US"
 * @param {string} [launchParams.country] - ISO-3166 country/subdivision
 * @param {string} [launchParams.returnUrl] - Exit button redirect URL
 * @param {string} [launchParams.depositUrl] - Deposit button redirect URL
 * @returns {Promise<{sessionId: string, gameUrl: string, game: string, currency: string, correlationId: string}>}
 */
async function launchGame(launchParams) {
  return sweepPark("POST", "/v1/launch", launchParams);
}

/**
 * Launches a demo game session (no player, no wallet calls).
 * @param {object} demoParams - Demo launch parameters
 * @param {string} demoParams.game - Game slug
 * @param {string} demoParams.ipAddress - Visitor's IP address
 * @param {boolean} [demoParams.mobile] - Default false
 * @param {string} [demoParams.language] - e.g., "en"
 * @param {string} [demoParams.returnUrl] - Exit button redirect URL
 * @returns {Promise<{gameUrl: string, game: string, correlationId: string}>}
 */
async function launchDemo(demoParams) {
  return sweepPark("POST", "/v1/launch/demo", demoParams);
}

/**
 * Gets a session by ID.
 * @param {string} sessionId - Session ID from launch response
 * @returns {Promise<object>} Session data
 */
async function getSession(sessionId) {
  return sweepPark("GET", `/v1/sessions/${encodeURIComponent(sessionId)}`);
}

/**
 * Lists rounds with pagination.
 * @param {object} [options] - Query options
 * @param {number} [options.limit] - 1-100, default 25
 * @param {string} [options.cursor] - Pagination cursor
 * @param {string} [options.playerRef] - Filter by player
 * @returns {Promise<{data: Array, pagination: object}>}
 */
async function getRounds(options = {}) {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", options.limit.toString());
  if (options.cursor) params.set("cursor", options.cursor);
  if (options.playerRef) params.set("playerRef", options.playerRef);

  const queryString = params.toString();
  const path = `/v1/rounds${queryString ? `?${queryString}` : ""}`;
  return sweepPark("GET", path);
}

/**
 * Gets wallet calls (transactions) for a round.
 * @param {string} roundRef - Round reference
 * @returns {Promise<Array>} Array of wallet calls
 */
async function getTransactions(roundRef) {
  const params = new URLSearchParams();
  params.set("roundRef", roundRef);
  return sweepPark("GET", `/v1/transactions?${params.toString()}`);
}

/**
 * Gets available free-round bet amounts for a game.
 * @param {string} game - Game slug (must be tagged free-rounds)
 * @param {string} currency - "GC" or "SC"
 * @returns {Promise<{game: string, currency: string, bets: string[]}>}
 */
async function getFreeRoundBets(game, currency) {
  const params = new URLSearchParams();
  params.set("game", game);
  params.set("currency", currency);
  return sweepPark("GET", `/v1/free-rounds/bets?${params.toString()}`);
}

/**
 * Grants free rounds to a player.
 * @param {object} grantParams - Grant parameters
 * @param {string} grantParams.grantRef - Idempotency key (1-64 chars)
 * @param {string} grantParams.playerRef - Player ID
 * @param {string} grantParams.game - Game slug (tagged free-rounds)
 * @param {string} grantParams.currency - "GC" or "SC"
 * @param {number} grantParams.rounds - 1-1000
 * @param {string} grantParams.betAmount - Decimal string from /v1/free-rounds/bets
 * @param {string} [grantParams.expiresAt] - ISO-8601 expiry
 * @returns {Promise<object>} Grant data
 */
async function grantFreeRounds(grantParams) {
  return sweepPark("POST", "/v1/free-rounds", grantParams);
}

/**
 * Lists free-round grants.
 * @param {object} [options] - Query options
 * @param {number} [options.limit] - 1-100, default 25
 * @param {string} [options.cursor] - Pagination cursor
 * @param {string} [options.playerRef] - Filter by player
 * @returns {Promise<{data: Array, pagination: object}>}
 */
async function getFreeRounds(options = {}) {
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", options.limit.toString());
  if (options.cursor) params.set("cursor", options.cursor);
  if (options.playerRef) params.set("playerRef", options.playerRef);

  const queryString = params.toString();
  const path = `/v1/free-rounds${queryString ? `?${queryString}` : ""}`;
  return sweepPark("GET", path);
}

/**
 * Gets a free-round grant by ID.
 * @param {string} id - Grant ID
 * @returns {Promise<object>} Grant data
 */
async function getFreeRound(id) {
  return sweepPark("GET", `/v1/free-rounds/${encodeURIComponent(id)}`);
}

/**
 * Cancels a free-round grant.
 * @param {string} id - Grant ID
 * @returns {Promise<object>} Cancelled grant data
 */
async function cancelFreeRounds(id) {
  return sweepPark("POST", `/v1/free-rounds/${encodeURIComponent(id)}/cancel`);
}

/**
 * Health check endpoint (no auth).
 * @returns {Promise<{status: string, service: string, at: string}>}
 */
async function healthCheck() {
  const url = new URL("/v1/health-check", BASE_URL);
  const response = await fetch(url.toString());
  return response.json();
}

module.exports = {
  sweepPark,
  getGames,
  getGame,
  launchGame,
  launchDemo,
  getSession,
  getRounds,
  getTransactions,
  getFreeRoundBets,
  grantFreeRounds,
  getFreeRounds,
  getFreeRound,
  cancelFreeRounds,
  healthCheck,
  // Expose internals for testing
  sortedQuery,
  createCanonicalString,
  generateSignature,
  resetCredentials,
};