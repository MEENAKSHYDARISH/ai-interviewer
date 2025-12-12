import React from "react";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <img src={logo} alt="IntervuGo Logo" className="w-48 mb-4 drop-shadow-2xl" />
      <h1 className="text-4xl font-bold text-teal-400">IntervuGo</h1>
        
      <p className="text-gray-300 mt-2">
        Your AI-powered Interview Assistant
      </p>
    </div>
  );
}

