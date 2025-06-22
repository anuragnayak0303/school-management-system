import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { AuthStudentContext } from '../../context/StudentAuth';
import { toast } from 'react-hot-toast'; // optional toast

export default function LeaveStatusCard() {
  const [selectedFilter, setSelectedFilter] = useState('This Month');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const { student } = useContext(AuthStudentContext);

  useEffect(() => {
    (async () => {
      if (student?._id) {
        try {
          const { data } = await axios.get(`http://localhost:8000/api/v10/student-leave/${student?._id}`);
          const filtered = Array.isArray(data)
            ? data.filter((req) => req.status === 'approved' || req.status === 'rejected')
            : [];

          setRequests(filtered);
        } catch (err) {
          console.error(err);
          toast.error("Failed to load leave requests");
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [student]);

  return (
    <div className="w-full mx-auto h-full bg-white shadow-md rounded border border-gray-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-300">
        <h2 className="text-[16px] font-semibold ">Leave Status</h2>
        <div className="relative">
          <select
            className="text-xs font-semibold px-2 py-1 text-gray-900"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option>Today</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-gray-500">No approved or rejected leaves.</p>
        ) : (
          requests.map((leave) => (
            <div
              key={leave._id}
              className="flex items-center justify-between bg-gray-100 rounded p-3"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-white">
                  {/* Status Icon */}
                  {leave.status === 'approved' ? (
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-xs text-gray-700">
                    {leave.reason || 'Leave Reason'}
                  </p>
                  <p className="text-xs text-gray-500">
                    From: {new Date(leave.from).toLocaleDateString()} - To: {new Date(leave.to).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span
                className={`inline-block px-3 py-1 text-[10px] font-medium rounded ${leave.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
