import React from "react";

export default function ShelfCard({ shelf }: { shelf: any }) {
    const low = shelf.items.filter((i: any) => i.quantity <= i.minStock);
    return (
        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
            <h3>{shelf.name}</h3>
            <p><small>{shelf.location}</small></p>
            <ul>
                {shelf.items.map((i: any) => (
                    <li key={i.id}>
                        {i.name} — qty: {i.quantity} {i.quantity <= i.minStock ? "⚠️" : ""}
                    </li>
                ))}
            </ul>
            {low.length > 0 && <p>⚠️ Low stock items: {low.map((i:any)=>i.name).join(", ")}</p>}
        </div>
    );
}
