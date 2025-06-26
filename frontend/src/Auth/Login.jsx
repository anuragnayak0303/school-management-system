// src/pages/Login.jsx

import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import schoolIllustration from "../assets/ChatGPT Image Jun 24, 2025, 11_51_52 AM.png"; // ✅ your custom image

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);
  const roles = ["Admin", "Teacher", "Student"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v2/user/login", {
        email,
        password,
        role,
      });

      if (res?.data?.success) {
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: res?.data?.user, token: res?.data?.token })
        );
        toast.success(res?.data?.message);

        if (res?.data?.user?.role === "Admin") navigate("/school/admin/dashboard");
        else if (res?.data?.user?.role === "Teacher") navigate("/school/teacher/dashboard");
        else if (res?.data?.user?.role === "Student") navigate("/school/student/dashboard");

        window.location.reload();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen  w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 px-4 py-5">
      <Toaster />

      <div className="w-full rounded-md flex  ">
        {/* Left Side: Image */}
        <div className="hidden lg:block w-full md:w-1/2 h-[300px] rounded-md md:h-auto">
          <img
            src={schoolIllustration}
            alt="School with students"
            className="w-full h-full object-cover rounded-s-md animate-fade-in"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 lg:rounded-e-md bg-white/70 backdrop-blur-xl flex flex-col justify-center p-10 md:p-16 shadow-xl">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Welcome Back 👋</h2>
          <p className="text-gray-600 mb-6">Login to access your school dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@mail.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-inner outline-0 focus:ring-2 focus:ring-blue-400 transition"
                />
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl shadow-inner outline-0 focus:ring-2 focus:ring-purple-400 transition"
                />
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Role</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <label
                    key={r}
                    className={`flex justify-center items-center px-3 py-2 border rounded-xl text-sm cursor-pointer transition font-medium ${role === r
                        ? "bg-purple-200 border-purple-500 text-purple-800"
                        : "border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={() => setRole(r)}
                      className="hidden"
                    />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline font-medium">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}
