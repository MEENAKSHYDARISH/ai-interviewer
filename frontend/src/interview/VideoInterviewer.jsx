// src/interview/VideoInterviewer.jsx
import React, { useRef, useState, useEffect } from "react";
import api from "../api";
import AvatarInterviewer from "./AvatarInterviewer";
import GlassCard from "../components/GlassCard";
import { useNavigate } from "react-router-dom";

/**
 * VideoInterviewer
 * - startSession -> POST /realtime/start (gets session_id)
 * - captures frames every FRAME_INTERVAL ms and POSTs to /realtime/{sessionId}/frame { frame: dataUrl }
 * - records audio with MediaRecorder, uploads chunks to /realtime/{sessionId}/audio (form-data "chunk")
 * - on stop -> POST /realtime/{sessionId}/finish and navigate to report
 *
 * NOTE: backend must accept JSON frame POST and file POST for audio chunks.
 */

const FRAME_INTERVAL = 500; // ms (adjust to balance bandwidth & CPU)
const AUDIO_CHUNK_MS = 3000; // ms - MediaRecorder chunk size

export default function VideoInterviewer() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const frameTimerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [recording, setRecording] = useState(false);
  const [metrics, setMetrics] = useState([]); // list of recent metric objects
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  useEffect(() => {
    // init camera
    async function initCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.error("getUserMedia error", err);
        alert("Please allow camera and microphone access.");
      }
    }
    initCamera();
    return () => {
      stopAllStreams();
    };
  }, []);

  function stopAllStreams() {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  }

  async function startSession() {
    try {
      setStatus("starting");
      const resp = await api.post("/realtime/start", new URLSearchParams({ job_role: "General" }));
      const sid = resp.data.session_id;
      setSessionId(sid);
      setStatus("recording");
      setRecording(true);
      startFrameLoop(sid);
      startAudioRecorder(sid);
    } catch (e) {
      console.error(e);
      alert("Could not start session");
      setStatus("idle");
    }
  }

  function startFrameLoop(sid) {
    const video = videoRef.current;
    // create an offscreen canvas once
    if (!canvasRef.current) {
      const c = document.createElement("canvas");
      c.width = 640;
      c.height = 480;
      canvasRef.current = c;
    }
    const ctx = canvasRef.current.getContext("2d");

    frameTimerRef.current = setInterval(async () => {
      try {
        ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
        // quality 0.6 to reduce size; you may tune
        const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.6);
        // POST JSON to backend
        const body = { frame: dataUrl };
        const res = await api.post(`/realtime/${sid}/frame`, body);
        if (res?.data?.metrics) {
          // if backend returns per-frame metrics
          setMetrics((m) => [res.data.metrics, ...m].slice(0, 10));
        } else if (res?.data?.metrics === undefined && res?.data?.ok) {
          // backend returns metrics inline in older versions
          // try res.data.metrics fallback
        }
      } catch (err) {
        // network errors shouldn't break loop
        console.warn("frame upload err", err);
      }
    }, FRAME_INTERVAL);
  }

  function startAudioRecorder(sid) {
    const stream = videoRef.current.srcObject;
    if (!stream) return alert("No media stream available");
    const options = { mimeType: "audio/webm;codecs=opus" };
    const recorder = new MediaRecorder(stream, options);
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = async (ev) => {
      if (ev.data && ev.data.size > 0) {
        try {
          const fd = new FormData();
          fd.append("chunk", ev.data, "chunk.webm");
          // upload chunk
          await api.post(`/realtime/${sid}/audio`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        } catch (err) {
          console.warn("audio upload error", err);
        }
      }
    };

    recorder.onstart = () => console.log("recorder started");
    recorder.onstop = () => console.log("recorder stopped");
    recorder.onerror = (e) => console.warn("recorder error", e);

    // start with chunk timeslice
    recorder.start(AUDIO_CHUNK_MS);
  }

  async function stopSession() {
    try {
      setStatus("stopping");
      // stop frame loop
      if (frameTimerRef.current) {
        clearInterval(frameTimerRef.current);
        frameTimerRef.current = null;
      }
      // stop recorder
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      setRecording(false);
      // finish endpoint
      if (!sessionId) return alert("No session id");
      await api.post(`/realtime/${sessionId}/finish`);
      setStatus("processing");
      // navigate to report viewer after a short delay (or poll)
      // you can poll /realtime/{id}/report until completed
      navigate(`/report/${sessionId}`);
    } catch (e) {
      console.error(e);
      alert("Error finishing session");
      setStatus("idle");
    }
  }

  return (
    <div className="container">
      <div className="col">
        <GlassCard title="Virtual Interview (Video + Avatar)">
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ minWidth: 340 }}>
              <video ref={videoRef} width={640} height={480} autoPlay muted playsInline style={{ borderRadius: 12, background: "#000" }} />
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                {!recording ? (
                  <button className="btn primary" onClick={startSession}>Start Interview</button>
                ) : (
                  <button className="btn" onClick={stopSession}>Stop & Submit</button>
                )}
                <div className="small" style={{ alignSelf: "center" }}>Status: {status}</div>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <GlassCard title="Live Video Metrics" style={{ minHeight: 160 }}>
                {metrics.length === 0 ? (
                  <div className="hint">No metrics yet. Metrics arrive after frame uploads.</div>
                ) : (
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <b>Latest metrics</b>
                    </div>
                    <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>{JSON.stringify(metrics[0], null, 2)}</pre>
                  </div>
                )}
              </GlassCard>

              <div style={{ height: 12 }} />

              <AvatarInterviewer />
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
