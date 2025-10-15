# ShelfSense — Real-Time Smart Shelf System

Edge CV + streaming events → typed backend + DB → real-time React dashboard.  
Dockerized for quick demo. Includes a simulator (no camera needed).

## Why this project
- Mimics real store tech (inventory sensing, low-latency eventing).
- Demonstrates end-to-end engineering: device → inference → transport → persistence → realtime UI.
- Production-ish patterns: typed services, schema, migrations, logging, WS fan-out.

## Demo (Local)

```bash
cp .env.example .env
docker compose -f infra/docker-compose.yml up --build
docker exec -it shelvesense-backend pnpm prisma migrate deploy
docker exec -it shelvesense-backend pnpm ts-node prisma/seed.ts
# if no camera:
docker exec -it shelvesense-edge python simulate.py
