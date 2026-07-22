const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{7,15}$/;
const USERNAME_REGEX = /^[A-Za-z0-9_]{3,20}$/;

function validateSignup({ username, email, password }) {
  const errors = {};

  if (!username || typeof username !== "string" || !USERNAME_REGEX.test(username.trim())) {
    errors.username = "Use 3-20 letters, numbers, or underscores.";
  }

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!password || typeof password !== "string" || password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function validateSignin({ identifier, password }) {
  const errors = {};

  if (!identifier || typeof identifier !== "string" || !EMAIL_REGEX.test(identifier.trim())) {
    errors.identifier = "Enter a valid email address.";
  }

  if (!password || typeof password !== "string" || password.length === 0) {
    errors.password = "Password is required.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function sanitizeInput(str) {
  if (typeof str !== "string") return str;
  return str.trim();
}

module.exports = { validateSignup, validateSignin, sanitizeInput, EMAIL_REGEX, PHONE_REGEX, USERNAME_REGEX };
