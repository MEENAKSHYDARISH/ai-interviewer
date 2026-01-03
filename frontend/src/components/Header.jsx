import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "60px",
        background: "#0f172a",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 1000
      }}
    >
      <h2>AI Interviewer</h2>

      <nav style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/student-role" style={{ color: "white" }}>Student</Link>
        <Link to="/hr-role" style={{ color: "white" }}>HR</Link>
      </nav>
    </header>
  );
}
