import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HRRoleSetup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [extraQuestions, setExtraQuestions] = useState([""]);

  const addQuestion = () => {
    setExtraQuestions([...extraQuestions, ""]);
  };

  const updateQuestion = (i, value) => {
    const copy = [...extraQuestions];
    copy[i] = value;
    setExtraQuestions(copy);
  };

  const handleStart = () => {
    navigate("/interview", {
      state: { role, type, extraQuestions },
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#0d0d0d]/70 border border-purple-500/50 rounded-xl p-8 w-full max-w-xl
                      backdrop-blur-xl shadow-[0_0_20px_purple] animate-fadeIn">

        <h1 className="text-3xl font-bold text-purple-400 text-center mb-6 neonText">
          HR – Interview Setup
        </h1>

        {/* Role */}
        <label className="text-white mb-1 block">Role for Interview</label>
        <input
          className="w-full p-3 bg-black/70 border border-purple-400 rounded-lg text-white neonBorder"
          placeholder="e.g. Full Stack Developer"
          onChange={(e) => setRole(e.target.value)}
        />

        {/* Type */}
        <label className="text-white mt-4 mb-1 block">Interview Type</label>
        <select
          className="w-full p-3 bg-black/70 border border-purple-400 rounded-lg text-white neonBorder"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">-- Choose Type --</option>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
          <option value="Mixed">Mixed</option>
        </select>

        {/* Extra Questions */}
        <h3 className="text-purple-300 mt-5 mb-2 font-semibold">Add Extra Questions</h3>
        {extraQuestions.map((q, i) => (
          <input
            key={i}
            className="w-full p-2 mb-2 bg-black/70 border border-purple-400 rounded-lg text-white"
            placeholder={`Question ${i + 1}`}
            onChange={(e) => updateQuestion(i, e.target.value)}
          />
        ))}

        <button
          onClick={addQuestion}
          className="w-full p-2 bg-purple-500 text-black rounded-lg mt-2 neonButton"
        >
          + Add More
        </button>

        <button
          onClick={handleStart}
          className="mt-6 w-full p-3 bg-purple-500 text-black font-bold rounded-lg hover:shadow-[0_0_20px_purple] neonButton"
        >
          Start Interview 🚀
        </button>

      </div>
    </div>
  );
}

