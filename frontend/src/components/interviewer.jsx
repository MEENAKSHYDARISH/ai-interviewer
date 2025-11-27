import React, {useRef, useState, useEffect} from 'react'
import { startSession, uploadAudioChunk, finishSession } from '../api'


export default function Interviewer(){
const [recording, setRecording] = useState(false)
const mediaRef = useRef(null)
const recorderRef = useRef(null)
const chunksRef = useRef([])
const [sessionId, setSessionId] = useState(null)


useEffect(()=>{
async function init(){
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
mediaRef.current.srcObject = stream
mediaRef.current.play()
}
init()
},[])


async function handleStart(){
const res = await startSession({ role: 'candidate' })
setSessionId(res.sessionId)
const stream = mediaRef.current.srcObject
const rec = new MediaRecorder(stream, { mimeType: 'audio/webm' })
rec.ondataavailable = async (e)=>{
if(e.data && e.data.size>0){
const form = new FormData()
form.append('chunk', e.data)
await uploadAudioChunk(res.sessionId, form)
}
}
rec.start(3000) // 3s chunks
recorderRef.current = rec
setRecording(true)
}


async function handleStop(){
recorderRef.current.stop()
await finishSession(sessionId)
setRecording(false)
}


return (
<div>
<video ref={mediaRef} width={320} height={240} autoPlay muted style={{background:'#000'}}/>
<div className="mt-4">
{!recording ? <button onClick={handleStart}>Start Interview</button> : <button onClick={handleStop}>Stop Interview</button>}
</div>
</div>
)
}