import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
  return (
    <section
      className="relative mx-6 my-10 lg:mx-20 lg:my-16 rounded-2xl overflow-hidden"
      style={{
        backgroundImage: `url(${assets.background_pattern})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 p-8 lg:p-16
        bg-gradient-to-r from-blue-50/80 to-blue-200/80 backdrop-blur-md rounded-2xl">
        
        {/* Left Side */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6">
            <p className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug drop-shadow-md">
              Book Appointment
            </p>
            <p className="text-blue-700 text-xl md:text-2xl font-semibold mt-2 drop-shadow-md">
              with 100+ Trusted Doctors
            </p>
          </div>

          <button 
          onClick={()=>{
            navigate('/login');
            scroll(0,0)
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium
            hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg
            animate-bounce-slow">
            Create Account
          </button>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center">
          <img
            src={assets.appointment_img}
            alt="Appointment"
            className="w-full max-w-md lg:max-w-lg transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
