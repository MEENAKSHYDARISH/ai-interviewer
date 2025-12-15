import "./neon.css";

export default function NeonButton({ text, onClick }) {
  return (
    <button className="neon-button" onClick={onClick}>
      {text}
    </button>
  );
}


