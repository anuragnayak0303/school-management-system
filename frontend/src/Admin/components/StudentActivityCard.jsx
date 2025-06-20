import React from "react";
import { FaAngleDown } from "react-icons/fa";

const activities = [
    {
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        title: '1st place in "Chess"',
        subtitle: "This event took place in Our School",
    },
    {
        img: "https://randomuser.me/api/portraits/men/45.jpg",
        title: 'Participated in "Carrom"',
        subtitle: 'Justin Lee participated in "Carrom"',
    },
    {
        img: "https://randomuser.me/api/portraits/women/46.jpg",
        title: '1st place in "100M"',
        subtitle: "This event took place in Our School",
    },
    {
        img: "https://randomuser.me/api/portraits/men/47.jpg",
        title: "International conference",
        subtitle: "We attended international conference",
    },
];

export default function StudentActivityCard() {
    return (
        <div className="bg-gray-50 border border-gray-300 shadow-md rounded h-full w-full flex flex-col ">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3.5 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-800">Student Activity</h2>
                <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
                    This Month <FaAngleDown className="w-3 h-3" />
                </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto h-[49vh]  px-4 py-3 space-y-4">
                {activities.map((item, idx) => (
                    <div key={idx} className="flex gap-3 border border-gray-300 p-2 rounded shadow-sm items-start">
                        <img
                            src={item.img}
                            alt="avatar"
                            className="w-10 h-10 rounded object-cover border"
                        />
                        <div className="text-sm">
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
