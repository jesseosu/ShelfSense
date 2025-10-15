import { useEffect, useRef, useState } from "react";

export function useWS(url: string) {
    const wsRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        const ws = new WebSocket(url);
        wsRef.current = ws;
        ws.onmessage = (e) => setMessages((m) => [...m, JSON.parse(e.data)]);
        return () => ws.close();
    }, [url]);
    return messages;
}
