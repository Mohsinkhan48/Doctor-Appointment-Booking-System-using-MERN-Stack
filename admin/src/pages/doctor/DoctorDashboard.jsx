import React from "react";
import { useContext } from "react";
import { doctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    getDashData,
    dashData,
    setDashData,
    dtoken,
    cancelAppointment,
    completeAppointment,
  } = useContext(doctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);
  useEffect(() => {
    if (dtoken) {
      getDashData();
    }
  }, [dtoken]);

  return (
    dashData && (
      <div className="min-h-screen bg-gray-50 p-6 md:p-10 mt-10">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Doctor Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Doctors */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="bg-blue-100 p-4 rounded-full">
              <img className="w-8" src={assets.earning_icon} alt="" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">
                {" "}
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-500 text-sm">Total Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="bg-green-100 p-4 rounded-full">
              <img className="w-8" src={assets.appointments_icon} alt="" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm">Total Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="bg-purple-100 p-4 rounded-full">
              <img className="w-8" src={assets.patients_icon} alt="" />
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Total Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl shadow-md">
          {/* Header */}
          <div className="flex items-center gap-3 border-b px-6 py-4">
            <img className="w-6" src={assets.list_icon} alt="" />
            <p className="font-semibold text-gray-700 text-lg">
              Latest Bookings
            </p>
          </div>

          {/* Appointment List */}
          <div className="divide-y">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                {/* Left Side */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border"
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.userData.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div>
                  {item.cancelled ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                      >
                        <img src={assets.cancel_icon} alt="" className="w-4" />
                      </button>

                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition"
                      >
                        <img src={assets.tick_icon} alt="" className="w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
