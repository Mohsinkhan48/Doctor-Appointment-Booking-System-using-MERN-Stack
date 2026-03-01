import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Doctors", path: "/doctors" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const logoutHandler = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item, index) => (
            <li key={index} className="relative whitespace-nowrap">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group text-sm font-medium transition-colors duration-300
                  ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`
                }
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 h-[2px] bg-blue-600 w-0 group-hover:w-full transition-all duration-300" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center relative">
          {token && userData ? (
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              {/* Profile avatar and dropdown icon */}
              <img
                src={userData.image}
                alt="Profile"
                className="h-8 w-8 rounded-full border border-gray-300"
              />
              <img
                src={assets.dropdown_icon}
                alt="Dropdown"
                className={`h-4 w-4 transition-transform ${
                  profileOpen ? "rotate-180" : "rotate-0"
                }`}
              />

              {/* Dropdown menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-40 w-48 bg-white shadow-lg rounded-md border border-gray-200 py-2 z-50">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logoutHandler}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
          {navLinks.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block text-sm font-medium transition-colors duration-300
                  ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li>
            {token ? (
              <div className="space-y-2">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Logout
                </p>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Create Account
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
