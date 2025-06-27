import os, requests
from app.services.risk_engine import extract_risks

API_KEY = os.getenv("GRANITE_API_KEY")
REGION = os.getenv("WATSONX_REGION")
BASE_URL = f"https://{REGION}.ml.cloud.ibm.com/ml/v1"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

def call_watsonx(model_id: str, prompt: str, max_tokens: int = 300) -> str:
    payload = {
        "model_id": model_id,
        "input": prompt,
        "parameters": { "max_new_tokens": max_tokens }
    }
    resp = requests.post(f"{BASE_URL}/text/generate", headers=HEADERS, json=payload)
    resp.raise_for_status()
    return resp.json()["results"][0]["generated_text"]

def summarize_text(text: str) -> dict:
    summary = call_watsonx(
        "granite-4-0-tiny",
        f"Summarize this business report in 3 key points:\n\n{text}"
    )
    risks = call_watsonx(
        "granite-3-3-instruct",
        f"Identify any business risks in the text below (compliance, financial, reputational):\n\n{text}"
    ).splitlines()
    return {"summary": summary.strip(), "risks": [r.strip() for r in risks if r.strip()]}

def summarize_audio(audio_bytes: bytes) -> dict:
    transcription = call_watsonx(
        "granite-speech-8b",
        f"Transcribe this audio:\n\n{audio_bytes[:100].hex()}..."
    )
    return summarize_text(transcription)
