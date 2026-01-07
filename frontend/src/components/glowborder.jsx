import React from "react";
import "./neon.css";

export default function GlowBorder({ children, className = "" }) {
  return (
    <div className={`glow-border ${className}`}>
      {children}
    </div>
  );
}
