import { apiFetch } from "./apiClient.js";

/**
 * Fetches paginated list of games from the backend.
 * @param {Object} params - Query parameters
 * @param {string} params.q - Search query
 * @param {string} params.currency - Filter by currency (GC or SC)
 * @param {number} params.limit - Number of games per page
 * @param {string} params.cursor - Pagination cursor
 * @returns {Promise<{data: Array, pagination: Object}>}
 */
export async function fetchGames({ q, currency, limit = 25, cursor } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (currency) params.set("currency", currency);
  if (limit) params.set("limit", String(limit));
  if (cursor) params.set("cursor", cursor);

  const response = await apiFetch(`/games?${params.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch games");
  }

  return data;
}

/**
 * Fetches a single game by slug.
 * @param {string} slug - Game slug
 * @returns {Promise<Object>}
 */
export async function fetchGame(slug) {
  const response = await apiFetch(`/games/${encodeURIComponent(slug)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to fetch game");
  }

  return data;
}

/**
 * Launches a real-money game session.
 * @param {Object} params - Launch parameters
 * @param {string} params.game - Game slug
 * @param {string} params.currency - GC or SC
 * @param {string} params.returnUrl - Optional return URL
 * @param {string} params.depositUrl - Optional deposit URL
 * @param {boolean} params.mobile - Mobile flag
 * @param {string} params.language - Language code
 * @param {string} params.country - Country code
 * @returns {Promise<{gameUrl: string, sessionId: string}>}
 */
export async function launchGame({ game, currency, returnUrl, depositUrl, mobile, language, country }) {
  const response = await apiFetch("/casino-games/launch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game, currency, returnUrl, depositUrl, mobile, language, country }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw Object.assign(new Error(data?.message || "Failed to launch game"), { code: data?.code, status: response.status });
  }

  return data;
}

/**
 * Launches a demo game session (no auth required).
 * @param {Object} params - Launch parameters
 * @param {string} params.game - Game slug
 * @param {string} params.returnUrl - Optional return URL
 * @param {boolean} params.mobile - Mobile flag
 * @param {string} params.language - Language code
 * @returns {Promise<{gameUrl: string, sessionId: string}>}
 */
export async function launchDemo({ game, returnUrl, mobile, language }) {
  const response = await apiFetch("/casino-games/launch/demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game, returnUrl, mobile, language }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw Object.assign(new Error(data?.message || "Failed to launch demo"), { code: data?.code, status: response.status });
  }

  return data;
}