# backend/app/services/granite_client.py
import os
import requests

GRANITE_URL = os.getenv("GRANITE_URL")  # e.g., "https://us-south.ml.cloud.ibm.com"
GRANITE_API_KEY = os.getenv("GRANITE_API_KEY")

HEADERS = {
    "Authorization": f"Bearer {GRANITE_API_KEY}",
    "Content-Type": "application/json"
}

def summarize_text(text: str) -> dict:
    prompt = f"Summarize this and identify key risks:\n\n{text}"

    response = requests.post(
        f"{GRANITE_URL}/v1/generate",
        headers=HEADERS,
        json={"model_id": "granite-3b-1", "input": prompt}
    )

    if response.status_code != 200:
        raise Exception(f"Error from Watsonx: {response.text}")

    data = response.json()
    return {
        "summary": data.get("results", [{}])[0].get("generated_text", "No summary"),
        "risks": extract_risks(data.get("results", [{}])[0].get("generated_text", ""))
    }

def summarize_file(content: bytes, filename: str) -> dict:
    text = content.decode("utf-8", errors="ignore")
    return summarize_text(text)

def extract_risks(text: str) -> list:
    keywords = ["risk", "danger", "uncertainty", "liability", "exposure"]
    return [word for word in keywords if word.lower() in text.lower()]
