const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");
const { validateSignup, validateSignin, sanitizeInput } = require("../utils/validators");

const SALT_ROUNDS = 10;

function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "7d",
  });
}

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name || user.username,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    coinBalance: user.coinBalance ?? 0,
    accountStatus: "Active",
  };
}

async function signup(req, res) {
  try {
    const username = sanitizeInput(req.body.username);
    const email = sanitizeInput(req.body.email)?.toLowerCase();
    const { password } = req.body;

    const { valid, errors } = validateSignup({ username, email, password });
    if (!valid) {
      return res.status(400).json({ error: "Validation failed.", fields: errors });
    }

    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      return res.status(409).json({ error: "Email already registered." });
    }

    const existingByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingByUsername) {
      return res.status(409).json({ error: "Username already registered." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name: username,
        username,
        email,
        passwordHash,
      },
    });

    const token = signToken(user.id);
    setAuthCookie(res, token);

    return res.status(201).json({ token, user: toPublicUser(user) });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

async function signin(req, res) {
  try {
    const identifier = sanitizeInput(req.body.identifier);
    const { password } = req.body;

    const { valid, errors } = validateSignin({ identifier, password });
    if (!valid) {
      return res.status(400).json({ error: "Validation failed.", fields: errors });
    }

    const normalizedIdentifier = identifier.toLowerCase();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedIdentifier },
          { username: { equals: identifier, mode: "insensitive" } },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = signToken(user.id);
    setAuthCookie(res, token);

    return res.status(200).json({ token, user: toPublicUser(user) });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ user: toPublicUser(user) });
  } catch (err) {
    console.error("Me error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out." });
}

module.exports = { signup, signin, me, logout, signToken, setAuthCookie, toPublicUser };
