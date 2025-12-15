import { useEffect, useState } from "react";

export default function InterviewRoom() {
  const [question, setQuestion] = useState("Loading question…");

  useEffect(() => {
    fetch("http://localhost:5000/interview/start")
      .then((res) => res.json())
      .then((data) => setQuestion(data.question));
  }, []);

  return (
    <div className="interview-room">
      <h1 className="neon-title">AI Interviewer</h1>
      <p className="question">{question}</p>
      {/* Webcam + mic logic goes here */}
    </div>
  );
}
