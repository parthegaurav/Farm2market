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

## Local development demo accounts
Demo seed data is enabled outside the `prod` Spring profile and inserted on first startup:
- Admin: `admin@farm2market.com` / `Admin@123`
- Farmer: `farmer@farm2market.com` / `Farmer@123`
- Buyer: `buyer@farm2market.com` / `Buyer@123`

## Environment variables
`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, `VITE_API_URL`.

To send order notifications to `parthegaurav98@gmail.com`, configure the backend Render service with an SMTP provider: `SPRING_MAIL_HOST`, `SPRING_MAIL_PORT`, `SPRING_MAIL_USERNAME`, `SPRING_MAIL_PASSWORD`, `SPRING_MAIL_PROPERTIES_MAIL_SMTP_AUTH=true`, and `SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=true`. Store the mail password as a Render secret. The API sends one notification after each confirmed order; order saving does not depend on mail delivery.

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


## Deploy to Render
The repository includes a Render Blueprint in `render.yaml`. It creates a static frontend, a Docker-based Spring Boot API, and a PostgreSQL database in Singapore. The Blueprint uses Render's free plans for a no-cost demo deployment; free API instances can spin down when idle, and free PostgreSQL databases expire after 30 days. Use a paid database plan and an appropriate paid API plan for persistent production data. The production profile disables the development demo accounts; new buyers and farmers can register through the app.
