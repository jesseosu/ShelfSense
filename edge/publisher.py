import json, time, os, requests

REST_URL = os.environ.get("BACKEND_REST_URL","http://localhost:8080")

def publish_event(payload: dict):
    r = requests.post(f"{REST_URL}/api/events", json=payload, timeout=5)
    r.raise_for_status()
    return r.json()
