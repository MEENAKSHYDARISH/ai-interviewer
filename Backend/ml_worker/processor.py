# Lightweight coordinator that calls STT and scoring
import os
from pathlib import Path

def process_session(session_id, chunk_paths):
    # 1) merge chunks to single wav (ffmpeg)
    out = Path('/tmp') / f'{session_id}.wav'
    files_txt = Path('/tmp') / f'{session_id}_files.txt'
    with open(files_txt,'w') as f:
        for p in chunk_paths:
            f.write(f"file '{p}'\n")
    # run ffmpeg concat
    os.system(f"ffmpeg -f concat -safe 0 -i {files_txt} -c copy /tmp/{session_id}.webm")
    # convert webm to wav
    os.system(f"ffmpeg -i /tmp/{session_id}.webm -ar 16000 -ac 1 {out}")

    # 2) call STT
    from . import whisper_processor, sentiment
    text = whisper_processor.transcribe(str(out))

    # 3) sentiment and scoring
    sent = sentiment.analyze(text)

    # 4) save report
    report = {
        'session': session_id,
        'transcript': text,
        'sentiment': sent,
    }
    import json
    with open(f'/tmp/{session_id}_report.json','w') as f:
        json.dump(report,f)
    # (Optional) upload to S3, notify recruiters, etc.
