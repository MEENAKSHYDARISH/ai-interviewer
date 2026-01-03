import React from "react";
import logo from "../assets/logo.png";

export default function GlassCard({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* Logo at top */}
      <div className="mt-6 mb-8">
        <img
          src={logo}
          alt="Logo"
          className="h-14 w-auto drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]"
        />
      </div>

      {/* Glass card */}
      <div className="w-[90%] max-w-4xl rounded-2xl border border-cyan-400/30 
                      bg-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.25)]
                      p-6 md:p-10 animate-fadeIn">
        {children}
      </div>
    </div>
  );
}
