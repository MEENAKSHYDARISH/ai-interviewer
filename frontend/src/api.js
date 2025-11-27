const BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000'


export async function startSession(payload){
const r = await fetch(`${BASE}/sessions`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
return r.json()
}


export async function uploadAudioChunk(sessionId, formData){
await fetch(`${BASE}/sessions/${sessionId}/audio`, { method:'POST', body: formData })
}


export async function finishSession(sessionId){
const r = await fetch(`${BASE}/sessions/${sessionId}/finish`, { method:'POST' })
return r.json()
}