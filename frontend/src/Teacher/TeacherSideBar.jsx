import React, { useContext, useEffect, useState } from "react";
import {
  IoHomeOutline,
  IoSchoolOutline,
  IoSettings,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBookReader, FaClipboardList, FaUser, FaUsers } from "react-icons/fa";
import { LoadingContext } from "../context/LoadingProvider ";


const TeacherSidebar = () => {
  const [academicOpen, setAcademicOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  // All paths under Academic to auto-expand the dropdown
  const academicPaths = [
    "/school/teacher/academy/course",
    "/school/teacher/academy/subject",
    "/school/teacher/academy/result-rule",
    "/school/teacher/academy/exam",
    "/school/teacher/academy/schedule",
    "/school/teacher/academy/all_classess",
  ];

  useEffect(() => {
    if (academicPaths.includes(location.pathname)) {
      setAcademicOpen(true);
    }
  }, [location.pathname]);

  // Navigation handler with loading animation for /school/teacher/ routes
  const handleNavigation = (path) => {
    if (path.startsWith("/school/teacher/")) {
      setLoading(true);
      setTimeout(() => {
        navigate(path);
        setLoading(false);
      },2000); // Simulate 700ms loading
    } else {
      navigate(path);
    }
  };

  // Top-level navigation item
  const NavItem = ({ to, icon, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded transition-all ${
        location.pathname === to
          ? "bg-gray-200 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon} {label}
    </button>
  );

  // Sub-item for dropdown
  const SubItem = ({ to, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`block w-full text-left pl-3 py-2 text-sm rounded ${
        location.pathname === to
          ? "text-orange-600 font-medium bg-gray-200"
          : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg border-r px-4 border-r-gray-200 overflow-y-auto`}
      >
        <div className="flex items-center gap-3 p-4">
          <span className="text-lg font-bold">Schooling</span>
        </div>

        <nav className="py-4 text-sm space-y-1">
          <NavItem
            to="/school/teacher/dashboard"
            icon={<IoHomeOutline size={20} />}
            label="Dashboard"
          />
          <NavItem
            to="/school/teacher/student_attendance"
            icon={<FaBookReader size={20} />}
            label="Student Attendash"
          />
          <NavItem
            to="/school/teacher/view_details"
            icon={<IoHomeOutline size={20} />}
            label="Teacher Details"
          />
          <NavItem
            to="/school/teacher/setting"
            icon={<IoSettings size={20} />}
            label="Settings"
          />
        </nav>
      </aside>
    </>
  );
};

export default TeacherSidebar;
