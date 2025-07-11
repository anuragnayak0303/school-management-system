import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';

export default function TeacherAttendance() {
    const [attendanceList, setAttendanceList] = useState([]);
    const [summary, setSummary] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await axios.get("https://school-management-system-1-jprf.onrender.com/api/attendance/"); // Adjust API
                const data = res.data;
                console.log(data)
                // Group by teacher
                const count = {};
                data.forEach(entry => {
                    const id = entry.userId;
                    count[id] = (count[id] || 0) + 1;
                });

                const formatted = Object.entries(count).map(([userId, presentDays]) => ({
                    userId,
                    presentDays,
                }));

                setSummary(formatted);
            } catch (error) {
                console.error("Error fetching attendance", error);
            }
        };

        fetchAttendance();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100">
                <MainHeader />

                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-700 mb-6">Teacher Attendance Summary</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {summary.map((teacher, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105 hover:shadow-indigo-300"
                            >
                                <div className="text-xl font-semibold text-gray-800 mb-2">👨‍🏫 Teacher ID:</div>
                                <div className="text-indigo-600 font-mono text-lg break-words">{teacher.userId?.userId?.name}</div>
                                <div className="mt-4 text-gray-700 text-lg">
                                    📅 Present Days: <span className="font-bold text-green-600">{teacher.presentDays}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
