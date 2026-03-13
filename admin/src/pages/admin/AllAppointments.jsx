import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, getAllAppointments, appointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4 md:px-8 mt-10"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          All Appointments
        </h2>
        <p className="text-gray-500 text-sm">
          Manage and track all patient bookings
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* Header */}
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <tr>
                <th className="py-4 px-4 text-left">#</th>
                <th className="py-4 px-4 text-left">Patient</th>
                <th className="py-4 px-4 text-left">Age</th>
                <th className="py-4 px-4 text-left">Date & Time</th>
                <th className="py-4 px-4 text-left">Doctor</th>
                <th className="py-4 px-4 text-left">Fees</th>
                <th className="py-4 px-4 text-left">Status</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-gray-600 text-sm">
              {appointments.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 font-medium">{index + 1}</td>

                  {/* Patient Column (Image + Name) */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.userData?.image}
                        alt={item.userData?.name}
                        className="w-10 h-10 rounded-full object-cover border shadow-sm"
                      />
                      <span className="font-semibold text-gray-800">
                        {item.userData?.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {calculateAge(item.userData?.dob)}
                  </td>

                  <td className="py-4 px-4">
                    {slotDateFormat(item.slotDate)} <br />
                    <span className="text-xs text-gray-400">
                      {item.slotTime}
                    </span>
                  </td>

                  {/* Doctor Column (Image + Name) */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.docData?.image}
                        alt={item.docData?.name}
                        className="w-10 h-10 rounded-full object-cover border shadow-sm"
                      />
                      <span className="font-medium">{item.docData?.name}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-gray-800">
                    {currency}
                    {item.amount}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {item.cancelled ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                        Completed
                      </span>
                    ) : (
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="cancel"
                        className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                      />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllAppointments;
