import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// STUDENT / HR INTERVIEW ROUTE
app.post("/api/interview/submit", (req, res) => {
  const { role, type, answers } = req.body;

  // Mock AI evaluation
  res.json({
    score: 8,
    feedback: `Good performance for ${role} (${type})`,
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
