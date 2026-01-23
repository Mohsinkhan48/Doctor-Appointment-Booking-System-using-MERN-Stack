import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  // ✅ TOGGLE HANDLER
  const handleSpecialityClick = (item) => {
    if (speciality === item) {
      navigate("/doctors"); // reset filter
    } else {
      navigate(`/doctors/${item}`);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 mt-10">

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Find Your Doctor
      </h2>
      <p className="text-gray-600 mb-6">
        Choose a speciality to filter doctors
      </p>

      {/* 🔥 Speciality Dashboard Buttons */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
        {specialities.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSpecialityClick(item)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap
              border transition-all duration-300
              ${
                speciality === item
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm
            hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover
                group-hover:scale-105 transition-transform duration-500"
              />

              {/* Availability */}
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Available
              </div>
            </div>

            {/* Info */}
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filterDoc.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No doctors found for this speciality
        </p>
      )}
    </section>
  );
};

export default Doctors;
