import React from 'react';
import { FaClock } from 'react-icons/fa';

const classes = [
    { id: 1, subject: 'English', time: '09:00 - 09:45 AM', status: 'Completed', bgcolor: 'bg-green-800', statusColor: 'bg-green-100 text-green-700', teacherImg: 'https://avatar.iran.liara.run/public/44' },
    { id: 2, subject: 'Chemistry', time: '10:45 - 11:30 AM', status: 'Completed', bgcolor: 'bg-green-800', statusColor: 'bg-green-100 text-green-700', teacherImg: 'https://avatar.iran.liara.run/public/44' },
    { id: 3, subject: 'Physics', time: '11:30 - 12:15 AM', status: 'Inprogress', bgcolor: 'bg-yellow-800', statusColor: 'bg-yellow-100 text-yellow-700', teacherImg: 'https://avatar.iran.liara.run/public/44' },
];

export default function TodaysClassCard() {
    return (
        <div className="bg-[#ffffff] rounded shadow-md border border-gray-300">
            <div className="flex justify-between items-center p-4 border-b border-b-gray-300">
                <h3 className="text-sm font-semibold text-gray-800">Today's Class</h3>
                <span className="text-xs text-gray-500">16 May 2024</span>
            </div>
            <div className="space-y-3 p-4 w-full h-[40vh] overflow-y-auto">
                {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between bg-white p-2 rounded border border-gray-300 shadow-md">
                        <div className="flex items-center space-x-3">
                            <img src={cls.teacherImg} alt={cls.subject} className="w-10 h-11 rounded" />
                            <div>
                                <p className="text-[12px] font-semibold text-gray-800">{cls.subject}</p>
                                <p className="text-[10px] text-gray-500 flex items-center">
                                    <FaClock className="mr-1" /> {cls.time}
                                </p>
                            </div>
                        </div>
                        <span className={`text-[10px] flex items-center space-x-2.5 font-semibold px-2 py-0.5 rounded ${cls.statusColor}`}>
                            <span className={`w-1.5 h-1.5 border rounded-full mr-2 ${cls.bgcolor} `}></span>  {cls.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
