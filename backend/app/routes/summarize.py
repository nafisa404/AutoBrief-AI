from fastapi import APIRouter
from pydantic import BaseModel
from app.services.granite_client import summarize_with_granite
from app.services.risk_engine import extract_risks

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/text/")
def summarize_text(request: TextRequest):
    summary = summarize_with_granite(request.text)
    risks = extract_risks(summary)
    return {
        "summary": summary,
        "risks": risks
    }
