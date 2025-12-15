import logo from "../assets/logo.png";
import "./neon.css";

export default function AnimatedLogo() {
  return (
    <div className="logo-wrapper">
      <img src={logo} className="logo-glow" alt="logo" />
    </div>
  );
}
