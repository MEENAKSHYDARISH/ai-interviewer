import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

// Sample interview route
app.get("/api/interview/questions", (req, res) => {
  res.json({
    role: "Frontend Developer",
    type: "Technical",
    questions: [
      "Explain React hooks",
      "What is virtual DOM?",
      "Difference between var, let, const?"
    ]
  });
});

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
