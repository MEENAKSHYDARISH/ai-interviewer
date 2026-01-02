import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HRDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/report/all")
      .then(res => setReports(res.data));
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">HR - Student Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map(r => (
          <div key={r._id} className="glass-card p-6">
            <p><strong>Student:</strong> {r.studentName}</p>
            <p><strong>Role:</strong> {r.role}</p>
            <p><strong>Score:</strong> {r.score}/10</p>

            <Link 
              to={`/report/${r._id}`}
              className="mt-4 inline-block px-4 py-2 bg-blue-600 rounded-lg neon-hover"
            >
              View Full Report
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
