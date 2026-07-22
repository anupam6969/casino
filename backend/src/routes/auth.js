const express = require("express");
const { signup, signin, me, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const authRateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/signup", authRateLimiter, signup);
router.post("/signin", authRateLimiter, signin);
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

module.exports = router;
