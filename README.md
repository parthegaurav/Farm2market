# Farm2Market

Farm2Market is a mobile-first marketplace MVP connecting farmers directly with buyers of vegetables, fruits, and flowers.

## Architecture
- `frontend`: React + Vite single-page application with role-aware dashboards.
- `backend`: Java 17 / Spring Boot REST API using JPA, PostgreSQL, BCrypt, and JWT.
- `docker-compose.yml`: PostgreSQL for local development.

## Quick start

### Option A: Docker database + local apps
```bash
cp .env.example .env
# Start PostgreSQL
docker compose up -d db
cd backend && mvn spring-boot:run
# In another terminal
cd frontend && npm install && npm run dev
```
Open http://localhost:5173.

### Option B: Docker database only
The API uses `DB_HOST=localhost`, port `5432`, database `farm2market`, username `farm2market`, password `farm2market` by default. Set environment variables in `.env` or your shell.

## Demo accounts
Seed data is inserted on first startup:
- Admin: `admin@farm2market.com` / `Admin@123`
- Farmer: `farmer@farm2market.com` / `Farmer@123`
- Buyer: `buyer@farm2market.com` / `Buyer@123`

## Environment variables
`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `VITE_API_URL`.

## API overview
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/products`, `GET /api/products/{id}`, `GET /api/products/search?keyword=`, `GET /api/products/category/{category}`
- Authenticated farmers: `POST/PUT/DELETE /api/products`, `GET /api/farmers/me`, `/api/farmers/me/products`, `/api/farmers/me/orders`
- Authenticated buyers: `POST /api/orders`, `GET /api/orders/my`, `GET /api/orders/{id}`
- Farmers/admins: `PUT /api/orders/{id}/status`
- `GET /api/market-prices`, `GET /api/market-prices/{productName}`
- Admin: `/api/admin/dashboard`, `/users`, `/products`, `/orders`, `/turnover`

All responses use `{ success, message, data }`; validation errors use a consistent error object. JWT is sent as `Authorization: Bearer <token>`.

## Future improvements
Payments, delivery tracking, image storage, refresh tokens, notifications, farmer verification, and production observability.
