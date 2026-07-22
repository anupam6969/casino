# Social Casino App — Signup / Signin

Free-to-play social gaming app auth system. Users sign up with name, phone,
email, and password; they get 5,000 free virtual coins to start. Coins have
no cash value and cannot be redeemed.

## Structure

```
backend/    Node.js + Express + Prisma + PostgreSQL + JWT auth
frontend/   React + Vite + Tailwind — signup/signin UI + dashboard
```

## Backend setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Runs on http://localhost:5000. Health check: `GET /api/health`.

Set `DATABASE_URL` in `backend/.env` to your PostgreSQL connection string.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173.

## API endpoints

| Method | Route              | Body                                   | Notes                     |
|--------|---------------------|-----------------------------------------|----------------------------|
| POST   | /api/auth/signup    | `{ name, phone, email, password }`      | Creates user, 5000 coins   |
| POST   | /api/auth/signin    | `{ identifier, password }`              | identifier = email or phone|
| GET    | /api/auth/me        | —                                        | Requires session cookie    |
| POST   | /api/auth/logout    | —                                        | Clears session cookie      |

## Security notes

- Passwords hashed with bcrypt (10 salt rounds), never logged.
- JWT stored in an httpOnly, secure (in production), sameSite cookie —
  not localStorage — to reduce XSS token theft risk.
- Signup/signin rate-limited to 5 attempts per 15 minutes per IP.
- CORS restricted to `FRONTEND_ORIGIN` in `backend/.env`.

## Before going to production

- Set a strong random `JWT_SECRET` in `backend/.env`.
- Set `NODE_ENV=production` so cookies get the `secure` flag (requires HTTPS).
- Add phone/email verification (OTP) if you want to prevent fake signups.
