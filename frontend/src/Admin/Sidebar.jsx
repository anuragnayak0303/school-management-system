import React, { useEffect, useState } from "react";
import {
  IoHomeOutline,
  IoSchoolOutline,
  IoPeopleCircleOutline,
  IoCalendarOutline,
  IoWalletOutline,
  IoListOutline,
  IoNewspaperOutline,
  IoSettings,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { FaClipboardList, FaUser, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
  const [academicOpen, setAcademicOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Define all sub-paths under Academic
  const academicPaths = [
    "/school/academy/course",
    "/school/academy/subject",
    "/school/academy/result-rule",
    "/school/academy/exam",
    "/school/academy/schedule",
    "/school/academy/all_classess"
  ];

  // Auto-open Academic if the current path matches
  useEffect(() => {
    if (academicPaths.includes(location.pathname)) {
      setAcademicOpen(true);
    }
  }, [location.pathname]);

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
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 fixed top-0 left-0 z-50 w-64 h-screen bg-white shadow-lg border-r px-4 border-r-gray-200 overflow-y-auto`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4">
          <span className="text-lg font-bold">Schooling</span>
        </div>

        {/* Navigation */}
        <nav className="py-4 text-sm space-y-1">
          <NavLink to="/school/admin/dashboard" className={navLinkClasses}>
            <IoHomeOutline size={20} /> Dashboard
          </NavLink>

          {/* Academic Dropdown */}
          <div>
            <button
              onClick={() => setAcademicOpen(!academicOpen)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded ${academicOpen
                ? "text-blue-700"
                : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <div className="flex items-center gap-3">
                <IoSchoolOutline size={20} /> Academic
              </div>
              {academicOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {academicOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <NavLink to="/school/academy/subject" className={subLinkClasses}>Subject</NavLink>
                {/* <NavLink to="/school/academy/result-rule" className={subLinkClasses}>Result Rule</NavLink>
                <NavLink to="/school/academy/exam" className={subLinkClasses}>Exam</NavLink>
                <NavLink to="/school/academy/schedule" className={subLinkClasses}>Class Schedule</NavLink> */}
                <NavLink to="/school/academy/all_classess" className={subLinkClasses}>All Classes</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/school/vister_admission_list" className={navLinkClasses}>
            <FaClipboardList size={20} /> Vist Admission List
          </NavLink>
          <NavLink to="/school/ert-list" className={navLinkClasses}>
            <FaUser size={20} />ERT LIst
          </NavLink>
          <NavLink to="/school/admission_from" className={navLinkClasses}>
            <FaUser size={20} />Students Admission
          </NavLink>

          <NavLink to="/school/all_student" className={navLinkClasses}>
            <FaUsers size={20} />All Students
          </NavLink>
          <NavLink to="/school/all_teacher" className={navLinkClasses}>
            <FaUsers size={20} /> All Teacher
          </NavLink>
          {/* <NavLink to="/leave-request" className={navLinkClasses}>
            <IoCalendarOutline size={20} /> Leave Request
          </NavLink>
          <NavLink to="/notice-board" className={navLinkClasses}>
            <IoNewspaperOutline size={20} /> Notice Board
          </NavLink> */}
          <NavLink to="/school/admin/setting" className={navLinkClasses}>
            <IoSettings size={20} /> Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

// Utility classes
const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded transition-all ${isActive ? "bg-gray-200 text-blue-600" : "text-gray-700 hover:bg-gray-100"
  }`;

const subLinkClasses = ({ isActive }) =>
  `block pl-3 py-2 text-sm rounded ${isActive
    ? "text-orange-600 font-medium bg-gray-200"
    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
  }`;
