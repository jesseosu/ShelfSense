const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";
export async function getShelves() {
    const res = await fetch(`${API_BASE}/api/shelves`);
    return res.json();
}
