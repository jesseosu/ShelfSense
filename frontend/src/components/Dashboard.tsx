import React, { useEffect, useState } from "react";
import { getShelves } from "../api";
import ShelfCard from "./ShelfCard";
import EventTable from "./EventTable";
import { useWS } from "../hooks/useWS";

export default function Dashboard() {
    const [shelves, setShelves] = useState<any[]>([]);
    const events = useWS(import.meta.env.VITE_WS_URL ?? "ws://localhost:8080/ws");

    useEffect(() => { getShelves().then(r => setShelves(r.shelves)); }, []);
    return (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 24, padding: 24 }}>
            <div>
                <h2>Shelves</h2>
                <div style={{ display:"grid", gap: 12 }}>
                    {shelves.map(s => <ShelfCard key={s.id} shelf={s} />)}
                </div>
            </div>
            <div>
                <h2>Live Events</h2>
                <EventTable events={events.filter(e => e.channel === "events")} />
            </div>
        </div>
    );
}
