import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonCard from "../components/NeonCard";

export default function StudentRolePage() {
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/start-interview", {
      state: { userType: "student", role, type }
    });
  };

  return (
    <div className="page-center">
      <NeonCard>
        <h2>Select Your Role</h2>

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Choose job role</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
        </select>

        <select onChange={(e) => setType(e.target.value)}>
          <option value="">Interview type</option>
          <option value="Technical">Technical</option>
          <option value="HR Round">HR Round</option>
          <option value="Aptitude">Aptitude</option>
        </select>

        <button className="neon-btn" onClick={handleNext}>
          Continue
        </button>
      </NeonCard>
    </div>
  );
}
