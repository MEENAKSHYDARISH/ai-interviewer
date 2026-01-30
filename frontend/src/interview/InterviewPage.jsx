import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./interview.css";

export default function InterviewPage() {
  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const role = searchParams.get("role") || "Not Selected";
  const type = searchParams.get("type") || "Not Selected";

  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [status, setStatus] = useState("Ready to start interview");
  const [stream, setStream] = useState(null);

  // Start Camera
  const startCamera = async () => {
    try {
      setStatus("Requesting camera access...");
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      setStream(userStream);

      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }

      setStatus("Camera started ✅ You can begin!");
    } catch (error) {
      console.error(error);
      setStatus("Camera permission denied ❌ Please allow camera/mic access");
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleStartInterview = async () => {
    setStarted(true);
    setEnded(false);
    await startCamera();
    setStatus("Interview started 🚀 Answer confidently!");
  };

  const handleFinishInterview = () => {
    stopCamera();
    setEnded(true);
    setStarted(false);
    setStatus("Interview finished ✅ Redirecting to report...");

    setTimeout(() => {
      navigate("/report");
    }, 1200);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="interviewPage">
      <div className="interviewCard">
        <h1 className="interviewTitle">AI Interview Session</h1>

        <p className="interviewSub">
          Role: <span>{role}</span> | Type: <span>{type}</span>
        </p>

        <div className="videoBox">
          <video ref={videoRef} autoPlay muted className="videoFeed"></video>
          {!stream && (
            <div className="videoOverlay">
              <p>🎥 Camera Preview</p>
              <p className="hint">Click Start Interview to begin</p>
            </div>
          )}
        </div>

        <div className="statusBox">
          <p>{status}</p>
        </div>

        <div className="btnRow">
          <button
            className="neonBtn blue"
            onClick={handleStartInterview}
            disabled={started}
          >
            {started ? "Interview Running..." : "Start Interview"}
          </button>

          <button
            className="neonBtn pink"
            onClick={handleFinishInterview}
            disabled={!started}
          >
            Finish Interview
          </button>
        </div>
      </div>
    </div>
  );
}
