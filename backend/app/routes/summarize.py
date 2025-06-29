from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.granite_client import summarize_text, summarize_file
from app.services.risk_engine import extract_risks

router = APIRouter()


@router.post("/text/")
async def summarize_text_route(payload: dict):
    try:
        text = payload.get("text")
        if not text:
            raise HTTPException(status_code=400, detail="Text is required.")
        summary = summarize_text(text)
        risks = extract_risks(summary)
        return {"summary": summary, "risks": risks}
    except Exception as e:
        print("❌ Text summary error:", e)
        raise HTTPException(status_code=500, detail="Text summarization failed.")


@router.post("/file/")
async def summarize_file_route(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        summary = summarize_file(file.filename, contents)
        risks = extract_risks(summary)
        return {"summary": summary, "risks": risks}
    except Exception as e:
        print("❌ File summary error:", e)
        raise HTTPException(status_code=500, detail="File summarization failed.")
