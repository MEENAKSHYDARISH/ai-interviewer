/*import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoInterviewer from "./interview/VideoInterviewer";
import ReportView from "./interview/ReportView";
import AvatarInterviewer from "./interview/AvatarInterviewer";
import StudentRoleSelect from "./pages/student/StudentRoleSelect";
import HRRoleSetup from "./pages/hr/HRRoleSetup";
import StudentRolePage from "./pages/StudentRolePage";
import HrRolePage from "./pages/HrRolePage";
import InterviewStartPage from "./pages/InterviewStartPage";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<VideoInterviewer />} />
          <Route path="/interview" element={<VideoInterviewer />} />
          <Route path="/report/:sessionId" element={<ReportView />} />
          <Route path="/avatar" element={<AvatarInterviewer />} />
          <Route path="/student/select" element={<StudentRoleSelect />} />
          <Route path="/hr/setup" element={<HRRoleSetup />} />
          <Route path="/student-role" element={<StudentRolePage />} />
          <Route path="/hr-role" element={<HrRolePage />} />
          <Route path="/start-interview" element={<InterviewStartPage />} />
          <Route path="/report/:id" element={<StudentReport />} />
          <Route path="/hr/dashboard" element={<HRDashboard />} />



        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App; */
export default function App() {
  return (
    <div style={{ color: "white", padding: "40px", fontSize: "32px" }}>
      ✅ React is rendering
    </div>
  );
}

