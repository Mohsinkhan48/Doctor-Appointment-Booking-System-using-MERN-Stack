import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        // ✅ FIXED
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("Account created successfully");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("Login successful");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 to-blue-50 mt-10">
      {/* Left Illustration */}
      <div className="md:w-1/2 flex items-center justify-center relative overflow-hidden">
        <img
          src={assets.login_illustration}
          alt="Login Illustration"
          className="w-full max-w-lg animate-fadeInLeft"
        />
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 rounded-full opacity-40 animate-pulse"></div>
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 animate-fadeInRight border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </h2>
            <p className="mt-2 text-gray-600">
              Please {state === "Sign Up" ? "sign up" : "log in"} to book your
              appointment
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            {state === "Sign Up" && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full Name"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </form>

          <div className="mt-5 text-center text-gray-600">
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-blue-600 cursor-pointer hover:underline"
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
