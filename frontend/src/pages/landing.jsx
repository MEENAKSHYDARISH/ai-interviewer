import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import logo from "../assets/logo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Glow Background Circles */}
      <div className="glow-circle circle1"></div>
      <div className="glow-circle circle2"></div>

      {/* Center Card */}
      <div className="landing-card glass">
        <img src={logo} alt="IntervuGo Logo" className="landing-logo" />

        <h1 className="title">IntervuGo</h1>
        <p className="subtitle">AI‑Powered Virtual Interview Platform</p>

        <div className="button-group">
          <button className="neon-btn" onClick={() => navigate("/student/login")}>
            🚀 Student Login
          </button>

          <button className="neon-btn" onClick={() => navigate("/hr/login")}>
            🧑‍💼 HR Login
          </button>
        </div>
      </div>
    </div>
  );
}
