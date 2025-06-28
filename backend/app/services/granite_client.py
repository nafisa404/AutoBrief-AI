import os
import requests

GRANITE_API_KEY = os.getenv("GRANITE_API_KEY")
WATSONX_URL = os.getenv("WATSONX_URL")  # e.g. https://us-south.ml.cloud.ibm.com/foundation-models/api/v1/text/generate

def summarize_with_granite(text: str) -> str:
    if not GRANITE_API_KEY or not WATSONX_URL:
        return "Watsonx credentials not configured."

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GRANITE_API_KEY}",
    }

    payload = {
        "model_id": "granite-3b-instruct",  # Watsonx Granite model
        "inputs": f"Summarize this: {text}",
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 300,
            "min_new_tokens": 50
        }
    }

    try:
        response = requests.post(WATSONX_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        return result["results"][0]["generated_text"]
    except Exception as e:
        return f"Error generating summary: {str(e)}"
