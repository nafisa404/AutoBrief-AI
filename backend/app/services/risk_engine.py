import re
KEYWORDS = ["compliance","fraud","inflation","regulatory","cybersecurity","geopolitical"]
def extract_risks(text: str):
    found = [kw for kw in KEYWORDS if re.search(rf"\b{kw}\b", text.lower())]
    return found or ["none detected"]
