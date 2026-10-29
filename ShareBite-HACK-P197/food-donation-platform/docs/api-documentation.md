# API Documentation — HACK-P197
Base URL: `http://localhost:3000/api` locally; replace with the deployed URL in production. JSON request and response bodies are used throughout.

| Method | Endpoint | Purpose | Success | Common errors |
|---|---|---|---|---|
| GET | `/health` | API health and database configuration indicator | 200 | — |
| GET | `/organizations` | List organizations | 200 | 500 if database is unavailable |
| POST | `/organizations` | Register donor or recipient | 201 | 400 validation, 409 duplicate email |
| GET | `/listings` | Available, unexpired listings; optional `q` and `category` filters | 200 | 500 database unavailable |
| POST | `/listings` | Create listing | 201 | 400 validation/date rules, 404 donor missing |
| GET | `/listings/:id` | Fetch a listing | 200 | 400 malformed ID, 404 missing |
| PATCH | `/listings/:id` | Moderation: `status` can be `removed` or `available` | 200 | 400 invalid status, 404 missing |
| GET | `/requests` | List requests; optional `recipientId`, `status` filters | 200 | 500 database unavailable |
| POST | `/requests` | Request an available listing | 201 | 400 validation, 404 organization missing, 409 listing unavailable/active request |
| PATCH | `/requests/:id` | Transition request status | 200 | 400 invalid status, 404 missing, 409 disallowed transition |

## Example: create organization
`POST /api/organizations`
```json
{"name":"Hope Community Kitchen","type":"recipient","email":"hope@example.test","address":"Ameerpet, Hyderabad","description":"Community food support"}
```
Success response: `{ "data": { "_id": "...", "name": "Hope Community Kitchen", "type": "recipient", "...": "..." } }` (201).

## Example: create listing
`POST /api/listings`
```json
{"donorId":"<donor-organization-id>","title":"Vegetable meals","category":"Prepared meals","description":"Fresh meals packed in containers","quantity":20,"unit":"meals","preparedAt":"2026-10-30T08:00:00.000Z","expiresAt":"2026-10-30T14:00:00.000Z","pickupAddress":"Demo address, Hyderabad","pickupStart":"2026-10-30T10:00:00.000Z","pickupEnd":"2026-10-30T12:00:00.000Z","dietaryTags":["Vegetarian"]}
```

## Example: request food
`POST /api/requests`
```json
{"listingId":"<listing-id>","recipientId":"<recipient-organization-id>","requestedQuantity":5,"message":"Pickup by our volunteer"}
```

## Example: status update
`PATCH /api/requests/<request-id>` with `{"status":"accepted"}`. Allowed transitions: pending → accepted/rejected/cancelled; accepted → cancelled/picked_up. Terminal states cannot transition further. This prototype does not implement user authentication/authorization; do not use it with real personal data or production food operations until access control is added.
