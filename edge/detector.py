import cv2, numpy as np

class SimpleDetector:
    """
    Minimal motion/region detector for demo.
    Replace with YOLO/SSD for SKU detection later.
    """
    def __init__(self):
        self.bg = None

    def process(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.GaussianBlur(gray,(21,21),0)
        if self.bg is None:
            self.bg = gray
            return {"movement": False}
        delta = cv2.absdiff(self.bg, gray)
        thresh = cv2.threshold(delta, 25, 255, cv2.THRESH_BINARY)[1]
        thresh = cv2.dilate(thresh, None, iterations=2)
        cnts,_ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        movement = any(cv2.contourArea(c) > 1500 for c in cnts)
        return {"movement": movement}
