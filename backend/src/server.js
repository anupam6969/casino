require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const casinoGamesRoutes = require("./routes/casinoGames");
const casinoGamesApiRoutes = require("./routes/casinoGamesApi");
const authMiddleware = require("./middleware/authMiddleware");
const { me } = require("./controllers/authController");
const { syncGames } = require("./lib/syncGames");
const configurePassport = require("./config/passport");

const app = express();

// Only accept forwarded client IPs from explicitly trusted reverse proxies.
const trustedProxies = process.env.TRUSTED_PROXIES?.split(",").map((proxy) => proxy.trim()).filter(Boolean);
if (trustedProxies?.length) app.set("trust proxy", trustedProxies);

const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://casino-dusky-two.vercel.app",
  process.env.FRONTEND_ORIGIN,
].filter(Boolean));

configurePassport(passport);

// SweepPark seamless wallet endpoints - mounted at root, must come before general json parser
// to capture the raw body for signature verification.
app.use(
  "/casino-games",
  express.raw({ type: "application/json" }),
  casinoGamesRoutes
);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(passport.initialize());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api", casinoGamesApiRoutes);
app.get("/api/user/me", authMiddleware, me);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

let catalogueSyncRunning = false;
async function refreshCatalogue() {
  if (catalogueSyncRunning) return;
  catalogueSyncRunning = true;
  try {
    const { synced, errors } = await syncGames();
    console.log(`Catalogue sync finished (${synced} games, ${errors.length} errors)`);
  } catch {
    console.error("Catalogue sync failed");
  } finally {
    catalogueSyncRunning = false;
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  void refreshCatalogue();
  setInterval(refreshCatalogue, 5 * 60 * 1000).unref();
});
