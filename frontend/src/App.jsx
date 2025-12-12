import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoInterviewer from "./interview/VideoInterviewer";
import ReportView from "./interview/ReportView";
import AvatarInterviewer from "./interview/AvatarInterviewer";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>

      {/* ⭐ Add Header here so it appears on all pages */}
      <Header />

      <div style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<VideoInterviewer />} />
          <Route path="/interview" element={<VideoInterviewer />} />
          <Route path="/report/:sessionId" element={<ReportView />} />
          <Route path="/avatar" element={<AvatarInterviewer />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
