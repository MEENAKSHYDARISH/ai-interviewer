import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentRoleSelect.css";

export default function StudentRoleSelect() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [roles, setRoles] = useState([
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "AI Engineer",
    "UI/UX Designer",
    "Cloud Engineer",
    "Cybersecurity Analyst",
    "DevOps Engineer",
    "Software Tester",
    "Mobile App Developer",
  ]);

  const addCustomRole = () => {
    if (!customRole.trim()) return;
    setRoles([...roles, customRole.trim()]);
    setRole(customRole.trim());
    setCustomRole("");
  };

  const handleStart = () => {
    if (!role || !type) return alert("Please select all fields!");
    navigate(`/interview?role=${role}&type=${type}`);
  };

  return (
    <div className="studentRolePage">
      <div className="neonCardBox">
        <h1 className="neonTitle">Student – Interview Setup</h1>
        <p className="neonSubText">
          Choose your role and interview type to start your AI mock interview!
        </p>

        {/* Role */}
        <label className="neonLabel">Select Your Role</label>

        <select
          className="neonSelect"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">-- Choose a Role --</option>
          {roles.map((r, idx) => (
            <option key={idx} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Custom Role */}
        <div className="customRoleRow">
          <input
            className="neonInput"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            placeholder="Add custom role..."
          />
          <button className="addRoleBtn" onClick={addCustomRole}>
            +
          </button>
        </div>

        {/* Type */}
        <label className="neonLabel">Interview Type</label>

        <select
          className="neonSelect"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">-- Choose Type --</option>
          <option value="Technical Round">Technical Round</option>
          <option value="HR Round">HR Round</option>
          <option value="Behavioral Round">Behavioral Round</option>
          <option value="Mixed">Mixed</option>
        </select>

        <button className="startBtn" onClick={handleStart}>
          Start AI Interview!
        </button>
      </div>
    </div>
  );
}
