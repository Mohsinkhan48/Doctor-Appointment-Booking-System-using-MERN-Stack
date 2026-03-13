import React, { useContext, useEffect } from "react";
import { doctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dtoken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(doctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="mt-14 p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Appointments</h1>
        <p className="text-gray-500 text-sm">
          Manage your patient appointments
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-7 bg-gray-100 text-gray-600 text-sm font-semibold px-6 py-4">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {[...appointments].reverse().map((item, index) => (
          <div
            key={item._id}
            className="grid md:grid-cols-7 grid-cols-1 gap-4 items-center px-6 py-4 border-b last:border-none hover:bg-gray-50 transition"
          >
            {/* Index */}
            <p className="text-gray-500 font-medium">{index + 1}</p>

            {/* Patient */}
            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover border"
              />
              <p className="font-medium text-gray-700">{item.userData.name}</p>
            </div>

            {/* Payment */}
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium w-fit ${
                item.payment
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {item.payment ? "Online" : "Cash"}
            </span>

            {/* Age */}
            <p className="text-gray-600">
              {calculateAge(item.userData.dob)} yrs
            </p>

            {/* Date */}
            <p className="text-gray-600">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p className="font-semibold text-indigo-600">
              {currency}
              {item.amount}
            </p>

            {/* Status / Actions */}
            <div className="flex gap-3 items-center">
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
  );
};

export default DoctorAppointments;
