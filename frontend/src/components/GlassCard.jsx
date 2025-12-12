import React from "react";
import logo from "../assets/logo.png"; // <-- your logo

function GlassCard({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      
      {/* Logo at top */}
      <div className="w-full flex justify-center mt-6 mb-4">
        <img
          src={logo}
          alt="Logo"
          className="h-16 object-contain drop-shadow-lg"
        />
      </div>

      {/* Glass Effect Card */}
      <div className="backdrop-blur-xl bg-white/40 shadow-xl rounded-2xl p-8 w-[90%] max-w-3xl border border-white/30">
        {children}
      </div>
    </div>
  );
}

export default GlassCard;

