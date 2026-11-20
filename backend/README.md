# Mark's Pre-Owned Cars Backend

FastAPI backend for the Mark's Pre-Owned Cars inventory and lead capture flow.

## Endpoints

- `GET /health`
- `GET /vehicles`
- `GET /vehicles/filters`
- `GET /vehicles/{slug}`
- `POST /leads`

## Local Docker Run

```bash
docker compose --env-file .env.local up --build -d
```

Create `backend/.env.local` from `.env.example` first and set a private `POSTGRES_PASSWORD`.
The local database uses its own persistent Docker volume and host port `5434`.

API will be available at `http://localhost:8001`.
Swagger docs: `http://localhost:8001/docs`.
