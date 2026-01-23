import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img
              src={assets.admin_logo}
              alt="Logo"
              className="h-10 w-10 rounded-full animate-bounce"
            />
            <p className="text-gray-800 font-semibold">
              {aToken ? "Admin" : "Doctor"}
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
            >
              Logout
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800 text-2xl focus:outline-none"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <p className="text-gray-800 font-semibold">
              {aToken ? "Admin" : "Doctor"}
            </p>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
