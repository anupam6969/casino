const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Prefer httpOnly cookie; fall back to Authorization header for flexibility
  const cookieToken = req.cookies && req.cookies.token;
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
}

module.exports = authMiddleware;
