// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
      <Link to="/chat" style={{ marginRight: "15px" }}>Chat</Link>
      <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navbar;
