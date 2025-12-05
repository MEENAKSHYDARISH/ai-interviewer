# backend/utils/question_picker.py
from ..db.mongo import questions
import random

async def pick_questions(job_role_id, interview_type_id, difficulty, count=5):
    query = {"interview_type_id": interview_type_id}
    if job_role_id:
        query["job_role_id"] = job_role_id
    if difficulty:
        query["difficulty"] = difficulty
    query["active"] = {"$ne": False}
    cur = questions.find(query)
    pool = []
    async for doc in cur:
        pool.append(doc)
    if not pool:
        # fallback to interview_type only
        cur = questions.find({"interview_type_id": interview_type_id, "active": {"$ne": False}})
        pool = [d async for d in cur]
    random.shuffle(pool)
    return pool[:count]
