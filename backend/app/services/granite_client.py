import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GRANITE_API_KEY")
PROJECT_ID = os.getenv("GRANITE_PROJECT_ID")
MODEL_ID = os.getenv("GRANITE_MODEL_ID", "granite-13b-chat-v2")

BASE_URL = f"https://us-south.ml.cloud.ibm.com/ml/v1-beta/generation/text?version=2024-05-29"

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}

def summarize_text_ibm(prompt: str):
    payload = {
        "model_id": MODEL_ID,
        "project_id": PROJECT_ID,
        "inputs": [f"Summarize this: {prompt}"],
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 150
        }
    }

    try:
        response = requests.post(BASE_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        return data["results"][0]["generated_text"]
    except Exception as e:
        print("Error:", e)
        return None
