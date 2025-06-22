import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaBook,
  FaClipboardList,
  FaMoneyBillWave,
  FaClipboard,
  FaFileAlt,
  FaSourcetree,
  FaBell,
  FaUserPlus,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

const quickLinks = [
  { label: "Notice Board", icon: <FaBell />, bg: "bg-green-100", iconColor: "text-green-600", link: "/school/admin/notice-board" },
  { label: "Add Student", icon: <FaUserPlus />, bg: "bg-red-100", iconColor: "text-red-600", link: '/school/admin/admission_from' },
  { label: "Attendance", icon: <FaClipboardList />, bg: "bg-yellow-100", iconColor: "text-yellow-600", link: '/school/admin/attendance/student' },
  { label: "Settings", icon: <IoSettings />, bg: "bg-cyan-100", iconColor: "text-cyan-600", link: '/school/admin/admin/setting/profile' },
  { label: "Home Works", icon: <FaClipboard />, bg: "bg-pink-100", iconColor: "text-pink-600" },
  { label: "All Subject", icon: <FaFileAlt />, bg: "bg-sky-100", iconColor: "text-sky-600" },
];

export default function QuickLinksCard() {
  const [rotatingIndex, setRotatingIndex] = useState(null);

  const handleClick = (index) => {
    setRotatingIndex(index);
    setTimeout(() => {
      setRotatingIndex(null);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 rounded border border-gray-300 shadow-md w-full h-full">
      <h2 className="text-[15px] tracking-wider font-semibold text-gray-800 border-b border-b-gray-300 px-4 py-3">
        Quick Links
      </h2>
      <div className="grid grid-cols-3 gap-3 px-4 py-5">
        {quickLinks.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className={`group flex flex-col items-center justify-center py-2.5 space-y-2.5 px-3 rounded cursor-pointer transition hover:scale-105 ${item.bg}`}
          >
            <NavLink to={item.link}
              className={`p-3 text-xs rounded-full bg-white shadow ${item.iconColor} 
              ${rotatingIndex === idx ? "animate-spin-slow-once" : ""}`}
            >
              {item.icon}
            </NavLink>
            <span className="text-xs text-gray-700 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
