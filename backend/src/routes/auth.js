const express = require("express");
const { signup, signin, me, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { signinRateLimiter, signupRateLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/signup", signupRateLimiter, signup);
router.post("/signin", signinRateLimiter, signin);
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

module.exports = router;
