import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import GlassCard from "../components/GlassCard";

export default function ReportView() {
  const { sessionId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadReport() {
      try {
        const res = await api.get(`/realtime/${sessionId}/report`);
        if (!cancelled) {
          setReport(res.data);
        }
      } catch (err) {
        console.error("Failed to load report", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReport();
    const interval = setInterval(loadReport, 4000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [sessionId]);

  return (
    <div className="container mx-auto p-6">
      <GlassCard title={`Interview Report — ${sessionId}`}>
        {loading && !report && (
          <p className="text-gray-400">Processing interview report…</p>
        )}

        {!report ? (
          <p className="text-gray-400">Report not available yet.</p>
        ) : (
          <>
            <h3 className="text-xl font-bold mt-4">AI Analysis</h3>
            <pre className="mt-2 text-sm bg-black/40 p-3 rounded">
              {JSON.stringify(report.analysis, null, 2)}
            </pre>

            <h3 className="text-xl font-bold mt-4">Transcript</h3>
            <pre className="mt-2 text-sm bg-black/40 p-3 rounded whitespace-pre-wrap">
              {report.transcript}
            </pre>

            <h3 className="text-xl font-bold mt-4">Video Metrics</h3>
            <pre className="mt-2 text-sm bg-black/40 p-3 rounded">
              {JSON.stringify(report.video_metrics, null, 2)}
            </pre>
          </>
        )}
      </GlassCard>
    </div>
  );
}
