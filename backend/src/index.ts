import http from "http";
import express from "express";
import cors from "cors";
import pino from "pino";
import bodyParser from "body-parser";
import { config } from "./config.js";
import { attachWebsocket } from "./ws.js";
import shelves from "./routes/shelves.js";
import items from "./routes/items.js";
import eventsRouter from "./routes/events.js";

const log = pino({ transport: { target: "pino-pretty" }});
const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(bodyParser.json());
app.get("/health", (_req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const emitter = attachWebsocket(server);

app.use("/api/shelves", shelves);
app.use("/api/items", items);
app.use("/api/events", eventsRouter(emitter));

server.listen(config.port, () => log.info(`Backend listening on :${config.port}`));
