import { useEffect, useState } from "react";
import axios from "axios";

function HRDashboard() {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filters
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const [scoreRange, setScoreRange] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      const res = await axios.get("http://localhost:5000/api/reports");
      setReports(res.data);
      setFiltered(res.data);
    };
    fetchReports();
  }, []);

  useEffect(() => {
    let filteredList = [...reports];

    if (role) {
      filteredList = filteredList.filter(r => r.role === role);
    }

    if (type) {
      filteredList = filteredList.filter(r => r.interviewType === type);
    }

    if (scoreRange) {
      const [min, max] = scoreRange.split("-").map(Number);
      filteredList = filteredList.filter(r => r.score >= min && r.score <= max);
    }

    if (search) {
      filteredList = filteredList.filter(r =>
        r.studentName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "highest") {
      filteredList.sort((a, b) => b.score - a.score);
    }
    if (sortBy === "lowest") {
      filteredList.sort((a, b) => a.score - b.score);
    }

    setFiltered(filteredList);
  }, [role, type, scoreRange, search, sortBy]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">HR Dashboard</h1>

      {/* FILTERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0a0a0a]/60 p-4 rounded-xl border border-cyan-400/40 backdrop-blur-xl">

        <select className="p-2 rounded bg-black/40"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Data Analyst">Data Analyst</option>
        </select>

        <select className="p-2 rounded bg-black/40"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Technical">Technical</option>
          <option value="HR Round">HR Round</option>
          <option value="Aptitude">Aptitude</option>
        </select>

        <select className="p-2 rounded bg-black/40"
          value={scoreRange}
          onChange={(e) => setScoreRange(e.target.value)}
        >
          <option value="">Any Score</option>
          <option value="0-40">0–40</option>
          <option value="40-70">40–70</option>
          <option value="70-100">70–100</option>
        </select>

        <input
          type="text"
          placeholder="Search student..."
          className="p-2 rounded bg-black/40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="p-2 rounded bg-black/40 col-span-2 md:col-span-1"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="highest">Highest Score</option>
          <option value="lowest">Lowest Score</option>
        </select>

      </div>

      {/* RESULTS */}
      <div className="mt-8">
        {filtered.map((r) => (
          <div key={r._id}
            className="p-4 mb-3 bg-black/40 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition">
            <h3 className="text-xl font-semibold">{r.studentName}</h3>
            <p>Role: {r.role}</p>
            <p>Interview Type: {r.interviewType}</p>
            <p>Score: {r.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HRDashboard;

