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
    allow_origins=["*"],  # You can replace this with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summarize.router, prefix="/api/summarize", tags=["Summarize"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is live ✅"}
