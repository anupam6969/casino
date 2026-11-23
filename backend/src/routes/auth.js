const express = require("express");
const { randomBytes } = require("node:crypto");
const passport = require("passport");
const { signup, signin, me, logout, signToken, setAuthCookie } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { signinRateLimiter, signupRateLimiter } = require("../middleware/rateLimiter");
const { defaultFrontendOrigin, allowedFrontendOrigins } = require("../config/frontendOrigins");

const router = express.Router();
const GOOGLE_STATE_COOKIE = "google_oauth_state";
const googleStateCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth/google/callback",
};

router.post("/signup", signupRateLimiter, signup);
router.post("/signin", signinRateLimiter, signin);
router.get("/google", (req, res, next) => {
  const origin = allowedFrontendOrigins.has(req.query.origin) ? req.query.origin : defaultFrontendOrigin;
  const state = randomBytes(32).toString("hex");
  res.cookie(GOOGLE_STATE_COOKIE, { state, origin }, { ...googleStateCookieOptions, maxAge: 10 * 60 * 1000 });
  passport.authenticate("google", { scope: ["profile", "email"], session: false, state })(req, res, next);
});
router.get("/google/callback", (req, res, next) => {
  const attempt = req.cookies?.[GOOGLE_STATE_COOKIE];
  res.clearCookie(GOOGLE_STATE_COOKIE, googleStateCookieOptions);
  const validState = typeof req.query.state === "string" && req.query.state === attempt?.state;
  const origin = validState && allowedFrontendOrigins.has(attempt.origin) ? attempt.origin : defaultFrontendOrigin;
  const failureUrl = new URL("/login?error=google_auth_failed", origin).toString();

  if (!validState || typeof req.query.code !== "string" || !req.query.code || req.query.error) {
    return res.redirect(failureUrl);
  }

  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      if (err) console.error("Google OAuth callback failed", err.name);
      return res.redirect(failureUrl);
    }

    const token = signToken(user.id);
    setAuthCookie(res, token);
    return res.redirect(origin);
  })(req, res, next);
});
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

module.exports = router;
