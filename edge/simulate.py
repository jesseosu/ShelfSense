import os, time, random, requests

REST = os.environ.get("BACKEND_REST_URL","http://localhost:8080")
SHELF_ID = os.environ.get("SHELF_ID","demo-shelf-1")
DEVICE_ID = os.environ.get("DEVICE_ID","shelf-edge-sim-001")

def pick_item():
    items = requests.get(f"{REST}/api/items", timeout=5).json()["items"]
    return random.choice(items)["id"]

types = ["ITEM_REMOVED","ITEM_RETURNED"]
print("Simulator emitting events...")
while True:
    item_id = pick_item()
    evt = {
        "shelfId": SHELF_ID,
        "deviceId": DEVICE_ID,
        "type": random.choice(types),
        "itemId": item_id,
        "payload": {"source": "sim"}
    }
    try:
        requests.post(f"{REST}/api/events", json=evt, timeout=5)
        print("sent", evt["type"], "item", item_id)
    except Exception as e:
        print("send failed:", e)
    time.sleep(random.uniform(0.7, 2.0))
