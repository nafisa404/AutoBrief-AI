import os
from dotenv import load_dotenv

load_dotenv()  # ✅ Load variables from .env

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import summarize

app = FastAPI(title="AutoBrief AI Backend")

# Optional: Test it worked
print("🔐 GRANITE_API_KEY:", os.getenv("GRANITE_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summarize.router, prefix="/api/summarize", tags=["Summarize"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
