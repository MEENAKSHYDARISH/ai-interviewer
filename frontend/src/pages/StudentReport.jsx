import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function StudentReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/report/" + id)
      .then(res => setReport(res.data));
  }, []);

  if (!report) return <p>Loading...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Interview Report</h1>

      <div className="glass-card p-6">
        <p><strong>Role:</strong> {report.role}</p>
        <p><strong>Interview Type:</strong> {report.interviewType}</p>

        <h2 className="mt-4 text-xl font-bold">AI Feedback</h2>
        <p className="mt-2">{report.aiFeedback}</p>

        <h2 className="mt-4 text-xl font-bold">Score</h2>
        <p className="text-4xl">{report.score}/10</p>

        <h2 className="mt-4 text-xl font-bold">Recommendations</h2>
        <p className="mt-2">{report.recommendations}</p>
      </div>
    </div>
  );
}
