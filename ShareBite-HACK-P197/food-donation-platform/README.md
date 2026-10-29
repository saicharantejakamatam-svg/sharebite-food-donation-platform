# ShareBite — Food Donation Platform (HACK-P197)

A full-stack student hackathon prototype connecting restaurants, caterers, shops and community kitchens with eligible recipient organizations for surplus-food pickup.

> **Honest demo note:** The application includes demo cards for preview. Persistent API workflows require a configured MongoDB database. The app is not a food-safety certification system. Authentication/authorization is not implemented yet, so do not use it for real public operations until access controls and security review are completed.

## Problem statement
**HACK-P197 — Food Donation Platform** (Food & Restaurant, Intermediate). Surplus edible food may be wasted while community organizations need reliable ways to discover donations. The platform coordinates listings, requests, pickup windows and status updates while emphasizing safe handling and responsible distribution.

## Features implemented
- Responsive ShareBite interface with discover, donate, requests and organizations sections.
- Organization registration with donor/recipient types and duplicate-email protection.
- Food listing create/read with search, quantity, category, preparation/expiry, pickup location/window, dietary tags and handling notes.
- Listing validation: expiry after preparation; pickup end after start and before expiry; positive quantity.
- Recipient request creation with quantity checks, availability checks and active-request conflict prevention.
- Request status workflow: pending → accepted/rejected/cancelled; accepted → cancelled/picked_up.
- MongoDB persistence through Mongoose models and Next.js REST API routes.
- Seed script for 10 sample listings and 3 recipient organizations (plus 3 demo donor organizations).
- API docs, architecture/data model notes, and lightweight logic tests.

## Technology stack
- Frontend: React 18, Next.js 14, responsive CSS.
- Backend: Next.js route handlers, Zod validation.
- Database: MongoDB Atlas, Mongoose.
- Hosting target: Vercel (application/API) + MongoDB Atlas (database).

## Architecture
Browser UI → Next.js API routes → Zod validation → Mongoose models → MongoDB Atlas → JSON response. See [`docs/architecture.md`](docs/architecture.md) and [`docs/api-documentation.md`](docs/api-documentation.md).

## Run locally
Requirements: Node.js 18.17+ (Node 20 LTS recommended), npm, and a MongoDB Atlas database or reachable MongoDB instance.

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set MONGODB_URI to your own database connection string
npm run dev
```
Open `http://localhost:3000`. Check API health at `http://localhost:3000/api/health`.

To insert sample records into the database, after setting `MONGODB_URI`:

```bash
npm run seed
```

The seed script creates 10 listings and 6 sample organizations (3 donors and 3 recipients). It replaces listings with matching demo titles on each run. Use demo-only addresses and emails.

## Environment variables
| Variable | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | Yes for API persistence | MongoDB connection string; keep secret |
| `NEXT_PUBLIC_APP_URL` | Optional | Base URL for deployment documentation/integrations |

Never commit `.env.local`, passwords, access tokens or database credentials.

## API documentation
See [`docs/api-documentation.md`](docs/api-documentation.md) for endpoints, methods, payloads and expected status codes. Main routes: `/api/health`, `/api/organizations`, `/api/listings`, `/api/listings/:id`, `/api/requests`, `/api/requests/:id`.

## Database design
- `Organization`: unique email, role/type, contact and address fields.
- `Listing`: donor reference, food details, quantity, pickup and expiry data, status.
- `DonationRequest`: listing/recipient references, requested quantity, status history fields.

## Testing
Run `npm test` for lightweight validation and workflow-rule tests. After configuring MongoDB, run `npm run seed` and manually verify the API routes using Postman or curl. These included tests are logic-level checks, **not** a claim that a live database or deployment has been tested. Record actual Postman responses and add screenshots in `screenshots/` before final submission.

Example checks:
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/listings
curl -X POST http://localhost:3000/api/organizations -H 'Content-Type: application/json' -d '{"name":"Demo Recipient","type":"recipient","email":"recipient@example.test","address":"Demo address"}'
```

## Deploy to Vercel
1. Create a MongoDB Atlas cluster and database user; allow network access appropriate to your security requirements.
2. Push this project to a GitHub repository (steps below).
3. In Vercel, import that GitHub repository and keep the project root at the repository root.
4. Add `MONGODB_URI` in Vercel → Project → Settings → Environment Variables for Preview and Production. Do not add it to source code.
5. Deploy. Visit `/api/health`; `databaseConfigured` should be `true` (this indicates configuration only, not proof of successful DB connection).
6. Use the Vercel project console/CLI to run the seed script against the production database if desired, then test listing creation and request/status workflows against the live URL.
7. Record the real live app URL and test results here after verification.

**Deployment status:** Not deployed by this generated package. Live URL: pending. Backend API URL: pending.

## Push to GitHub
Create an empty repository on GitHub, then from this project folder:
```bash
git init
git add .
git commit -m "Build ShareBite food donation platform"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git
git push -u origin main
```
Replace the URL placeholders with your repository URL. Never commit `.env.local`.

## Team members and contributions
Replace this section with the actual four students' full names, roll numbers, branch/section and verified contributions, as required by the hackathon guide. Do not invent team details.

## Limitations and future scope
- Authentication, sessions and role-based authorization must be implemented before public use.
- Moderation route currently has no admin authorization.
- Demo fallback cards are not persisted database records.
- Food handling and expiry information is donor-provided and not certified.
- Optional future work: map/distance matching, reminders, multilingual UI, analytics based on verified quantities and meals redistributed.

## Acknowledgements
Built for the student hackathon problem statement HACK-P197. Libraries: Next.js, React, Mongoose, Zod. Demo names, emails and addresses are illustrative.
