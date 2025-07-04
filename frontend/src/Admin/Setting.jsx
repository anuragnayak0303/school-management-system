// pages/settings/Setting.jsx
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MainHeader from "../components/MainHeader";
import { useAuth } from "../context/auth";
import TeacherSidebar from "../Teacher/TeacherSideBar";
import StudentSideBar from "../Student/StudentSideBar";

const links = [
  { name: "Profile Settings", path: "profile" },
  { name: "Security Settings", path: "security" },
  { name: "Website Settings", path: "LogoEdit" },
];

export default function Setting() {
  const { auth } = useAuth();
  const location = useLocation()
  return (
    <div className="flex flex-col md:flex-row">
      {location.pathname.startsWith("/school/teacher/") ? <TeacherSidebar /> : location.pathname.startsWith("/school/student/") ? <StudentSideBar /> : <Sidebar />}
      <main className="w-full md:ml-64 min-h-screen bg-gray-100">
        <MainHeader />
        <div className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Settings Navigation */}
            <div className={`w-full  lg:w-1/4 border ${location.pathname.startsWith('/school/teacher/setting') || location.pathname.startsWith("/school/student/setting") ? "h-[20vh]" : 'h-[29vh]'} border-gray-200 rounded-lg p-4 bg-white shadow-sm`}>
              {links.map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-md text-sm font-medium ${location.pathname.startsWith('/school/teacher/setting') && path == "LogoEdit" ? "hidden" : location.pathname.startsWith('/school/student/setting') && path == "LogoEdit" ? "hidden" : ''} ${isActive
                      ? "bg-orange-50 text-orange-600 border-l-4 border-orange-500"
                      : "hover:bg-gray-50 text-gray-700"
                    }`
                  }
                >
                  {name}
                </NavLink>
              ))}
            </div>

            {/* Outlet */}
            <div className="w-full lg:w-3/4 p-4 border border-gray-300 box-border shadow bg-white rounded">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
