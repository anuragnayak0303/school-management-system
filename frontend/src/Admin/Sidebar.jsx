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
import { FaClipboardList, FaUser, FaUsers } from "react-icons/fa";
import { LoadingContext } from "../context/LoadingProvider ";


const Sidebar = () => {
  const [academicOpen, setAcademicOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  // All paths under Academic to auto-expand the dropdown
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

  // Navigation handler with loading animation for /school/admin/ routes
  const handleNavigation = (path) => {
    if (path.startsWith("/school/admin/")) {
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
            to="/school/admin/dashboard"
            icon={<IoHomeOutline size={20} />}
            label="Dashboard"
          />

          {/* Academic Dropdown */}
          <div>
            <button
              onClick={() => setAcademicOpen(!academicOpen)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded ${
                academicOpen
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
                <SubItem to="/school/admin/academy/subject" label="Subject" />
                <SubItem to="/school/admin/academy/all_classess" label="All Classes" />
              </div>
            )}
          </div>

          <NavItem
            to="/school/admin/vister_admission_list"
            icon={<FaClipboardList size={20} />}
            label="Vist Admission List"
          />
          <NavItem
            to="/school/admin/ert-list"
            icon={<FaUser size={20} />}
            label="ERT List"
          />
          <NavItem
            to="/school/admin/admission_from"
            icon={<FaUser size={20} />}
            label="Students Admission"
          />
          <NavItem
            to="/school/admin/all_student"
            icon={<FaUsers size={20} />}
            label="All Students"
          />
          <NavItem
            to="/school/admin/all_teacher"
            icon={<FaUsers size={20} />}
            label="All Teacher"
          />
          <NavItem
            to="/school/admin/admin/setting"
            icon={<IoSettings size={20} />}
            label="Settings"
          />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
