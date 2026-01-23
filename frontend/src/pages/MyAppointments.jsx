import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>

      <div className="space-y-5">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 rounded-xl object-cover border"
              />

              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  {item.speciality}
                </p>

                <div className="text-sm text-gray-600 mt-2">
                  <p className="font-medium text-gray-700">Address</p>
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium text-gray-700">
                    Date & Time:
                  </span>{" "}
                  22 Jan, 2024 | 11:52 AM
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                  Pay Online
                </button>
                <button className="px-5 py-2 rounded-lg border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50 transition">
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
