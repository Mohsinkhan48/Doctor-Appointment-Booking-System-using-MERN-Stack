import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import { doctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorProfile from "./pages/doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dtoken } = useContext(doctorContext);

  return aToken || dtoken ? (
    <>
      <ToastContainer />
      <Navbar />

      <div className="flex">
        <Sidebar />

        {/* ✅ MAIN CONTENT AREA */}
        <div className="flex-1 p-6 lg:ml-64 min-h-screen bg-gray-50">
          <Routes>
            {/* Admin Route  */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />

            {/* Doctor Route  */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
          </Routes>
        </div>
      </div>
    </>
  ) : (
    <Login />
  );
};

export default App;
