import { BrowserRouter, Routes, Route } from "react-router-dom";

// ⬅️ Pages (make sure these files exist)
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import HRLogin from "./pages/HRLogin";

import StudentRoleSelect from "./pages/StudentRoleSelect";
import StudentInterviewType from "./pages/StudentInterviewType";

import HRRoleSelect from "./pages/HRRoleSelect";
import HRInterviewConfig from "./pages/HRInterviewConfig";

import VideoInterviewer from "./pages/VideoInterviewer";
import ReportView from "./pages/ReportView";

import HRDashboard from "./pages/HRDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔹 Step 1 — Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 🔹 Step 2 — Student & HR Login */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/hr-login" element={<HRLogin />} />

        {/* 🔹 Step 3 — Student Flow */}
        <Route path="/student/role" element={<StudentRoleSelect />} />
        <Route path="/student/interview-type" element={<StudentInterviewType />} />

        {/* 🔹 Step 4 — HR Flow */}
        <Route path="/hr/role" element={<HRRoleSelect />} />
        <Route path="/hr/interview-config" element={<HRInterviewConfig />} />

        {/* 🔹 Step 5 — AI Interviewer */}
        <Route path="/interview" element={<VideoInterviewer />} />

        {/* 🔹 Step 6 — Student Report */}
        <Route path="/report/:sessionId" element={<ReportView />} />

        {/* 🔹 Step 7 — HR Dashboard with filters */}
        <Route path="/hr/dashboard" element={<HRDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
