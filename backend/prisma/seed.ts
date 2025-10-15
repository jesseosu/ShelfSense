import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const shelf = await prisma.shelf.upsert({
        where: { id: "demo-shelf-1" },
        update: {},
        create: { id: "demo-shelf-1", name: "Front Aisle Shelf", location: "Sydney Store" }
    });

    const items = [
        { sku:"COLA-330", name:"Cola Can 330ml", quantity: 8, minStock: 3 },
        { sku:"CHIPS-90", name:"Potato Chips 90g", quantity: 5, minStock: 2 },
        { sku:"BAR-CHOCO", name:"Choc Bar", quantity: 10, minStock: 4 }
    ];

    for (const it of items) {
        await prisma.item.create({ data: { ...it, shelfId: shelf.id } });
    }
}
main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1);});
