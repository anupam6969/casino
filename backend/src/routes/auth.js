const express = require("express");
const passport = require("passport");
const { signup, signin, me, logout, signToken, setAuthCookie } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { signinRateLimiter, signupRateLimiter } = require("../middleware/rateLimiter");

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_ORIGIN || (
  process.env.NODE_ENV === "production" ? "https://casino-dusky-two.vercel.app" : "http://localhost:5173"
);

router.post("/signup", signupRateLimiter, signup);
router.post("/signin", signinRateLimiter, signin);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Google OAuth callback error:", {
        message: err.message,
        code: err.code,
        meta: err.meta,
        stack: err.stack,
      });
      return res.redirect(`${FRONTEND_URL}/login?error=google_auth_failed`);
    }

    if (!user) {
      console.warn("Google OAuth callback failed:", info);
      return res.redirect(`${FRONTEND_URL}/login?error=google_auth_failed`);
    }

    const token = signToken(user.id);
    setAuthCookie(res, token);
    const redirectUrl = new URL(FRONTEND_URL);
    redirectUrl.searchParams.set("token", token);
    return res.redirect(redirectUrl.toString());
  })(req, res, next);
});
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

module.exports = router;
