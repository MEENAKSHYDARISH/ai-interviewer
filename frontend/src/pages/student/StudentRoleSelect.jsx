import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./studentRoleSelect.css";


export default function StudentRoleSelect() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "AI Engineer",
    "UI/UX Designer",
    "DevOps Engineer",
  ]);

  const [newRole, setNewRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [type, setType] = useState("");

  const addRole = () => {
    if (!newRole.trim()) return;

    if (!roles.includes(newRole)) {
      setRoles([...roles, newRole]);
    }
    setNewRole("");
  };

  const handleStart = () => {
    if (!selectedRole || !type) {
      alert("Please select role and interview type!");
      return;
    }

    navigate(`/interview?role=${selectedRole}&type=${type}`);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#0d0d0d]/70 border border-cyan-500/50 rounded-xl p-8 w-full max-w-lg
                      backdrop-blur-xl shadow-[0_0_20px_cyan]">

        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          Student – Interview Setup
        </h1>

        {/* Role Select */}
        <label className="text-white mb-1 block">Select Your Role</label>
        <select
          className="w-full p-3 bg-black/70 border border-cyan-400 rounded-lg text-white"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">-- Choose a Role --</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>

        {/* Add Custom Role */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Add custom role..."
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="flex-1 p-3 bg-black/70 border border-cyan-400 rounded-lg text-white"
          />
          <button
            onClick={addRole}
            className="px-4 bg-cyan-500 text-black font-bold rounded-lg hover:shadow-[0_0_15px_cyan]"
          >
            +
          </button>
        </div>

        {/* Interview Type */}
        <label className="text-white mt-4 mb-1 block">Interview Type</label>
        <select
          className="w-full p-3 bg-black/70 border border-cyan-400 rounded-lg text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">-- Choose Type --</option>
          <option value="Technical Round">Technical Round</option>
          <option value="HR Round">HR Round</option>
          <option value="Behavioral Round">Behavioral Round</option>
          <option value="Mixed">Mixed</option>
        </select>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="mt-6 w-full p-3 bg-cyan-500 text-black font-bold rounded-lg
                     hover:shadow-[0_0_25px_cyan] transition"
        >
          Start AI Interview 🚀
        </button>
      </div>
    </div>
  );
}
