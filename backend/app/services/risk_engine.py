def extract_risks(text):
    keywords = ["legal", "risk", "fraud", "compliance", "unauthorized", "penalty"]
    return [kw for kw in keywords if kw in text.lower()]
