import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      
      {/* Contact Header */}
      <div className="text-center animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          CONTACT <span className="text-blue-600">US</span>
        </h2>
        <p className="mt-4 text-gray-600 md:text-lg">
          Get in touch with us or explore career opportunities.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 animate-fadeIn">
        
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full max-w-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Our Office</h3>
          <p className="text-gray-700 text-base md:text-lg">Lahore, Johar Town</p>
          <p className="text-gray-700 text-base md:text-lg">Tel: +92 303 4789426</p>

          <div className="mt-6">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Careers at Our Portal</h3>
            <p className="text-gray-700 text-base md:text-lg mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300 font-medium">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
