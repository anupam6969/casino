const rateLimit = require("express-rate-limit");

function numberFromEnv(name, fallback) {
  const value = Number.parseInt(process.env[name], 10);
  return Number.isFinite(value) ? value : fallback;
}

const signinRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: numberFromEnv("SIGNIN_RATE_LIMIT_MAX", 20),
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { error: "Too many login attempts. Please try again later." },
});

const signupRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: numberFromEnv("SIGNUP_RATE_LIMIT_MAX", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many signup attempts. Please try again later." },
});

const demoLaunchRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: numberFromEnv("DEMO_LAUNCH_RATE_LIMIT_MAX", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: "rateLimited", message: "Too many demo launches. Please try again shortly." },
});

module.exports = { signinRateLimiter, signupRateLimiter, demoLaunchRateLimiter };
