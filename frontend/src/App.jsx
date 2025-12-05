import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoInterviewer from "./interview/VideoInterviewer";
import ReportView from "./interview/ReportView";
import AvatarInterviewer from "./interview/AvatarInterviewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home page */}
        <Route path="/" element={<VideoInterviewer />} />

        {/* Interview session */}
        <Route path="/interview" element={<VideoInterviewer />} />

        {/* Report page */}
        <Route path="/report/:sessionId" element={<ReportView />} />

        {/* Avatar test page */}
        <Route path="/avatar" element={<AvatarInterviewer />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
