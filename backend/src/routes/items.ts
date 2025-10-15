import { Router } from "express";
import { prisma } from "../db.js";

const r = Router();

r.get("/", async (_req, res) => {
    res.json({ items: await prisma.item.findMany() });
});

export default r;
