import os
from dotenv import load_dotenv

load_dotenv()  # ✅ Load variables from .env

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import summarize

app = FastAPI(title="AutoBrief AI Backend")

# Optional: Print env check on startup
print("🔐 GRANITE_API_KEY is set:", bool(os.getenv("GRANITE_API_KEY")))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace with your frontend URL after deployment
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API route
app.include_router(summarize.router, prefix="/api/summarize", tags=["Summarize"])

# ✅ Health route with custom success message
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "✅ AutoBrief AI backend is running and ready!"
    }

# ✅ Optional root welcome message
@app.get("/")
def welcome():
    return {
        "message": "👋 Welcome to AutoBrief AI Backend. Use /docs to explore the API.",
        "status": "running"
    }

