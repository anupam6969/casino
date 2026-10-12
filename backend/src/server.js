require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const authMiddleware = require("./middleware/authMiddleware");
const { me } = require("./controllers/authController");
const walletController = require("./controllers/walletController");
const configurePassport = require("./config/passport");

const app = express();
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://casino-dusky-two.vercel.app",
  process.env.FRONTEND_ORIGIN,
].filter(Boolean));

configurePassport(passport);

app.post(
  "/api/wallet/webhook",
  express.raw({ type: "application/json" }),
  walletController.handleSoapWebhook
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
app.use("/api/wallet", walletRoutes);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
