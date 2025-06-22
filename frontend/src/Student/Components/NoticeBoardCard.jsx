import React, { useEffect, useState } from 'react';
import {
  FaRegFileAlt,
  FaLeaf,
  FaBullhorn,
  FaLaptop,
  FaClock,
  FaPen,
} from 'react-icons/fa';
import axios from 'axios';

const iconMap = {
  general: <FaRegFileAlt className="text-indigo-600 text-[10px]" />,
  environment: <FaLeaf className="text-green-600 text-[10px]" />,
  announcement: <FaBullhorn className="text-rose-600 text-[10px]" />,
  online: <FaLaptop className="text-sky-600 text-[10px]" />,
  schedule: <FaClock className="text-yellow-600 text-[10px]" />,
  exam: <FaPen className="text-pink-600 text-[10px]" />,
};

const colorMap = {
  general: 'bg-indigo-100 text-indigo-600',
  environment: 'bg-green-100 text-green-600',
  announcement: 'bg-rose-100 text-rose-600',
  online: 'bg-sky-100 text-sky-600',
  schedule: 'bg-yellow-100 text-yellow-600',
  exam: 'bg-pink-100 text-pink-600',
};

export default function NoticeBoardCard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v8/event/all`);
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="bg-white rounded border border-gray-300 shadow-md w-full h-full">
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-gray-300">
        <h2 className="text-sm font-semibold text-gray-800">Notice Board</h2>
        <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">View All</span>
      </div>

      <div className="relative space-y-4 overflow-y-auto max-h-[90%] p-4 scrollbar-thin scrollbar-thumb-gray-300">
        {loading ? (
          <p className="text-center text-sm text-gray-500">Loading notices...</p>
        ) : notices.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No notices available.</p>
        ) : (
          notices.map((notice, index) => {
            const type = notice.type?.toLowerCase() || "general";
            return (
              <div key={notice._id || index} className="flex items-start gap-3 relative">
                {/* vertical line */}
                {index !== notices.length - 1 && (
                  <span className="absolute left-2.5 top-6 w-px h-[calc(100%+8px)] bg-gray-300 z-0"></span>
                )}

                {/* icon */}
                <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${colorMap[type] || colorMap.general}`}>
                  {iconMap[type] || iconMap.general}
                </div>

                {/* title and date */}
                <div>
                  <p className="text-[12px] font-medium text-gray-700 leading-tight">{notice.title}</p>
                  <p className="text-[12px] text-gray-500">Added on : {new Date(notice.date).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
