# ShareBite architecture
- **Presentation:** Next.js App Router page and responsive CSS.
- **HTTP layer:** REST route handlers under `app/api`; JSON responses and shared error mapping.
- **Validation:** Zod validates organization, listing, and request inputs; Mongoose schema constraints provide a second validation layer.
- **Persistence:** MongoDB Atlas via Mongoose models for Organization, Listing, DonationRequest. A global connection cache avoids reconnecting on every serverless invocation.
- **Deployment:** Vercel Next.js deployment, with `MONGODB_URI` stored in project environment variables and never committed.
- **Current limitations:** No authentication/authorization; prototype endpoints need protection before public launch. Quantity reservation is not transactionally locked, so concurrent requests require additional atomic inventory logic. The UI is a lightweight demo frontend; registration and requests are available through the documented APIs.
