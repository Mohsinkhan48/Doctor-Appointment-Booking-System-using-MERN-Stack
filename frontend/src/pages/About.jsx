import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      
      {/* About Us Header */}
      <div className="text-center animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          ABOUT <span className="text-blue-600">US</span>
        </h2>
        <p className="mt-4 text-gray-600 md:text-lg">
          We make booking doctor appointments easy, fast, and reliable.
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 animate-fadeIn">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-full max-w-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 space-y-4">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Our platform connects patients with experienced and verified doctors in just a few clicks. You can easily browse doctor profiles, check availability, and book appointments at your convenience.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            We prioritize your time and health, providing a seamless experience for scheduling consultations and receiving timely reminders. Transparency and trust are at the core of our service.
          </p>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              To make healthcare accessible and convenient for everyone by bridging the gap between patients and doctors through technology.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Header */}
      <div className="text-center animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </h2>
        <p className="mt-4 text-gray-600 md:text-lg">
          Our system is designed to provide the best booking experience for patients.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
          <p className="text-gray-700">
            Browse doctor profiles, select available time slots, and book appointments in just a few clicks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Doctors</h3>
          <p className="text-gray-700">
            All our doctors are verified professionals with detailed profiles and patient reviews for trusted care.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Convenient Scheduling</h3>
          <p className="text-gray-700">
            Choose your preferred date and time, get reminders, and avoid long waiting times at clinics.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
