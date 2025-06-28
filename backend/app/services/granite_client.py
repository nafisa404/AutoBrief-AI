import os
import requests
from dotenv import load_dotenv

load_dotenv()

def summarize_text(text: str) -> dict:
    """
    Calls IBM Watsonx Granite 3.3 model to summarize text.
    """
    GRANITE_API_KEY = os.getenv("GRANITE_API_KEY")
    if not GRANITE_API_KEY:
        raise ValueError("Missing GRANITE_API_KEY in environment variables")

    url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2024-05-01"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GRANITE_API_KEY}"
    }

    payload = {
        "model_id": "granite-3b-chat",  # Or granite-13b if allowed
        "messages": [
            {"role": "system", "content": "You are a helpful summarizer."},
            {"role": "user", "content": f"Summarize this text: {text}"}
        ],
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 200,
            "min_new_tokens": 20
        }
    }

    response = requests.post(url, json=payload, headers=headers)
    if response.status_code != 200:
        raise Exception(f"Watsonx API Error: {response.text}")

    summary = response.json()["generated_text"]
    return {"summary": summary}

