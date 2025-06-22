import React, { useContext, useEffect, useState } from "react";
import {
  IoHomeOutline,
  IoSchoolOutline,
  IoSettings,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  FaBookReader,
  FaClipboardList,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBullhorn,
  FaRegFileAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingProvider ";

const TeacherSidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    academic: false,
    student: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 700);
  };

  const NavItem = ({ to, icon, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`flex items-center gap-3 px-5 py-3 rounded-lg w-full transition-colors duration-200 text-sm font-medium
        ${location.pathname === to ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"}`}
    >
      {icon} {label}
    </button>
  );

  const SubItem = ({ to, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`block w-full text-left pl-12 py-2 text-sm rounded-md transition-colors duration-200
        ${location.pathname === to ? "bg-orange-100 text-orange-600" : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"}`}
    >
      {label}
    </button>
  );

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoClose size={22} /> : <IoMenu size={22} />}
      </button>

      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          fixed top-0 left-0 z-40 w-64 h-screen bg-gradient-to-b from-white via-blue-50 to-white
          shadow-sm border-r border-gray-200 px-3 overflow-y-auto transition-transform duration-300`}
      >
        <div className="flex items-center justify-center py-6 text-xl font-bold text-blue-700 border-b border-gray-200">
          ULATer School
        </div>

        <nav className="py-6 space-y-3">
          <div className="text-xs uppercase text-gray-400 px-4">Main</div>
          <NavItem
            to="/school/teacher/dashboard"
            icon={<IoHomeOutline size={18} />}
            label="Dashboard"
          />

          <NavItem
            to="/school/teacher/student_attendance"
            icon={<FaBookReader size={18} />}
            label="Student Attendance"
          />

          <div className="text-xs uppercase text-gray-400 px-4 pt-4">Academic</div>
          <button
            onClick={() => toggleMenu("academic")}
            className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <IoSchoolOutline size={18} /> Academic
            </div>
            {openMenus.academic ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {openMenus.academic && (
            <div className="ml-2">
              <SubItem to="/school/teacher/Syllabus" label="Syllabus" />
              <SubItem to="/school/teacher/all_attendance" label="All Attendance" />
            </div>
          )}

          <div className="text-xs uppercase text-gray-400 px-4 pt-4">Students</div>
          <button
            onClick={() => toggleMenu("student")}
            className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <FaUsers size={18} /> Student Management
            </div>
            {openMenus.student ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {openMenus.student && (
            <div className="ml-2">
              <SubItem to="/school/teacher/students" label="All Students" />
              <SubItem to="/school/teacher/assignments" label="Assignments" />
              {/* <SubItem to="/school/teacher/grades" label="Gradebook" /> */}
            </div>
          )}

          <div className="text-xs uppercase text-gray-400 px-4 pt-4">Others</div>
          <NavItem
            to="/school/teacher/notice-board"
            icon={<FaBullhorn size={18} />}
            label="Notice Board"
          />

          <NavItem
            to="/school/teacher/add-result"
            icon={<FaCalendarAlt size={18} />}
            label="Set Mark"
          />

          <NavItem
            to="/school/teacher/leave_application"
            icon={<FaRegFileAlt size={18} />}
            label="Leave Application"
          />

          <NavItem
            to="/school/teacher/view_details"
            icon={<FaChalkboardTeacher size={18} />}
            label="Teacher Details"
          />

          <NavItem
            to="/school/teacher/setting"
            icon={<IoSettings size={18} />}
            label="Settings"
          />
        </nav>
      </aside>
    </>
  );
};

export default TeacherSidebar;