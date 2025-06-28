# backend/app/routes/summarize.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from app.services.granite_client import summarize_text, summarize_file

router = APIRouter()

@router.post("/text/")
async def summarize_from_text(request: Request):
    try:
        body = await request.json()
        text = body.get("text", "")
        if not text:
            raise HTTPException(status_code=400, detail="No text provided")
        result = summarize_text(text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")

@router.post("/file/")
async def summarize_from_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        result = summarize_file(contents, file.filename)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File summarization failed: {str(e)}")
