import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return dateArray[0] + "" + months[Number(dateArray[1])] + "" + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/list-appointments`,
        {
          headers: { token },
        },
      );
      if (data.success) {
        setAppointments(data.appointments || []);
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { token },
        },
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>

      <div className="space-y-5">
        {appointments.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-28 h-28 rounded-xl object-cover border"
              />

              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.docData.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  {item.docData.speciality}
                </p>

                <div className="text-sm text-gray-600 mt-2">
                  <p className="font-medium text-gray-700">Address</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium text-gray-700">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                {}{" "}
                {!item.cancelled && (
                  <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="px-5 py-2 rounded-lg border border-red-500 text-red-500 text-sm font-medium hover:bg-red-50 transition"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <p className="text-sm text-red-500 font-medium">
                    Appointment Cancelled
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
