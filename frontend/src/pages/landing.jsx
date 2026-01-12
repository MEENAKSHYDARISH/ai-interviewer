import "./landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">IntervuGo</h1>
        <p className="landing-subtitle">
          AI‑Powered Virtual Interview Platform
        </p>

        <button
          className="landing-btn"
          onClick={() => navigate("/student/select")}
        >
          🚀 Student Login
        </button>

        <button
          className="landing-btn secondary"
          onClick={() => navigate("/hr/setupg")}
        >
          👩‍💼 HR Login
        </button>
      </div>
    </div>
  );
}
