import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";
import { prisma } from "./db.js";

type WSClient = WebSocket & { isAlive?: boolean };

export function attachWebsocket(server: Server) {
    const wss = new WebSocketServer({ server, path: "/ws" });

    wss.on("connection", (ws: WSClient) => {
        ws.isAlive = true;
        ws.on("pong", () => (ws.isAlive = true));
    });

    // Heartbeat
    setInterval(() => {
        wss.clients.forEach((ws: WSClient) => {
            if (!ws.isAlive) return ws.terminate();
            ws.isAlive = false;
            ws.ping();
        });
    }, 15000);

    // Minimal broadcast function
    async function broadcast(event: object) {
        const data = JSON.stringify(event);
        wss.clients.forEach((ws) => ws.readyState === ws.OPEN && ws.send(data));
    }

    // return a tiny emitter to use in eventIngest
    return { broadcast };
}
