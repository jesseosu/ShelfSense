import os, time, yaml, cv2, random
from detector import SimpleDetector
from publisher import publish_event

with open(os.path.join(os.path.dirname(__file__),"config.yaml"), "r") as f:
    cfg = yaml.safe_load(f)

DEVICE_ID = cfg.get("device_id")
SHELF_ID  = cfg.get("shelf_id")
CAM_IDX   = cfg.get("camera_index", 0)

cap = cv2.VideoCapture(CAM_IDX)
detector = SimpleDetector()

# In a real build: map ROIs to itemIds via config
DEMO_ITEM_IDS = []

def pick_random_item():
    return DEMO_ITEM_IDS[random.randrange(len(DEMO_ITEM_IDS))] if DEMO_ITEM_IDS else None

print("Edge loop starting...")
while True:
    ok, frame = cap.read()
    if not ok:
        time.sleep(0.25)
        continue
    result = detector.process(frame)
    if result.get("movement"):
        # naive demo logic: alternate removed/returned events
        evt_type = "ITEM_REMOVED" if int(time.time()) % 2 == 0 else "ITEM_RETURNED"
        payload = {
          "shelfId": SHELF_ID,
          "deviceId": DEVICE_ID,
          "type": evt_type,
          "itemId": None, # put a mapped id in a real build
          "payload": {"movement": True}
        }
        try:
            publish_event(payload)
        except Exception as e:
            print("publish failed:", e)
        time.sleep(1.0)
