import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  // Days starting from Monday
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const [docInfo, setDocInfo] = useState(null);
  const [doctslots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Generate available slots
  const getAvailableSlots = () => {
    let allSlots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(10, today.getHours() + 1));
        currentDate.setMinutes(0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  // Load doctor info
  useEffect(() => {
    if (doctors.length > 0) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc);
    }
  }, [doctors, docId]);

  // Load slots when doctor info is ready
  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <section className="max-w-6xl mx-auto px-4 py-10 mt-10 space-y-10">
        {/* Doctor Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8 animate-fadeIn">
          {/* Image */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-64 h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="md:w-2/3 space-y-5">
            {/* Name & Verified */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {docInfo.name}
              </h2>
              <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
            </div>

            {/* Degree & Speciality */}
            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <p className="text-sm md:text-base">
                {docInfo.degree} • {docInfo.speciality}
              </p>
              <span className="px-4 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {docInfo.experience}
              </span>
            </div>

            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="font-medium text-gray-900">About</p>
                <img src={assets.info_icon} alt="info" className="w-4 h-4" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{docInfo.about}</p>
            </div>

            {/* Fee */}
            <p className="text-gray-800 font-medium">
              Appointment fee:{" "}
              <span className="text-blue-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Days Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Select Day</h3>
          <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {doctslots.length>0 &&
              doctslots.map((daySlots, index) => {
                   if (!daySlots[0]) return null;
                const dayIndex = (daySlots[0].datetime.getDay() + 6) % 7; // Monday=0
                return (
                  <div
                    key={index}
                    onClick={() => setSlotIndex(index)}
                    className={`flex flex-col items-center min-w-[80px] cursor-pointer p-3 rounded-lg transition-all ${
                      index === slotIndex
                        ? "bg-blue-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    } hover:scale-105`}
                  >
                    <span className="font-bold">{daysOfWeek[dayIndex]}</span>
                    <span>{daySlots[0].datetime.getDate()}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Select Time</h3>
          <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {doctslots.length &&
              doctslots[slotIndex].map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-4 py-2 rounded-lg border transition-all min-w-[80px] ${
                    slotTime === slot.time
                      ? "bg-blue-500 text-white border-blue-500 shadow-lg"
                      : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"
                  }`}
                >
                  {slot.time.toLowerCase()}
                </button>
              ))}
          </div>
        </div>

        {/* Book Button */}
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300 font-medium">
            Book Appointment
          </button>
        </div>

        <RelatedDoctors docId = {docId} speciality ={docInfo.speciality}/>
      </section>
    )
  );
};

export default Appointment;
