// components/LeaveRequestsCard.jsx
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

const leaveRequests = [
  {
    name: "James",
    type: "Emergency",
    role: "Physics Teacher",
    leaveDate: "12 - 13 May",
    applyDate: "12 May",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    badgeColor: "bg-red-100 text-red-600",
  },
  {
    name: "Ramien",
    type: "Casual",
    role: "Accountant",
    leaveDate: "12 - 13 May",
    applyDate: "11 May",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    badgeColor: "bg-yellow-100 text-yellow-600",
  },
];

export default function LeaveRequestsCard() {
  return (
    <div className="bg-gray-50 shadow-md border border-gray-300 rounded h-full w-full ">
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-gray-300">
        <h2 className="text-sm font-semibold text-gray-800">Leave Requests</h2>
        <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
          <FiCalendar />
          <span>Today</span>
        </div>
      </div>

      <div className="space-y-3 p-4 h-[230px] overflow-y-auto">
        {leaveRequests.map((req, idx) => (
          <div
            key={idx}
            className="flex items-start bg-gray-50 border border-gray-300 shadow-sm  rounded p-3 gap-3"
          >
            <img
              src={req.image}
              alt={req.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center  gap-2">
                  <h3 className="font-semibold text-xs text-gray-800">{req.name}</h3>
                  <span
                    className={`text-[10px] font-semibold px-1 rounded-[2px] ${req.badgeColor}`}
                  >
                    {req.type}
                  </span>
                </div>
                <div className="flex gap-2 text-white">
                  <button className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-[10px]">
                    <FaCheck />
                  </button>
                  <button className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-[10px]">
                    <FaTimes />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-gray-600">{req.role}</p>
              <hr className="border-b-[1px] border-gray-300" />
              <div className="flex justify-between text-xs text-gray-500 font-medium pt-1">
                <span>
                  Leave : <span className="text-gray-800">{req.leaveDate}</span>
                </span>
                <span>
                  Apply on : <span className="text-gray-800">{req.applyDate}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
