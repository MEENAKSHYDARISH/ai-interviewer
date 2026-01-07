import { useEffect, useRef, useState } from "react";

export default function VideoInterviewer() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    };

    startCamera();

    // cleanup on unmount
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: "24px", color: "#fff" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
        Virtual AI Interviewer
      </h1>

      {/* Camera */}
      <div
        style={{
          width: "640px",
          height: "360px",
          background: "#000",
          borderRadius: "12px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Status */}
      <p style={{ marginBottom: "16px" }}>
        <strong>Status:</strong> {status}
      </p>

      {/* Controls */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => setStatus("Interview Started")}
          style={buttonStyle}
        >
          Start Interview
        </button>

        <button
          onClick={() => setStatus("Interview Finished")}
          style={{ ...buttonStyle, background: "#16a34a" }}
        >
          Finish Interview
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 16px",
  background: "#2563eb",
  border: "none",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
};
