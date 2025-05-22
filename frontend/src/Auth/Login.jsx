import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import login_img from '../assets/login.png'
export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const roles = ["Admin", "Teacher", "Student", "Staff"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v2/emp/login", {
        email,
        password,
        role, // Pass role in the request
      });

      if (res?.data?.success) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: res?.data?.user,
            token: res?.data?.token,
          })
        );

        toast.success(res?.data?.message);

        // Redirect based on role
        if (res?.data?.user?.role === "Admin") {
          navigate("/school/admin/dashboard");
        } else {
          navigate("/employee/dashboard");
        }

        window.location.reload();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
        {/* Left image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src='https://media.istockphoto.com/id/1011441292/photo/login-written-on-an-old-typewriter.jpg?s=1024x1024&w=is&k=20&c=R-EECNShcfjAJofLxggBjgY9X1sf1AF2QTGI0ctqu3w='
            alt="Login"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@mail.com"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2 px-4 py-2 border rounded cursor-pointer transition ${role === r
                        ? "bg-blue-100 border-blue-500"
                        : "border-gray-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={() => setRole(r)}
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-700">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
