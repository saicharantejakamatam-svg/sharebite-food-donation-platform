# ShareBite API reference
All endpoints return JSON. Validation failures return HTTP 400; missing records usually return 404; duplicate organization email returns 409; unexpected failures return 500.

## Health
`GET /api/health` → `{ "status":"ok", "service":"ShareBite API" }`

## Organizations
`GET /api/organizations` returns public organization fields.
`POST /api/organizations` body:
```json
{"name":"Green Kitchen","type":"donor","email":"demo@example.org","address":"Demo pickup address","description":"Community meals"}
```
Types: donor, recipient, admin. Use demo contact details for testing.

## Listings
`GET /api/listings?q=rice&category=meals` lists available, unexpired food.
`POST /api/listings` body:
```json
{"donorId":"<organization-id>","title":"Vegetable rice meals","category":"meals","description":"Freshly prepared meals","quantity":20,"unit":"meals","preparedAt":"2026-10-29T10:00:00.000Z","expiresAt":"2026-10-29T18:00:00.000Z","pickupAddress":"Demo address","pickupStart":"2026-10-29T14:00:00.000Z","pickupEnd":"2026-10-29T16:00:00.000Z"}
```
Expiry must follow preparation time; pickup end must follow pickup start and not exceed expiry. Units: meals, kg, boxes, portions.

## Requests
`GET /api/requests?recipientId=<id>` lists requests.
`POST /api/requests` body: `{"listingId":"<id>","recipientId":"<id>","requestedQuantity":5,"message":"Pickup arranged"}`.
`PATCH /api/requests/:id` accepts status values accepted, rejected, cancelled, picked_up. This prototype does not enforce user identity or roles; do not expose status-changing endpoints publicly without authentication and authorization.
