import "./home.css";
import NeonButton from "../components/neonbutton";
import AnimatedLogo from "../components/AnimatedLogo";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home-container">

      <div className="side-left" />
      <div className="side-right" />

      <div className="center-content">
        <AnimatedLogo />

        <h2 className="tagline">Your Smart AI Interview Partner.</h2>
        <p className="sub-text">Practice interviews. Get real-time feedback. Get hired faster.</p>

        <div className="login-options">
          <NeonButton text="Student Login" onClick={() => nav("/student/options")} />
          <NeonButton text="HR Login" onClick={() => nav("/hr/panel")} />
        </div>
      </div>

    </div>
  );
}
