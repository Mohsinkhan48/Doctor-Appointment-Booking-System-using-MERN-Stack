import React from "react";
import { assets } from "../assets/assets";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="w-full mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="space-y-4">
          <img src={assets.logo} alt="Logo" className="w-32" />
          <p className="text-gray-700 text-sm md:text-base">
            Connecting you with the best doctors to book appointments easily and hassle-free. Trusted by thousands every day.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <FaFacebookF className="text-blue-600 hover:text-blue-800 cursor-pointer transition-colors duration-300" />
            <FaTwitter className="text-blue-400 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
            <FaInstagram className="text-pink-500 hover:text-pink-700 cursor-pointer transition-colors duration-300" />
            <FaLinkedinIn className="text-blue-700 hover:text-blue-900 cursor-pointer transition-colors duration-300" />
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-lg">COMPANY</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">About</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4 text-lg">GET IN TOUCH</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">+92 303-4789426</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">kmohsinkhan482@gmail.com</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Lahore, Pakistan</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-6 py-4 text-center text-gray-600 text-sm">
        <p>Copyright &copy; {date.getFullYear()} - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
