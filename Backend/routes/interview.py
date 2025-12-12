from fastapi import APIRouter, UploadFile, File, BackgroundTasks
import uuid, os
from pathlib import Path

router = APIRouter()
BASE_DIR = Path(__file__).resolve().parents[1]
STORAGE = BASE_DIR / 'data'
STORAGE.mkdir(exist_ok=True)

sessions = {}

@router.post('/')
async def create_session(payload: dict):
    sid = str(uuid.uuid4())
    sessions[sid] = {'id':sid, 'chunks':[]}
    return {'sessionId': sid}

@router.post('/{session_id}/audio')
async def upload_audio(session_id: str, chunk: UploadFile = File(...)):
    sess = sessions.get(session_id)
    if not sess:
        return {'error':'session not found'}
    filename = STORAGE / f"{session_id}_{len(sess['chunks'])}.webm"
    content = await chunk.read()
    with open(filename,'wb') as f:
        f.write(content)
    sess['chunks'].append(str(filename))
    return {'ok': True}

@router.post('/{session_id}/finish')
async def finish(session_id: str, background: BackgroundTasks = None):
    sess = sessions.get(session_id)
    if not sess:
        return {'error':'session not found'}
    # Offload processing to background task
    from ml_worker import processor
    background.add_task(processor.process_session, session_id, sess['chunks'])
    return {'status':'processing'}

