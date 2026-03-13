import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { doctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dtoken } = useContext(doctorContext);
  const [isOpen, setIsOpen] = useState(false);

  // Admin Menu
  const adminMenu = [
    { name: "Dashboard", path: "/admin-dashboard", icon: assets.home_icon },
    {
      name: "Appointments",
      path: "/all-appointments",
      icon: assets.appointment_icon,
    },
    { name: "Add Doctor", path: "/add-doctor", icon: assets.add_icon },
    { name: "Doctors List", path: "/doctor-list", icon: assets.people_icon },
  ];

  // Doctor Menu
  const doctorMenu = [
    { name: "Dashboard", path: "/doctor-dashboard", icon: assets.home_icon },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: assets.appointment_icon,
    },
    { name: "Profile", path: "/doctor-profile", icon: assets.people_icon },
  ];

  const menuItems = aToken ? adminMenu : doctorMenu;

  return (
    <div className="mt-10">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 
        bg-gradient-to-r from-indigo-600 to-violet-600 
        text-white px-3 py-2 rounded-md shadow-lg"
      >
        ☰
      </button>

      {(aToken || dtoken) && (
        <aside
          className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl border-r border-gray-100
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
        >
          {/* Title */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 tracking-wide">
              {aToken ? "Admin Panel" : "Doctor Panel"}
            </h2>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
