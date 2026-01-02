import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRoleSelect() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [type, setType] = useState("");

  const handleStart = () => {
    if (!role || !type) return alert("Please select all fields!");
    navigate(`/interview?role=${role}&type=${type}`);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#0d0d0d]/70 border border-cyan-500/50 rounded-xl p-8 w-full max-w-lg
                      backdrop-blur-xl shadow-[0_0_20px_cyan] animate-fadeIn">

        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6 neonText">
          Student – Interview Setup
        </h1>

        {/* Role Select */}
        <label className="text-white mb-1 block">Select Your Role</label>
        <select
          className="w-full p-3 bg-black/70 border border-cyan-400 rounded-lg text-white focus:shadow-[0_0_10px_cyan] neonBorder"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">-- Choose a Role --</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="AI Engineer">AI Engineer</option>
        </select>

        {/* Type Select */}
        <label className="text-white mt-4 mb-1 block">Interview Type</label>
        <select
          className="w-full p-3 bg-black/70 border border-cyan-400 rounded-lg text-white focus:shadow-[0_0_10px_cyan] neonBorder"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">-- Choose Type --</option>
          <option value="Technical Round">Technical Round</option>
          <option value="HR Round">HR Round</option>
          <option value="Behavioral Round">Behavioral Round</option>
          <option value="Mixed">Mixed</option>
        </select>

        <button
          onClick={handleStart}
          className="mt-6 w-full p-3 bg-cyan-500 text-black font-bold rounded-lg
                     hover:shadow-[0_0_20px_cyan] transition neonButton"
        >
          Start AI Interview 🚀
        </button>
      </div>
    </div>
  );
}
