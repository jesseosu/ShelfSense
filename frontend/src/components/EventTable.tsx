import React from "react";
export default function EventTable({ events }: { events: any[] }) {
    return (
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
            <tr><th>Time</th><th>Type</th><th>Shelf</th><th>Item</th></tr>
            </thead>
            <tbody>
            {events.slice(-50).reverse().map((e:any) => (
                <tr key={e.data?.id ?? Math.random()}>
                    <td>{new Date(e.data?.createdAt ?? Date.now()).toLocaleTimeString()}</td>
                    <td>{e.data?.type}</td>
                    <td>{e.data?.shelfId}</td>
                    <td>{e.data?.itemId ?? "-"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
