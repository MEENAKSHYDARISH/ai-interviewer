import React from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div style={{
      width: "100%",
      padding: "15px 25px",
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 999
    }}>
      <img 
        src={logo}
        alt="Logo"
        style={{ height: "45px" }}
      />
    </div>
  );
}

export default Header;
