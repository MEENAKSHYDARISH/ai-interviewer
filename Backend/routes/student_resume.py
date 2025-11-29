# backend/routes/student_resume.py
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from ..deps import get_current_user
from ..db.mongo import fs_bucket, users
from bson import ObjectId

router = APIRouter(prefix="/student", tags=["student_resume"])

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...), user=Depends(get_current_user)):
    # only students allowed to upload
    if user["role"] != "student":
        raise HTTPException(status_code=403, detail="Only students can upload resumes")
    # validate MIME if desired
    content = await file.read()
    # store in GridFS
    file_id = await fs_bucket.upload_from_stream(file.filename, content)
    # save file id to user doc
    await users.update_one({"email": user["sub"]}, {"$set": {"resume_file_id": str(file_id)}})
    return {"file_id": str(file_id)}
