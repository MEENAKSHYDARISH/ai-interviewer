import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <div className="neon-card">
        <h1 className="title">IntervuGo</h1>
        <p className="subtitle">AI‑Powered Virtual Interview Platform</p>

        <button
          className="neon-btn primary"
          onClick={() => navigate("/student/select")}
        >
          🚀 Student Login
        </button>

        <button
          className="neon-btn secondary"
          onClick={() => navigate("/hr/setup")}
        >
          🧑‍💼 HR Login
        </button>
      </div>
    </div>
  );
}
