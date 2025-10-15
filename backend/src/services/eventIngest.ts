import { prisma, } from "../db.js";
import { EventType } from "@prisma/client";

export async function ingestEvent(e: {
    shelfId: string;
    deviceId?: string;
    type: EventType;
    itemId?: string;
    payload: any;
}) {
    // Persist
    const created = await prisma.event.create({ data: e });
    // Apply side effects (e.g., stock mutation)
    if (e.type === "ITEM_REMOVED" && e.itemId) {
        await prisma.item.update({ where: { id: e.itemId }, data: { quantity: { decrement: 1 } } });
    }
    if (e.type === "ITEM_RETURNED" && e.itemId) {
        await prisma.item.update({ where: { id: e.itemId }, data: { quantity: { increment: 1 } } });
    }
    // Low stock alert
    if (e.itemId) {
        const item = await prisma.item.findUnique({ where: { id: e.itemId }});
        if (item && item.quantity <= item.minStock) {
            await prisma.event.create({
                data: {
                    shelfId: e.shelfId,
                    type: EventType.LOW_STOCK,
                    payload: { itemId: e.itemId, quantity: item.quantity }
                }
            });
        }
    }
    return created;
}
