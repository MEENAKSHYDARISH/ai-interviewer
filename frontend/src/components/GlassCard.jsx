// src/components/GlassCard.jsx
import React from "react";

export default function GlassCard({ title, children, style }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        padding: "20px",
        borderRadius: "12px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        marginBottom: "20px",
        ...style,
      }}
    >
      {title ? <h2 style={{ marginTop: 0 }}>{title}</h2> : null}
      {children}
    </div>
  );
}
