import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import summarize

load_dotenv()

app = FastAPI(title="AutoBrief AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(summarize.router, prefix="/api/summarize", tags=["Summarize"])

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "✅ AutoBrief AI backend is running and ready!"
    }

@app.get("/")
def welcome():
    return {
        "message": "👋 Welcome to AutoBrief AI Backend. Use /docs to explore the API.",
        "status": "running"
    }
