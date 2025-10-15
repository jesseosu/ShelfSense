import { Router } from "express";
import { prisma } from "../db.js";

const r = Router();

r.get("/", async (_req, res) => {
    const shelves = await prisma.shelf.findMany({ include: { items: true }});
    res.json({ shelves });
});

export default r;
