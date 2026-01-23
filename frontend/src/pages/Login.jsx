import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Add your login/signup logic here
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-blue-50 mt-10">
      {/* Left Illustration */}
      <div className="md:w-1/2 flex items-center justify-center relative overflow-hidden">
        <img
          src={assets.login_illustration}
          alt="Login Illustration"
          className="w-full max-w-lg animate-fadeInLeft"
        />
        {/* Floating shapes */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 rounded-full opacity-40 animate-pulse"></div>
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 animate-fadeInRight border border-gray-200">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </h2>
            <p className="mt-2 text-gray-600">
              Please {state === "Sign Up" ? "sign up" : "log in"} to book your appointment
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Name */}
            {state === "Sign Up" && (
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Full Name"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/90 placeholder-gray-400"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/90 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-white/90 placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 text-lg"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-5 text-center text-gray-600">
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
