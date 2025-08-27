# Account API (Express) with Jest + Supertest

This project implements the CRUD Account API and includes full test coverage using Jest + Supertest.

## Scripts
- `npm install` — installs dependencies
- `npm test` — runs the Jest test suite
- `npm start` — starts the server on port 3000

## Endpoints
- `GET /api/accounts` — list accounts
- `POST /api/accounts` — create an account
- `PUT /api/accounts/:id` — update an account
- `DELETE /api/accounts/:id` — delete an account

Validation:
- If `balance < 0` on create/update, returns **400** with `{ error: "Balance cannot be negative" }`.

## Run locally
```bash
npm install
npm test
npm start
```
