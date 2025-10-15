# Architecture (MVP)

flowchart LR
subgraph Edge
Cam[Camera] --> CV[Detector]
CV -->|HTTP POST| API[(Backend API)]
end
subgraph Backend
API --> DB[(Postgres)]
API --> WS[WebSocket Broadcast]
end
WS --> FE[React Dashboard]

- Edge: OpenCV-based motion/SKU detection → POST /api/events
- Backend: Express+Prisma → persists Event, mutates Item.qty on remove/return, emits WS
- Frontend: Subscribe to WS → update live event table + per-shelf stock cards
