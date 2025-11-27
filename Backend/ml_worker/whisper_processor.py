# This wrapper calls OpenAI Whisper API if API key present, else tries local whisper
import os

def transcribe(wav_path: str) -> str:
    api_key = os.getenv('OPENAI_API_KEY')
    if api_key:
        # call OpenAI Speech to Text (example - replace with real request code)
        # NOTE: use official SDK or REST call
        import requests
        headers = {'Authorization': f'Bearer {api_key}'}
        files = {'file': open(wav_path,'rb')}
        # minimal example (pseudocode)
        # r = requests.post('https://api.openai.com/v1/audio/transcriptions', headers=headers, files=files, data={'model':'whisper-1'})
        # return r.json()['text']
        return 'transcribed text from external API (placeholder)'
    else:
        # local whisper (if installed)
        try:
            from whisper import load_model
            model = load_model('small')
            res = model.transcribe(wav_path)
            return res['text']
        except Exception as e:
            return ''

