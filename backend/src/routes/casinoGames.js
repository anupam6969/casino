const express = require("express");
const casinoGamesController = require("../controllers/casinoGamesController");

const router = express.Router();

// The skill requires the raw body for signature verification.
// These routes are mounted at the root /casino-games/
router.post("/balance", casinoGamesController.balance);
router.post("/bet", casinoGamesController.bet);
router.post("/win", casinoGamesController.win);
router.post("/rollback", casinoGamesController.rollback);

module.exports = router;
