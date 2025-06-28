from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from app.services.granite_client import summarize_text
from app.services.risk_engine import extract_risks

router = APIRouter()

class TextInput(BaseModel):
    text: str

@router.post("/text/")
def summarize_text_route(payload: TextInput, request: Request):
    try:
        result = summarize_text(payload.text)
        risks = extract_risks(result["summary"])
        return {"summary": result["summary"], "risks": risks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

