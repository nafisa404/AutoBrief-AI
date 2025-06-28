from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from app.services.granite_client import summarize_text
from app.services.risk_engine import extract_risks

router = APIRouter()

class TextInput(BaseModel):
    text: str

@router.post("/text/")
async def summarize_text_route(payload: TextInput):
    summary = summarize_text(payload.text)
    risks = extract_risks(summary)
    return {"summary": summary, "risks": risks}

@router.post("/file/")
async def summarize_file_route(file: UploadFile = File(...)):
    content = await file.read()
    try:
        text = content.decode("utf-8")
    except:
        raise HTTPException(status_code=400, detail="Invalid file encoding. Use UTF-8 .txt file.")
    
    summary = summarize_text(text)
    risks = extract_risks(summary)
    return {"summary": summary, "risks": risks}
