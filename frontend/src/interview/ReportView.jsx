// src/interview/ReportView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlassCard from "../components/GlassCard";
import api from "../api";

export default function ReportView() {
  const { sessionId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const r = await api.get(`/realtime/${sessionId}/report`);
        if (!cancelled) {
          setReport(r.data);
        }
      } catch (e) {
        console.warn("report fetch", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    // poll until ready
    const poll = setInterval(load, 4000);
    return () => {
      cancelled = true;
      clearInterval(poll);
    };
  }, [sessionId]);

  return (
    <div className="container">
      <div className="col">
        <GlassCard title={`Report — ${sessionId}`}>
          {loading && !report ? <div className="hint">Loading report — processing may take a minute...</div> : null}
          {!report ? (
            <div className="hint">Report not available yet.</div>
          ) : (
            <>
              <h3>Scores</h3>
              <pre>{JSON.stringify(report.analysis, null, 2)}</pre>
              <h3>Transcript</h3>
              <pre style={{ whiteSpace: "pre-wrap" }}>{report.transcript}</pre>
              <h3>Video Metrics (aggregated)</h3>
              <pre>{JSON.stringify(report.video_metrics, null, 2)}</pre>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
