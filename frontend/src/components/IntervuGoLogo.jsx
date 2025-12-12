import React from "react";
import "./IntervuGoLogo.css";

export default function IntervuGoLogo({ size = 64, variant = "full", animated = true }) {
  const className = `intervugo-logo ${variant} ${animated ? "animated" : ""}`;
  return (
    <div className={className} style={{ height: size }}>
      {/* Inline the SVG so it can inherit CSS easily */}
      <svg viewBox="0 0 360 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="false" role="img">
        <defs>
          <linearGradient id="gA" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#4FD1C5" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0b1220" floodOpacity="0.25" />
          </filter>
        </defs>

        <g transform="translate(18,14)">
          <g filter="url(#softShadow)">
            <path
              d="M0 10 C0 4 5 0 11 0 h44 c6 0 11 4 11 10 v20 c0 6 -5 10 -11 10 h-16 l-12 10 v-10 H11 c-6 0 -11 -4 -11 -10 z"
              fill="url(#gA)"
              opacity="0.98"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </g>

          <polygon points="36,14 54,26 36,38" fill="rgba(255,255,255,0.95)" opacity="0.95" />

          <rect x="8" y="6" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.12)" />
          <rect x="22" y="6" width="6" height="6" rx="1.5" fill="rgba(255,255,255,0.06)" />
        </g>

        <g transform="translate(110,30)">
          <text x="0" y="8" fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto" fontWeight="700" fontSize="28" fill="#ffffff">
            Intervu
          </text>

          <g transform="translate(170,-6)">
            <rect x="0" y="0" rx="12" ry="12" width="68" height="36" fill="#0f1724" opacity="0.85" />
            <text x="34" y="24" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="18" fill="url(#gA)" textAnchor="middle">
              Go
            </text>
          </g>

          <text x="0" y="36" fontSize="10" fill="rgba(255,255,255,0.72)" fontFamily="Inter, sans-serif">
            Intelligent interviews. Real insights.
          </text>
        </g>
      </svg>
    </div>
  );
}
