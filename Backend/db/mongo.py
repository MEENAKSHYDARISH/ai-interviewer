# backend/db/mongo.py  (append or update)
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorGridFSBucket
from ..config import MONGO_URI

client = AsyncIOMotorClient(MONGO_URI)
db = client.get_default_database()
users = db["users"]
questions = db["questions"]
interview_types = db["interview_types"]
job_roles = db["job_roles"]            # new
difficulties = db["difficulties"]      # new
sessions = db["sessions"]
reports = db["reports"]

# GridFS bucket for resumes
fs_bucket = AsyncIOMotorGridFSBucket(db, bucket_name="resumes")
