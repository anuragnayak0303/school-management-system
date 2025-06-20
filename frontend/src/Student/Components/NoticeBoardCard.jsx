import React from 'react';
import { FaRegFileAlt, FaLeaf, FaBullhorn, FaLaptop, FaClock, FaPen } from 'react-icons/fa';

const notices = [
  {
    title: 'New Syllabus Instructions',
    date: '11 Mar 2024',
    icon: <FaRegFileAlt className="text-indigo-600 text-[10px]" />,
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    title: 'World Environment Day Program.....!!!',
    date: '21 Apr 2024',
    icon: <FaLeaf className="text-green-600 text-[10px]" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Exam Preparation Notification!',
    date: '13 Mar 2024',
    icon: <FaBullhorn className="text-rose-600 text-[10px]" />,
    color: 'bg-rose-100 text-rose-600',
  },
  {
    title: 'Online Classes Preparation',
    date: '24 May 2024',
    icon: <FaLaptop className="text-sky-600 text-[10px]" />,
    color: 'bg-sky-100 text-sky-600',
  },
  {
    title: 'Exam Time Table Release',
    date: '24 May 2024',
    icon: <FaClock className="text-yellow-600 text-[10px]" />,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    title: 'English Exam Preparation',
    date: '23 Mar 2024',
    icon: <FaPen className="text-pink-600 text-[10px]" />,
    color: 'bg-pink-100 text-pink-600',
  },
];

export default function NoticeBoardCard() {
  return (
    <div className="bg-white rounded border border-gray-300 shadow-md w-full h-full">
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-gray-300">
        <h2 className="text-sm font-semibold text-gray-800">Notice Board</h2>
        <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">View All</span>
      </div>
      <div className="relative space-y-4 overflow-y-auto max-h-[90%] p-4 scrollbar-thin scrollbar-thumb-gray-300">
        {notices.map((notice, index) => (
          <div key={index} className="flex items-start gap-3 relative">
            {/* vertical line */}
            {index !== notices.length - 1 && (
              <span className="absolute left-2.5 top-6 w-px h-[calc(100%+8px)] bg-gray-300 z-0"></span>
            )}

            {/* icon circle */}
            <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${notice.color}`}>
              {notice.icon}
            </div>

            {/* text */}
            <div>
              <p className="text-[12px] font-medium text-gray-700 leading-tight">{notice.title}</p>
              <p className="text-[12px] text-gray-500">Added on : {notice.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
