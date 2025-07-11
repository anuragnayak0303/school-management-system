import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/auth";
import axios from "axios";

export default function MainHeader() {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});

  // Fetch logged-in user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "https://school-management-system-1-jprf.onrender.com/api/v2/user/getsingle",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (auth?.token) {
      fetchUser();
    }
  }, [auth]);

  // Multi-tab logout listener
  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        localStorage.removeItem("auth");
        setAuth({ user: null, token: "" });
        window.location.href = "/";
      }
    };

    window.addEventListener("storage", syncLogout);
    return () => window.removeEventListener("storage", syncLogout);
  }, []);

  // Logout handler
  const handleLogout = () => {
    if (confirm("Are You Want To Logout")) {
      localStorage.removeItem("auth");
      localStorage.setItem("logout", Date.now()); // 🔁 Sync logout
      setAuth({ user: null, token: "" });
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* Info Banner */}
      <div className="bg-blue-950 hidden text-white p-3 lg:flex justify-between items-center text-sm">
        <span>
          Every role has different sets of features. Login as another role and check them.
        </span>
      </div>

      {/* Main Header */}
      <div className="bg-white p-3 h-[10vh] sticky top-0 flex justify-end items-center text-sm shadow z-40">
        <ul className="flex justify-end space-x-6 items-center w-full lg:w-2/4">
          <li>
            <IoMdNotificationsOutline className="text-2xl" />
          </li>
          <li>
            <IoSunnyOutline className="text-2xl" />
          </li>
          <li className="w-8 h-8 rounded-full bg-sky-100 flex justify-center items-center text-blue-700 font-semibold uppercase">
            {user?.profileImage ? (
              <img
                src={`https://school-management-system-1-jprf.onrender.com/${user.profileImage}`}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : user?.name ? (
              user.name.charAt(0)
            ) : (
              "U"
            )}
          </li>
          <li>
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-red-500 hover:text-red-700"
            >
              <FiLogOut className="text-xl" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
