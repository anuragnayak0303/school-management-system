// components/LeaveRequestsCard.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
// Helper to format leave dates like "21 - 29 Jun"
function formatLeaveDate(fromDateStr, toDateStr) {
  const fromDate = new Date(fromDateStr);
  const toDate = new Date(toDateStr);

  const fromDay = fromDate.getDate();
  const toDay = toDate.getDate();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const fromMonth = monthNames[fromDate.getMonth()];
  const toMonth = monthNames[toDate.getMonth()];

  if (fromMonth === toMonth) {
    return `${fromDay} - ${toDay} ${fromMonth}`;
  } else {
    return `${fromDay} ${fromMonth} - ${toDay} ${toMonth}`;
  }
}

export default function LeaveRequestsCard() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v2/employees/leave/all`);
      setLeaves(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching leave data", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const { data } = await axios.put(`http://localhost:8000/api/v2/employees/leave/status/${id}`, {
        status: newStatus,
      });
      fetchLeaves()
      toast.success(`Leave ${newStatus.toLowerCase()} ✅`);
    } catch (err) {
      console.error(err);
      toast.error("Status update failed ❌");
    }
  };

  return (
    <div className="bg-gray-50 shadow-md border border-gray-300 rounded h-full w-full">
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-gray-300">
        <h2 className="text-sm font-semibold text-gray-800">Leave Requests</h2>
        <div className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
          <FiCalendar />
          <span>Today</span>
        </div>
      </div>

      <div className="space-y-3 p-4 h-[43vh] overflow-y-auto">
        {leaves.filter((req) => req.status === "Pending").length > 0 ? (
          leaves
            .filter((req) => req.status === "Pending")
            .map((req, idx) => (
              <div
                key={idx}
                className="flex items-start bg-gray-50 border border-gray-300 shadow-sm rounded p-3 gap-3"
              >
                <img
                  src={`http://localhost:8000/${req?.userId?.userId?.profileImage}` || "https://via.placeholder.com/40"}
                  alt={req?.userId?.userId?.name || "User"}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-xs text-gray-800">
                        {req.userId?.userId?.name}
                      </h3>
                      <span className="text-[10px] font-semibold px-1 rounded-[2px] bg-red-100 text-red-600">
                        {req.reason}
                      </span>
                    </div>
                    <div className="flex gap-2 text-white">
                      <button
                        onClick={() => handleStatusUpdate(req._id, "Approved")}
                        className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-[10px]"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "Rejected")}
                        className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-[10px]"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-600">
                    {req?.userId?.userId?.role}
                  </p>
                  <hr className="border-b-[1px] border-gray-300" />
                  <div className="flex justify-between text-xs text-gray-500 font-medium pt-1">
                    <span>
                      Leave:{" "}
                      <span className="text-gray-800">
                        {formatLeaveDate(req?.fromDate, req?.toDate)}
                      </span>
                    </span>
                    <span>
                      Apply on:{" "}
                      <span className="text-gray-800">
                        {new Date(req?.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center text-sm text-gray-500 mt-10">
            No pending leave requests 💤
          </div>
        )}
      </div>
    </div>
  );
}
