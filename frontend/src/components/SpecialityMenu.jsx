import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="w-full py-14 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Find by <span className="text-blue-600">Speciality</span>
          </h1>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Browse through our extensive list of trusted doctors and schedule
            your appointment hassle-free.
          </p>
        </div>

        {/* Speciality Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {specialityData.map((item, index) => (
            <Link
            onClick={()=> scrollTo(0,0)}
              key={index}
              to={`/doctors/${item.speciality}`}
              className="group bg-white border rounded-2xl p-5 flex flex-col items-center
              hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div
                className="w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full
                group-hover:bg-blue-100 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <p className="mt-4 text-sm md:text-base font-medium text-gray-800 group-hover:text-blue-600">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
