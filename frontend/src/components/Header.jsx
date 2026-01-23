import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-white mt-20 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-10">

        {/* Left Side */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Book Appointment <br />
            <span className="text-blue-600">with Trusted Doctors</span>
          </h1>

          <div className="flex items-center justify-center lg:justify-start gap-3 mt-5">
            <img
              src={assets.group_profiles}
              alt=""
              className="w-24"
            />
            <p className="text-gray-600 text-sm md:text-base max-w-md">
              Browse trusted doctors and schedule your appointment easily without any hassle.
            </p>
          </div>

          <a
            href="#speciality"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-full font-medium
            hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            Book Appointment
            <img
              src={assets.arrow_icon}
              alt=""
              className="w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.header_img}
            alt=""
            className="w-full max-w-md lg:max-w-lg transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
