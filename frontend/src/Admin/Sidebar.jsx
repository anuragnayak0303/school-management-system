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
  FaClipboardList,
  FaUser,
  FaUserPlus,
  FaUserFriends,
  FaUserGraduate,
  FaUsers,
  FaFile,
  FaLevelDownAlt,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingProvider ";

const Sidebar = () => {
  const [academicOpen, setAcademicOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  const academicPaths = [
    "/school/admin/academy/course",
    "/school/admin/academy/subject",
    "/school/admin/academy/result-rule",
    "/school/admin/academy/exam",
    "/school/admin/academy/schedule",
    "/school/admin/academy/all_classess",
  ];

  useEffect(() => {
    if (academicPaths.includes(location.pathname)) {
      setAcademicOpen(true);
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    if (path.startsWith("/school/admin/")) {
      setLoading(true);
      setTimeout(() => {
        navigate(path);
        setLoading(false);
      }, 700);
    } else {
      navigate(path);
    }
  };

  const NavItem = ({ to, icon, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl w-full transition-all duration-200 group 
        ${location.pathname === to
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
    >
      <span className="text-blue-600 group-hover:scale-110 transition">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  const SubItem = ({ to, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`block w-full text-left px-5 py-1.5 text-sm rounded-lg transition 
        ${location.pathname === to
          ? "bg-blue-50 text-blue-600 font-semibold"
          : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-xl border-r border-gray-200 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 overflow-y-auto`}
      >
        {/* Logo Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white w-9 h-9 flex items-center justify-center rounded-full shadow">
            <IoSchoolOutline />
          </div>
          <span className="text-xl font-bold text-gray-800">Schooling</span>
        </div>

        {/* User Welcome */}
        <div className="px-4 pt-4 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-9 h-9 flex justify-center items-center rounded-full uppercase font-semibold">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">System Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4 space-y-6 text-sm font-medium">

          {/* Section: Dashboard */}
          <div className="px-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Dashboard</p>
            <NavItem to="/school/admin/dashboard" icon={<IoHomeOutline size={18} />} label="Home" />
          </div>

          {/* Section: Academics */}
          <div className="px-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Academics</p>
            <button
              onClick={() => setAcademicOpen(!academicOpen)}
              className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition 
                ${academicOpen ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="flex items-center gap-2">
                <IoSchoolOutline size={18} />
                Academic
              </span>
              {academicOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>
            {academicOpen && (
              <div className="mt-2 ml-4 border-l border-gray-200 pl-3 space-y-1">
                <SubItem to="/school/admin/academy/subject" label="Subject" />
                <SubItem to="/school/admin/academy/all_classess" label="All Classes" />
              </div>
            )}
          </div>

          {/* Section: Attendance */}
          <div className="px-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Attendance</p>
            <button
              onClick={() => setAttendanceOpen(!attendanceOpen)}
              className={`w-full flex items-center justify-between px-2 py-2 rounded-lg transition 
                ${attendanceOpen ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="flex items-center gap-2">
                <FaClipboardList size={16} />
                Attendance
              </span>
              {attendanceOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>
            {attendanceOpen && (
              <div className="mt-2 ml-4 border-l border-gray-200 pl-3 space-y-1">
                <SubItem to="/school/admin/attendance/student" label="Student Attendance" />
                <SubItem to="/school/admin/attendance/teacher" label="Teacher Attendance" />
              </div>
            )}
          </div>

          {/* Section: User Registration */}
          <div className="px-4">
            <p className="text-xs text-gray-500 uppercase mb-2">User Registration</p>
            <NavItem to="/school/admin/admission_from" icon={<FaUserPlus size={16} />} label="Add Student" />
            <NavItem to="/school/admin/add_teacher" icon={<FaChalkboardTeacher size={16} />} label="Add Teacher" />
            <NavItem to="/school/admin/create_staff" icon={<FaUserFriends size={16} />} label="Add Staff" />
          </div>

          {/* Section: User Directory */}
          <div className="px-4">
            <p className="text-xs text-gray-500 uppercase mb-2">User Directory</p>
            <NavItem to="/school/admin/all_student" icon={<FaUserGraduate size={16} />} label="All Students" />
            <NavItem to="/school/admin/all_teacher" icon={<FaUsers size={16} />} label="All Teachers" />
            <NavItem to="/school/admin/all_users" icon={<FaUserFriends size={16} />} label="All Staff" />
          </div>

          {/* Section: ERT & Visitor */}
          <div className="px-4">
            <p className="text-xs text-gray-500 uppercase mb-2">ERT & Visitor</p>
            <NavItem to="/school/admin/vister_admission_list" icon={<FaClipboardList size={16} />} label="Visitor List" />
            <NavItem to="/school/admin/ert-list" icon={<FaUser size={16} />} label="ERT List" />
          </div>

          {/* Section: Management */}
          <div className="px-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Management</p>
            <NavItem to="/school/admin/teacher-leave-request" icon={<FaLevelDownAlt size={16} />} label="Teacher Request" />
            <NavItem to="/school/admin/student-leave-request" icon={<FaLevelDownAlt size={16} />} label="Student Leave" />
            <NavItem to="/school/admin/notice-board" icon={<FaFile size={16} />} label="Notice Board" />
          </div>

          {/* Section: System */}
          <div className="px-4 mb-6">
            <p className="text-xs text-gray-500 uppercase mb-2">System</p>
            <NavItem to="/school/admin/admin/setting" icon={<IoSettings size={18} />} label="Settings" />
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
