import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GRANITE_API_KEY")
PROJECT_ID = os.getenv("PROJECT_ID")
MODEL_ID = os.getenv("MODEL_ID", "granite-13b-chat-v2")

BASE_URL = f"https://us-south.ml.cloud.ibm.com/ml/v1-beta/projects/{PROJECT_ID}/model-inference/{MODEL_ID}"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def summarize_text(text: str):
    payload = {
        "model_id": MODEL_ID,
        "input": [
            {
                "role": "user",
                "content": f"Summarize the following and list risks:\n{text}"
            }
        ],
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 300,
            "min_new_tokens": 20
        }
    }

    try:
        response = requests.post(BASE_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        output = result["results"][0]["generated_text"]

        # Optional: parse risks from text
        risks = extract_risks(output)

        return {"summary": output, "risks": risks}
    except Exception as e:
        print("ERROR in summarize_text:", e)
        return {"summary": "❌ Error summarizing", "risks": []}

def extract_risks(text):
    # basic placeholder, improve with NLP later
    risk_keywords = ["risk", "issue", "concern", "problem", "danger", "threat"]
    found = [word for word in risk_keywords if word in text.lower()]
    return list(set(found))
