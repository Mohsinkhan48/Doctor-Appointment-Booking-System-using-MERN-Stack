import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getDoctorsData, backendUrl, token } =
    useContext(AppContext);

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [doctslots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // ✅ Generate available slots
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

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      const slotDate = day + "-" + month + "-" + year;

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const isBooked =
          docInfo?.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  }; // ✅ THIS WAS MISSING

  // ✅ Book Appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const date = doctslots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: { token },
        },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to book appointment");
    }
  };

  // Load doctor info
  useEffect(() => {
    if (doctors.length > 0) {
      const foundDoc = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoc);
    }
  }, [doctors, docId]);

  // Load slots
  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <section className="max-w-6xl mx-auto px-4 py-10 mt-10 space-y-10">
        {/* Doctor Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex justify-center">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-64 h-64 object-cover rounded-2xl shadow-md"
            />
          </div>

          <div className="md:w-2/3 space-y-5">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">{docInfo.name}</h2>
              <img
                src={assets.verified_icon}
                alt="verified"
                className="w-5 h-5"
              />
            </div>

            <p>
              {docInfo.degree} • {docInfo.speciality}
            </p>

            <p>{docInfo.about}</p>

            <p>
              Appointment fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>

        {/* Days */}
        <div>
          <h3>Select Day</h3>
          <div className="flex gap-4 overflow-x-auto">
            {doctslots.map((daySlots, index) => {
              if (!daySlots[0]) return null;
              const dayIndex = (daySlots[0].datetime.getDay() + 6) % 7;

              return (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`p-3 cursor-pointer ${
                    index === slotIndex
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <span>{daysOfWeek[dayIndex]}</span>
                  <span>{daySlots[0].datetime.getDate()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3>Select Time</h3>
          <div className="flex gap-3 overflow-x-auto">
            {doctslots.length > 0 &&
              doctslots[slotIndex]?.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-4 py-2 border ${
                    slotTime === slot.time
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {slot.time.toLowerCase()}
                </button>
              ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={bookAppointment}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            Book Appointment
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </section>
    )
  );
};

export default Appointment;
