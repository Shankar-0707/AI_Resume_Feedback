// Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="bg-gray-900 text-yellow-300 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">🧠 Resume AI</h1>
      <div className="flex gap-6 items-center">
        <Link to="/home" className="hover:text-yellow-400 font-semibold">
          Home
        </Link>
        <Link to="/upload" className="hover:text-yellow-400 font-semibold">
          Upload
        </Link>
        <Link to="/history" className="hover:text-yellow-400 font-semibold">
          View History
        </Link>
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold hover:bg-yellow-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
