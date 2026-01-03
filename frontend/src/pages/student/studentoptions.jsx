import NeonButton from "../../components/NeonButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentOptions() {
  const [role, setRole] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const nav = useNavigate();

  return (
    <div className="options-container">

      <h1 className="neon-title">Student Interview Setup</h1>

      <select className="neon-select" onChange={(e) => setRole(e.target.value)}>
        <option>Select Role</option>
        <option>Software Developer</option>
        <option>Data Scientist</option>
        <option>Designer</option>
        <option>Marketing</option>
      </select>

      <select className="neon-select" onChange={(e) => setInterviewType(e.target.value)}>
        <option>Select Interview Type</option>
        <option>Technical</option>
        <option>HR</option>
        <option>Managerial</option>
      </select>

      <NeonButton
        text="Start Interview"
        onClick={() => nav(`/interview?role=${role}&type=${interviewType}`)}
      />
    </div>
  );
}
