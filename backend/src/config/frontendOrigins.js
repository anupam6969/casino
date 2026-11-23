const defaultFrontendOrigin = process.env.FRONTEND_ORIGIN
  ? new URL(process.env.FRONTEND_ORIGIN).origin
  : process.env.NODE_ENV === "production"
    ? "https://casino-dusky-two.vercel.app"
    : "http://localhost:5173";

const allowedFrontendOrigins = new Set([
  defaultFrontendOrigin,
  "http://localhost:5173",
  "https://casino-dusky-two.vercel.app",
  "https://www.goldensweep.ai",
]);

module.exports = { defaultFrontendOrigin, allowedFrontendOrigins };
