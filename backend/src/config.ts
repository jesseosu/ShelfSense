export const config = {
    port: Number(process.env.PORT ?? 8080),
    corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    wsHeartbeatMs: Number(process.env.WS_HEARTBEAT_MS ?? 15000)
};
