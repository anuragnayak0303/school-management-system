import React, { useContext, useState } from "react";
import {
  IoHomeOutline,
  IoSchoolOutline,
  IoSettings,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import {
  FaBookReader,
  FaBullhorn,
  FaRegFileAlt,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardList,
  FaUserGraduate,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingProvider ";


const StudentSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 300);
  };

  const NavItem = ({ to, icon, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 
        ${location.pathname === to
          ? "bg-indigo-100 text-indigo-700 shadow-inner"
          : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-xl border-r border-gray-200 px-4 pt-6 transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center pb-6 border-b border-gray-200 mb-4">
          <h1 className="text-xl font-bold text-indigo-700">ULATer School</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 text-sm">
          <NavItem
            to="/school/student/dashboard"
            icon={<IoHomeOutline size={18} />}
            label="Dashboard"
          />
          <NavItem
            to="/school/student/attendance"
            icon={<FaBookReader size={18} />}
            label="Attendance"
          />
          {/* <NavItem
            to="/school/teacher/Syllabus"
            icon={<IoSchoolOutline size={18} />}
            label="Syllabus"
          /> */}
          {/* <NavItem
            to="/school/teacher/all_attendance"
            icon={<FaClipboardList size={18} />}
            label="All Attendance"
          /> */}
          {/* <NavItem
            to="/school/teacher/students"
            icon={<FaUsers size={18} />}
            label="All Students"
          /> */}
          <NavItem
            to="/school/student/assignments"
            icon={<FaRegFileAlt size={18} />}
            label="Assignments"
          />
          {/* <NavItem
            to="/school/teacher/grades"
            icon={<FaUserGraduate size={18} />}
            label="Gradebook"
          /> */}
          <NavItem
            to="/school/student/notice-board"
            icon={<FaBullhorn size={18} />}
            label="Notice Board"
          />
          <NavItem
            to="/school/student/leave-request"
            icon={<FaRegFileAlt size={18} />}
            label="Leave Application"
          />
          <NavItem
            to="/school/student/details"
            icon={<FaChalkboardTeacher size={18} />}
            label="Student Details"
          />
          <NavItem
            to="/school/student/setting"
            icon={<IoSettings size={18} />}
            label="Settings"
          />
        </nav>
      </aside>
    </>
  );
};

export default StudentSideBar;
