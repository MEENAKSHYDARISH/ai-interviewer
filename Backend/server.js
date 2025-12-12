import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Basic Endpoint to Check Server
app.get("/", (req, res) => {
  res.send("AI Interviewer Backend Running...");
});

// Interview Question Endpoint
app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [
        { role: "system", content: "You are an AI interviewer." },
        { role: "user", content: question }
      ]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
