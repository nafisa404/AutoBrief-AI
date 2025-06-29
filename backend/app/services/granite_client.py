import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("WATSONX_API_KEY")
PROJECT_ID = os.getenv("WATSONX_PROJECT_ID")
GRANITE_MODEL = "google/flan-ul2"  # or whichever model you use

API_URL = f"https://us-south.ml.cloud.ibm.com/ml/v1/text-generation?version=2024-03-01"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}",
}


def summarize_text(text):
    try:
        payload = {
            "model_id": GRANITE_MODEL,
            "project_id": PROJECT_ID,
            "input": f"Summarize this: {text[:2000]}"  # limit input
        }
        res = requests.post(API_URL, headers=HEADERS, json=payload)
        res.raise_for_status()
        return res.json().get("results", [{}])[0].get("generated_text", "❌ No summary returned.")
    except Exception as e:
        print("❌ Granite summarize_text error:", e)
        return "❌ Error summarizing"


def summarize_file(filename, content_bytes):
    try:
        if filename.endswith(".pdf"):
            from PyPDF2 import PdfReader
            from io import BytesIO
            reader = PdfReader(BytesIO(content_bytes))
            text = " ".join([page.extract_text() or "" for page in reader.pages])
        else:
            text = content_bytes.decode("utf-8")

        return summarize_text(text)
    except Exception as e:
        print("❌ summarize_file error:", e)
        return "❌ File error or unsupported format"
