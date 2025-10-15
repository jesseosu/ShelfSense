import { Router } from "express";
import { z } from "zod";
import { EventType } from "@prisma/client";
import { ingestEvent } from "../services/eventIngest.js";

export default function eventsRouter(emitter: { broadcast: (ev: any) => void }) {
    const r = Router();

    const EventSchema = z.object({
        shelfId: z.string(),
        deviceId: z.string().optional(),
        type: z.nativeEnum(EventType),
        itemId: z.string().optional(),
        payload: z.any()
    });

    r.post("/", async (req, res) => {
        const parsed = EventSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json(parsed.error.flatten());
        const ev = await ingestEvent(parsed.data);
        emitter.broadcast({ channel: "events", data: ev });
        res.json({ ok: true, event: ev });
    });

    r.get("/", async (_req, res) => {
        res.json({ ok: true, events: [] }); // stub; add pagination if desired
    });

    return r;
}
