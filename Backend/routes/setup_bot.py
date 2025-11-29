# backend/routes/setup_bot.py
from fastapi import APIRouter, Depends, HTTPException, Body
from ..deps import get_current_user
from ..config import OPENAI_API_KEY
import openai
import json

router = APIRouter(prefix="/student", tags=["setup_bot"])
openai.api_key = OPENAI_API_KEY

@router.post("/setup-bot")
async def setup_bot(message: dict = Body(...), user=Depends(get_current_user)):
    # message: { "text": "I want to practice Python backend technical medium" }
    if user["role"] != "student":
        raise HTTPException(status_code=403, detail="Forbidden")
    text = message.get("text","")
    system = """You are an assistant that maps a student's free-text request into a JSON with keys:
- job_role (string),
- interview_type (one of: Technical, HR, Behavioral, Stress, Aptitude, Custom),
- difficulty (Easy, Medium, Hard).
Return only a compact JSON object with those fields. If job role is unknown, set job_role to 'General'."""
    prompt = [
        {"role":"system", "content": system},
        {"role":"user", "content": f"User request: {text}\nReturn JSON only."}
    ]
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=prompt,
            temperature=0.0,
            max_tokens=200
        )
        content = resp.choices[0].message["content"].strip()
        # try parse json
        try:
            parsed = json.loads(content)
        except Exception:
            # fallback — attempt to extract using a naive parsing
            parsed = {"job_role":"General","interview_type":"Technical","difficulty":"Medium"}
        return parsed
    except Exception as e:
        return {"job_role":"General","interview_type":"Technical","difficulty":"Medium", "error": str(e)}
