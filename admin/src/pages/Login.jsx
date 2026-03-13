import React, { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { doctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(doctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center relative">
          {state} Login
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-full animate-pulse"></span>
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="relative">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm transition-all">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm transition-all">
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition transform hover:scale-105 motion-reduce:transform-none"
          >
            Login
          </button>
        </form>

        {/* Toggle Login Type */}
        <div className="mt-6 text-center text-gray-500">
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-500 cursor-pointer font-semibold hover:underline transition"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-500 cursor-pointer font-semibold hover:underline transition"
              >
                Click here
              </span>
            </p>
          )}
        </div>

        {/* Extra animation dots at bottom */}
        <div className="mt-4 flex justify-center space-x-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
