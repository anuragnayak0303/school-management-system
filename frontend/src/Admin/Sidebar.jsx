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
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingProvider ";
// adjust path if needed

const Sidebar = () => {
  const [academicOpen, setAcademicOpen] = useState(false);
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
        md:translate-x-0 transition-transform duration-300`}
      >
        {/* Logo Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white w-9 h-9 flex items-center justify-center rounded-full shadow">
            <IoSchoolOutline />
          </div>
          <span className="text-xl font-bold text-gray-800">Schooling</span>
        </div>

        {/* User Welcome (Optional Avatar Area) */}
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
        <nav className="py-4 space-y-1 text-sm font-medium">
          <NavItem to="/school/admin/dashboard" icon={<IoHomeOutline size={18} />} label="Dashboard" />

          {/* Academic */}
          <div className="px-2">
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

          <NavItem to="/school/admin/vister_admission_list" icon={<FaClipboardList size={16} />} label="Visit Admission List" />
          <NavItem to="/school/admin/ert-list" icon={<FaUser size={16} />} label="ERT List" />
          <NavItem to="/school/admin/admission_from" icon={<FaUserPlus size={16} />} label="Students Admission" />
          <NavItem to="/school/admin/all_users" icon={<FaUserFriends size={16} />} label="All Staff" />
          <NavItem to="/school/admin/all_student" icon={<FaUserGraduate size={16} />} label="All Students" />
          <NavItem to="/school/admin/all_teacher" icon={<FaUsers size={16} />} label="All Teacher" />
          <NavItem to="/school/admin/leave-requser" icon={<FaLevelDownAlt size={16} />} label="Leave Request" />
          <NavItem to="/school/admin/notice-board" icon={<FaFile size={16} />} label="Notice Board" />
          <NavItem to="/school/admin/admin/setting" icon={<IoSettings size={18} />} label="Settings" />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
