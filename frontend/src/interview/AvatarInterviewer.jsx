// src/interview/AvatarInterviewer.jsx
import React, { useState } from "react";
import api from "../api";

/**
 * AvatarInterviewer
 * - Sends question text to POST /realtime/avatar
 * - Backend should return { id: "...", video_url: "..."} or similar
 * - While waiting, we can use SpeechSynthesis fallback to speak the text
 * - When video url is returned, play it in a <video> element
 */

export default function AvatarInterviewer() {
  const [questionText, setQuestionText] = useState("Tell us about a time you solved a difficult problem.");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateAvatar() {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("question_text", questionText);
      const resp = await api.post("/realtime/avatar", form);
      // backend returns JSON with video url or id
      // adjust based on backend behavior
      if (resp.data?.result?.video_url) {
        setVideoUrl(resp.data.result.video_url);
      } else if (resp.data?.id && resp.data?.video_url) {
        setVideoUrl(resp.data.video_url);
      } else if (resp.data?.url) {
        setVideoUrl(resp.data.url);
      } else if (resp.data?.error) {
        alert("Avatar error: " + resp.data.error);
      } else {
        // fallback: speak using TTS
        speakText(questionText);
      }
    } catch (err) {
      console.error("avatar error", err);
      speakText(questionText); // fallback
    } finally {
      setLoading(false);
    }
  }

  function speakText(text) {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={questionText} onChange={(e) => setQuestionText(e.target.value)} style={{ flex: 1 }} />
        <button className="btn primary" onClick={generateAvatar} disabled={loading}>
          {loading ? "Generating..." : "Generate Avatar Question"}
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        {videoUrl ? (
          <video src={videoUrl} controls autoPlay style={{ width: "100%", borderRadius: 12 }} />
        ) : (
          <div className="hint">No avatar video yet — use the button above. If D-ID is not configured on the backend, TTS will play as fallback.</div>
        )}
      </div>
    </div>
  );
}
