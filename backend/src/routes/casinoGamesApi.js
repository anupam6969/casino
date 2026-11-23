const express = require("express");
const casinoGamesController = require("../controllers/casinoGamesController");
const authMiddleware = require("../middleware/authMiddleware");
const { demoLaunchRateLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

/**
 * GET /api/games
 * Returns paginated list of games with optional search and currency filtering.
 * Query params:
 * - q: search query (matches game name, studio)
 * - currency: filter by GC or SC (optional)
 * - limit: number of games per page (default 25, max 100)
 * - cursor: pagination cursor
 */
router.get("/games", casinoGamesController.getGames);

/**
 * GET /api/games/:slug
 * Returns a single game by slug.
 */
router.get("/games/:slug", casinoGamesController.getGame);

/**
 * POST /api/casino-games/launch
 * Launches a real-money game session.
 * Requires JWT authentication.
 * Body: { game, currency, returnUrl?, depositUrl? }
 * Returns: { gameUrl, sessionId }
 */
router.post("/casino-games/launch", authMiddleware, casinoGamesController.launchGame);

/**
 * POST /api/casino-games/launch/demo
 * Launches a demo game session (no auth required).
 * Body: { game, returnUrl? }
 * Returns: { gameUrl, sessionId }
 */
router.post("/casino-games/launch/demo", demoLaunchRateLimiter, casinoGamesController.launchDemo);

module.exports = router;
