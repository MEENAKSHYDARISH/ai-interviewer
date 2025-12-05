// src/interview/VideoInterviewer.jsx
import React, { useEffect, useRef, useState } from "react";
import api from "../api";

export default function VideoInterviewer() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera error", err);
      }
    }
    startCamera();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Virtual AI Interviewer</h1>

      <div className="video-box">
        <video
          ref={videoRef}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        ></video>
      </div>

      <div className="glass-card">
        <h2 style={{ marginBottom: "12px" }}>Live Metrics</h2>
        <p>No metrics yet. They will appear once the interview starts.</p>
      </div>

      <div className="glass-card">
        <input
          type="text"
          className="input-box"
          placeholder="Enter a question for the AI avatar..."
        />
        <button className="btn btn-primary">Generate Avatar Question</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button className="btn btn-primary">Start Interview</button>
        <button className="btn btn-success">Finish Interview</button>

        <span style={{ marginLeft: "20px", opacity: 0.7 }}>
          Status: {status}
        </span>
      </div>
    </div>
  );
}
