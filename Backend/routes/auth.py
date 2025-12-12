from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import uuid

router = APIRouter()

# Simple in-memory user store for demo purposes
fake_users = {
    "student1": {"username": "student1", "password": "studentpass", "role": "student"},
    "hr1": {"username": "hr1", "password": "hrpass", "role": "hr"}
}

# Token store: token -> {username, role}
tokens = {}

class LoginPayload(BaseModel):
    username: str
    password: str

@router.post('/login')
def login(payload: LoginPayload):
    user = fake_users.get(payload.username)
    if not user or user.get('password') != payload.password:
        raise HTTPException(status_code=401, detail='Invalid credentials')

    token = str(uuid.uuid4())
    tokens[token] = {"username": user['username'], "role": user['role']}

    return {"access_token": token, "token_type": "bearer", "role": user['role']}

@router.get('/me')
def me(authorization: str = None):
    if not authorization or not authorization.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='Missing token')

    token = authorization.split(' ', 1)[1]
    user = tokens.get(token)

    if not user:
        raise HTTPException(status_code=401, detail='Invalid token')

    return {"username": user['username'], "role": user['role']}

