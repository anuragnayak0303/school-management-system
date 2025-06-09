import React, { useContext, useEffect, useState } from "react";
import {
  IoHomeOutline,
  IoSchoolOutline,
  IoSettings,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import {
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  FaBookReader,
  FaClipboardList,
  FaUser,
  FaUsers,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBullhorn,
  FaRegFileAlt,
  FaLock,
  FaBook,
  FaBus,
  FaUserGraduate,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingProvider ";

const TeacherSidebar = () => {
  const [academicOpen, setAcademicOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [transportOpen, setTransportOpen] = useState(false);
  const [alumniOpen, setAlumniOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

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

  const handleNavigation = (path) => {
    if (path.startsWith("/school/teacher/")) {
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
      className={`w-full text-left flex items-center gap-3 px-4 py-2 rounded transition-all ${location.pathname === to
          ? "bg-gray-200 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      {icon} {label}
    </button>
  );

  const SubItem = ({ to, label }) => (
    <button
      onClick={() => handleNavigation(to)}
      className={`block w-full text-left pl-6 py-2 text-sm rounded ${location.pathname === to
          ? "text-orange-600 font-medium bg-gray-200"
          : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
        }`}
    >
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
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg border-r px-4 border-r-gray-200 overflow-y-auto`}
      >
        <div className="flex items-center gap-3 p-4">
          <span className="text-lg font-bold">ULATer School</span>
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
            label="Student Attendance"
          />

          {/* Academic Dropdown */}
          <button
            onClick={() => setAcademicOpen(!academicOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <IoSchoolOutline size={20} /> Academic
            </div>
            {academicOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {academicOpen && (
            <div className="ml-2 space-y-1">
              {/* <SubItem to="/school/teacher/academy/all_classess" label="All Classes" /> */}
              <SubItem to="/school/teacher/Syllabus" label="Syllabus" />
              {/* <SubItem to="/school/teacher/academy/schedule" label="Class Schedule" />
              <SubItem to="/school/teacher/academy/exam" label="Exam Management" />
              <SubItem to="/school/teacher/academy/result-rule" label="Result Rules" />
              <SubItem to="/school/teacher/academy/course" label="Courses" /> */}
            </div>
          )}

          {/* Student Management Dropdown */}
          <button
            onClick={() => setStudentOpen(!studentOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <FaUsers size={20} /> Student Management
            </div>
            {studentOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {studentOpen && (
            <div className="ml-2 space-y-1">
              <SubItem to="/school/teacher/students" label="All Students" />
              <SubItem to="/school/teacher/assignments" label="Assignments" />
              <SubItem to="/school/teacher/grades" label="Gradebook" />
            </div>
          )}

          {/* Library Section */}
          {/* <button
            onClick={() => setLibraryOpen(!libraryOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <FaBook size={20} /> Library
            </div>
            {libraryOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {libraryOpen && (
            <div className="ml-2 space-y-1">
              <SubItem to="/school/teacher/library/books" label="Books" />
              <SubItem to="/school/teacher/library/issues" label="Issue History" />
            </div>
          )} */}

          {/* Transport Section */}
          {/* <button
            onClick={() => setTransportOpen(!transportOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <FaBus size={20} /> Transport
            </div>
            {transportOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {transportOpen && (
            <div className="ml-2 space-y-1">
              <SubItem to="/school/teacher/transport/routes" label="Routes" />
              <SubItem to="/school/teacher/transport/buses" label="Bus Details" />
            </div>
          )} */}

          {/* Alumni Section */}
          {/* <button
            onClick={() => setAlumniOpen(!alumniOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <FaUserGraduate size={20} /> Alumni
            </div>
            {alumniOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {alumniOpen && (
            <div className="ml-2 space-y-1">
              <SubItem to="/school/teacher/alumni/list" label="Alumni List" />
              <SubItem to="/school/teacher/alumni/events" label="Alumni Events" />
            </div>
          )} */}

          {/* Other Navigation */}
          <NavItem
            to="/school/teacher/notice-board"
            icon={<FaBullhorn size={20} />}
            label="Notice Board"
          />

          <NavItem
            to="/school/teacher/my_timetable"
            icon={<FaCalendarAlt size={20} />}
            label="My Timetable"
          />

          <NavItem
            to="/school/teacher/leave_application"
            icon={<FaRegFileAlt size={20} />}
            label="Leave Application"
          />

          <NavItem
            to="/school/teacher/view_details"
            icon={<FaChalkboardTeacher size={20} />}
            label="Teacher Details"
          />

          {/* Profile/Settings Dropdown */}
          {/* <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <FaUser size={20} /> Profile
            </div>
            {profileOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {profileOpen && (
            <div className="ml-2 space-y-1">
              <SubItem to="/school/teacher/profile" label="My Profile" />
              <SubItem to="/school/teacher/change_password" label="Change Password" />
            </div>
          )} */}

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
