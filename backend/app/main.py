# backend/app/main.py
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import summarize

load_dotenv()

app = FastAPI(title="AutoBrief AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(summarize.router, prefix="/api/summarize", tags=["Summarize"])

@app.get("/")
def welcome():
    return {"message": "👋 Welcome to AutoBrief AI Backend", "status": "running"}

@app.get("/health")
def health():
    return {"status": "ok", "message": "✅ AutoBrief AI backend is running and ready!"}
