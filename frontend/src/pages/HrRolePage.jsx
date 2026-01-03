import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeonCard from "../components/NeonCard";

export default function HrRolePage() {
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([""]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const updateQuestion = (index, value) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleNext = () => {
    navigate("/start-interview", {
      state: {
        userType: "hr",
        role,
        type,
        customQuestions: questions
      }
    });
  };

  return (
    <div className="page-center">
      <NeonCard>
        <h2>HR – Create Interview</h2>

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="">Choose job role</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Marketing Manager">Marketing Manager</option>
        </select>

        <select onChange={(e) => setType(e.target.value)}>
          <option value="">Interview type</option>
          <option value="Technical">Technical</option>
          <option value="HR Round">HR Round</option>
          <option value="Behavioural">Behavioural</option>
        </select>

        <h3 style={{ marginTop: "1rem" }}>Custom Questions</h3>

        {questions.map((q, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Question ${i + 1}`}
            value={q}
            onChange={(e) => updateQuestion(i, e.target.value)}
            className="custom-input"
          />
        ))}

        <button className="neon-btn" onClick={addQuestion}>
          + Add Question
        </button>

        <button className="neon-btn" onClick={handleNext}>
          Continue
        </button>
      </NeonCard>
    </div>
  );
}
