const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("../lib/prisma");

const callbackURL = process.env.GOOGLE_CALLBACK_URL || (
  process.env.NODE_ENV === "production"
    ? "https://casino-1fpi.onrender.com/api/auth/google/callback"
    : "http://localhost:5000/api/auth/google/callback"
);

function buildUsername(email, googleId) {
  const localPart = email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 20);
  return localPart || `google_${googleId.slice(0, 12)}`;
}

async function createUniqueUsername(email, googleId) {
  const base = buildUsername(email, googleId);
  let candidate = base;
  let suffix = 1;

  while (await prisma.user.findUnique({ where: { username: candidate } })) {
    const suffixText = `_${suffix}`;
    candidate = `${base.slice(0, 20 - suffixText.length)}${suffixText}`;
    suffix += 1;
  }

  return candidate;
}

module.exports = function configurePassport(passport) {
  console.log(`Google OAuth callback URL: ${callbackURL}`);

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          if (!email) {
            console.warn("Google OAuth profile did not include an email address.", { googleId: profile.id });
            return done(null, false, { message: "Google account email is required." });
          }

          const name = profile.displayName || email.split("@")[0];
          const profilePicture = profile.photos?.[0]?.value;
          const existingUser = await prisma.user.findUnique({ where: { email } });

          if (existingUser) {
            const user = await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                name: existingUser.name || name,
                googleId: existingUser.googleId || profile.id,
                profilePicture,
                lastLoginAt: new Date(),
              },
            });
            return done(null, user);
          }

          const username = await createUniqueUsername(email, profile.id);
          const user = await prisma.user.create({
            data: {
              name,
              username,
              email,
              passwordHash: `google-oauth:${profile.id}`,
              googleId: profile.id,
              profilePicture,
            },
          });

          return done(null, user);
        } catch (err) {
          console.error("Google OAuth verify error:", {
            message: err.message,
            code: err.code,
            meta: err.meta,
          });
          return done(err);
        }
      }
    )
  );
};
