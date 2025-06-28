RISK_KEYWORDS = [
    "lawsuit", "fraud", "hack", "cyberattack", "layoff", "regulation",
    "compliance", "penalty", "breach", "financial loss", "downturn"
]

def extract_risks(summary: str):
    detected = []
    lowered = summary.lower()
    for keyword in RISK_KEYWORDS:
        if keyword in lowered:
            detected.append(keyword)
    return list(set(detected))
