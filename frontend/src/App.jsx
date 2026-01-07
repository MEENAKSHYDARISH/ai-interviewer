import { BrowserRouter, Routes, Route } from "react-router-dom";

// layout
//import Header from "./components/Header";

// interview
import VideoInterviewer from "./interview/VideoInterviewer";
import AvatarInterviewer from "./interview/AvatarInterviewer";
import ReportView from "./interview/ReportView";

// student
import StudentRoleSelect from "./pages/student/StudentRoleSelect";
import StudentRolePage from "./pages/StudentRolePage";
import InterviewStartPage from "./pages/InterviewStartPage";
import StudentReport from "./pages/student/StudentReport";

// hr
import HRRoleSetup from "./pages/hr/HRRoleSetup";
import HrRolePage from "./pages/HrRolePage";
import HRDashboard from "./pages/hr/HRDashboard";

function App() {
  return (
    <BrowserRouter>
      {/* <Header />*/}                 

      <div style={{ marginTop: "80px" }}>
        <Routes>
          {/* default */}
          <Route path="/" element={<VideoInterviewer />} />

          {/* interview */}
          <Route path="/interview" element={<VideoInterviewer />} />
          <Route path="/avatar" element={<AvatarInterviewer />} />
          <Route path="/start-interview" element={<InterviewStartPage />} />

          {/* reports */}
          <Route path="/report/:sessionId" element={<ReportView />} />
          <Route path="/student/report/:id" element={<StudentReport />} />

          {/* student */}
          <Route path="/student/select" element={<StudentRoleSelect />} />
          <Route path="/student-role" element={<StudentRolePage />} />

          {/* hr */}
          <Route path="/hr/setup" element={<HRRoleSetup />} />
          <Route path="/hr-role" element={<HrRolePage />} />
          <Route path="/hr/dashboard" element={<HRDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

