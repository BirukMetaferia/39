# Addis Eats

A Next.js App Router mini-project demonstrating dish APIs, order validation,
server actions, pending checkout state, path revalidation, and ownership checks.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## API endpoints

### GET `/api/dishes`

Returns the menu with status `200 OK`.

### GET `/api/dishes/:id`

Returns one dish with `200 OK`, or `404 Not Found` for an unknown dish.

Example: `/api/dishes/doro-wat`.

### POST `/api/orders`

Example JSON body:

```json
{
  "dishId": "doro-wat",
  "customerName": "Abebe Kebede",
  "phone": "+251911123456",
  "quantity": 2
}
```

Responses:
- `201 Created`: order created.
- `400 Bad Request`: malformed JSON.
- `404 Not Found`: unknown dish.
- `422 Unprocessable Content`: validation errors.

## Checkout and cancellation

The checkout form uses React `useActionState` and a server action.
Validation errors are displayed beside the relevant fields.
Successful order creation revalidates the home and orders pages.

Cancellation requires a signed JWT in the HttpOnly cookie
`addis-eats-session`, with the user's ID in its `sub` claim.
Configure `SESSION_SECRET` with a strong secret of at least 32 characters.
This starter does not include a login or session-issuing flow, so cancellation
will be denied until a trusted authentication flow is connected.

## Demo limitations

Orders are stored in process memory and may disappear after a server restart.
Separate server instances will not share the same orders. Use a database before
deploying this as a real ordering service. Menu items and prices are examples.