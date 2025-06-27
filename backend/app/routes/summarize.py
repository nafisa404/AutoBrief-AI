from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from app.services.granite_client import summarize_text, summarize_audio
from app.utils.preprocess import validate_text_input

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/text/")
async def text_endpoint(req: TextRequest):
    validate_text_input(req.text)
    return summarize_text(req.text)

@router.post("/audio/")
async def audio_endpoint(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    return summarize_audio(audio_bytes)
