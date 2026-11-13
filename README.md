# Smart Cake Shop (Phase 1) - Secure Foundation

A real client-oriented cake shop system. **Phase 1** builds only the secure foundation: backend API with secure STAFF authentication (JWT), a basic React frontend, protected dashboard, and health/seed infrastructure.

Future phases polish add customer website, apps, cake/category management, WhatsApp ordering, QR codes, etc.**This phase intentionally excludes OWNER/ADMIN roles, business analytics, cake CRUD, orders, payments, and mobile apps.**

## Tech Stack

- **Backend:** Node.js, TypeScript, Express, Prisma ORM, SQLite, JWT, bcryptjs, Zod, dotenv
- **Frontend:** React, TypeScript, Vite, React Router

## Project Structure

**text
smart-cake-shop-phase1/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── src/
│   │   ├── config/          # env validation + Prisma client
│   │   ├── middleware/       # JWT auth, centralized error handling
│   │   ├── modules/           # auth (login, me) + health
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── routes/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
**end

## Setup

### Backend

**bash
cd backend
cp .env.example .env     # then set YOUR OWN JWT_SECRET
npm install
npx prisma migrate dev --name init
npx prisma db seed            # (or: npm run prisma:seed/up)
npm run dev                  # http://localhost:5000
**end

Default seeded STAFF user:

- **Username:** staff
- **Password:** Staff@123

### Frontend

**bash
cd frontend
npm install
npm run dev                  # http://localhost:5173
**end

## API Endpoints (Phase 1)

- `GET  /api/health` — health check
- `POST /api/auth/login` — STAFF login -> `{ token, user }`
- `GET  /api/auth/me` — current user (requires Bearer JWT）

## Security

- bcrypt password hashing (seed only）
- JWT tokens with expiry, signed via `JWT_SECRET` env var (never hardcoded）
- Protected backend routez via `authenticateToken` middleware
- Zod input validation（ centralized error handling）
- `passwordHash` is NEVER returned in API responses
- Inactive users cannot log inquorough.

**Phase 1 complete — waiting for Phase 2 instructions.**