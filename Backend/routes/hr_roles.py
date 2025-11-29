# backend/routes/hr_roles.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from ..deps import get_current_user
from ..db.mongo import job_roles, interview_types, difficulties

router = APIRouter(prefix="/hr/roles", tags=["hr_roles"])

class JobRoleModel(BaseModel):
    name: str
    description: Optional[str] = ""

class InterviewTypeModel(BaseModel):
    job_role_id: str
    type_name: str
    description: Optional[str] = ""

class DifficultyModel(BaseModel):
    interview_type_id: str
    level: str   # Easy/Medium/Hard
    description: Optional[str] = ""

@router.post("/job-role")
async def create_job_role(payload: JobRoleModel, user=Depends(get_current_user)):
    if user["role"] != "hr":
        raise HTTPException(status_code=403, detail="Forbidden")
    doc = payload.dict()
    res = await job_roles.insert_one(doc)
    return {"id": str(res.inserted_id)}

@router.post("/interview-type")
async def create_interview_type(payload: InterviewTypeModel, user=Depends(get_current_user)):
    if user["role"] != "hr":
        raise HTTPException(status_code=403, detail="Forbidden")
    res = await interview_types.insert_one(payload.dict())
    return {"id": str(res.inserted_id)}

@router.post("/difficulty")
async def create_difficulty(payload: DifficultyModel, user=Depends(get_current_user)):
    if user["role"] != "hr":
        raise HTTPException(status_code=403, detail="Forbidden")
    res = await difficulties.insert_one(payload.dict())
    return {"id": str(res.inserted_id)}

@router.get("/job-roles")
async def list_job_roles(user=Depends(get_current_user)):
    # both HR and Students may list roles; allow all authenticated
    cur = job_roles.find({})
    out = []
    async for d in cur:
        d["_id"] = str(d["_id"])
        out.append(d)
    return out

@router.get("/types/{job_role_id}")
async def list_types(job_role_id: str):
    cur = interview_types.find({"job_role_id": job_role_id})
    out=[]
    async for d in cur:
        d["_id"] = str(d["_id"])
        out.append(d)
    return out

@router.get("/difficulties/{interview_type_id}")
async def list_difficulties(interview_type_id: str):
    cur = difficulties.find({"interview_type_id": interview_type_id})
    out=[]
    async for d in cur:
        d["_id"] = str(d["_id"])
        out.append(d)
    return out
