import React, { useState } from 'react';

const leaveData = [
  {
    id: 1,
    type: 'Emergency Leave',
    date: '15 Jun 2024',
    status: 'Pending',
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8 3a1 1 0 100-2 1 1 0 000 2zm-.75-6.75a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
    statusColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 2,
    type: 'Medical Leave',
    date: '15 Jun 2024',
    status: 'Approved',
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: 3,
    type: 'Medical Leave',
    date: '16 Jun 2024',
    status: 'Declined',
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    id: 4,
    type: 'Fever',
    date: '16 Jun 2024',
    status: 'Approved',
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
    statusColor: 'bg-green-100 text-green-800',
  },
];

export default function LeaveStatusCard() {
  const [selectedFilter, setSelectedFilter] = useState('This Month');

  return (
    <div className="w-full mx-auto h-full bg-white shadow-md rounded border border-gray-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-300">
        <h2 className="text-[16px] font-semibold ">Leave Status</h2>
        <div className="relative">
          <select
            className="text-xs font-semibold outiline-0 px-2 py-1 text-gray-900"
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
        {leaveData.map((leave) => (
          <div
            key={leave.id}
            className="flex items-center justify-between bg-gray-100 rounded p-3"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-white">{leave.icon}</div>
              <div>
                <p className="font-semibold text-xs text-gray-700">{leave.type}</p>
                <p className="text-xs text-gray-500">Date: {leave.date}</p>
              </div>
            </div>
            <span
              className={`inline-block px-3 py-1 text-[10px] font-medium rounded ${leave.statusColor}`}
            >
              {leave.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
