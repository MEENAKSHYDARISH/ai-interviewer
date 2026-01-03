import { useLocation, useNavigate } from "react-router-dom";
import NeonCard from "../components/NeonCard";

export default function InterviewStartPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/interview", { state });
  };

  return (
    <div className="page-center">
      <NeonCard>
        <h2>Ready to Begin?</h2>

        <p><b>User Type:</b> {state.userType}</p>
        <p><b>Role:</b> {state.role}</p>
        <p><b>Interview Type:</b> {state.type}</p>

        {state.customQuestions && (
          <>
            <h4>Custom Questions:</h4>
            <ul>
              {state.customQuestions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          </>
        )}

        <button className="neon-btn" onClick={handleStart}>
          Start Interview
        </button>
      </NeonCard>
    </div>
  );
}
