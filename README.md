# ShareBite — HACK-P197
A food donation and rescue platform connecting donors with community organizations.

## Stack
Next.js 14 App Router, React, MongoDB Atlas, Mongoose, Zod validation, REST API routes.

## Run locally
1. Install Node.js 18+ and MongoDB Atlas access.
2. `npm install`
3. Copy `.env.example` to `.env.local` and set `MONGODB_URI`.
4. `npm run dev`, then open http://localhost:3000.
5. `npm test` runs validation logic tests.

## Deploy on Vercel
Import this repository into Vercel and set `MONGODB_URI` under Project → Settings → Environment Variables for Preview and Production. Redeploy after setting it. The variable is checked when a request connects to the database, not during the Next.js build. Verify `/api/health` after deployment.

## REST API
- `GET /api/health` — API health
- `GET, POST /api/organizations` — list/register organizations
- `GET, POST /api/listings` — search/create food listings
- `GET, PATCH /api/listings/:id` — fetch listing / moderation status
- `GET, POST /api/requests` — list/create donation requests
- `GET, PATCH /api/requests/:id` — fetch/update request status

See [API documentation](docs/api-documentation.md) and [architecture](docs/architecture.md).

## Important limitations
This is a hackathon prototype. Authentication and role-based authorization are not yet implemented; moderation and status-changing endpoints must not be exposed publicly until protected. Database connection and API health can be tested without exposing secrets. Food listings are donor-supplied information, not food-safety certification; confirm handling, expiry, pickup timing and safe transport directly. Do not use real beneficiary personal data in a demo.
