import { useState } from "react";
import NeonButton from "../components/NeonButton";

export default function HRPanel() {
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [customQ, setCustomQ] = useState("");

  const addQuestion = async () => {
    await fetch("http://localhost:5000/hr/add-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, type, question: customQ }),
    });
    alert("Question added!");
  };

  return (
    <div className="options-container">
      <h1 className="neon-title">HR Interview Setup</h1>

      <input
        placeholder="Role"
        className="neon-input"
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        placeholder="Interview Type"
        className="neon-input"
        onChange={(e) => setType(e.target.value)}
      />

      <textarea
        placeholder="Add Custom Question"
        className="neon-textarea"
        onChange={(e) => setCustomQ(e.target.value)}
      />

      <NeonButton text="Add Question" onClick={addQuestion} />
    </div>
  );
}
