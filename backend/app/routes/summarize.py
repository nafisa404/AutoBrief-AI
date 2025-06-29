from fastapi import APIRouter, Request
from app.services.granite_client import summarize_text_ibm
from app.utils.risk_engine import extract_risks

router = APIRouter()

@router.post("/text/")
async def summarize_text(request: Request):
    body = await request.json()
    user_input = body.get("text", "")
    
    summary = summarize_text_ibm(user_input)
    if not summary:
        return {"summary": "❌ Error summarizing", "risks": []}
    
    risks = extract_risks(summary)
    return {"summary": summary, "risks": risks}
