import React, { useContext, useEffect, useState } from 'react';
import StudentSideBar from './StudentSideBar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { AuthStudentContext } from '../context/StudentAuth';
import { ThreeDots } from 'react-loader-spinner';

export default function Attendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const { student } = useContext(AuthStudentContext);

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `http://localhost:8000/api/v8/student/attendance/student/${student?._id}?page=${page}`
            );
            setAttendanceData(data|| []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Failed to fetch attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (student?._id) {
            fetchAttendance();
        }
    }, [page, student]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100">
            <StudentSideBar />
            <div className="flex-grow flex flex-col ml-0 lg:ml-64">
                <MainHeader />
                <div className="p-4 max-w-7xl w-full mx-auto">
                    <h1 className="text-2xl font-bold text-indigo-700 mb-6 drop-shadow-md">
                        🗂️ My Attendance
                    </h1>

                    {loading ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#6366f1"
                                ariaLabel="three-dots-loading"
                                visible={true}
                            />
                        </div>
                    ) : attendanceData.length === 0 ? (
                        <p className="text-gray-600">No attendance records found.</p>
                    ) : (
                        <div className="overflow-x-auto transition-all duration-300">
                            <table className="min-w-full bg-white shadow-2xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-[1.01]">
                                <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-left">
                                    <tr className="text-md">
                                        <th className="px-6 py-4">📅 Date</th>
                                        <th className="px-6 py-4">🏫 Class</th>
                                        <th className="px-6 py-4">👨‍🏫 Teacher</th>
                                        <th className="px-6 py-4">📘 Subject</th>
                                        <th className="px-6 py-4">✅ Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData.map((record, index) =>
                                        record.subjects.map((subject, subIndex) => (
                                            <tr
                                                key={`${index}-${subIndex}`}
                                                className="border-b transition duration-200 ease-in-out hover:scale-[1.01] hover:bg-indigo-50"
                                            >
                                                <td className="px-6 py-3 font-medium">
                                                    {new Date(record.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-3">{record.class}</td>
                                                <td className="px-6 py-3">{record.teacher}</td>
                                                <td className="px-6 py-3">{subject}</td>
                                                <td
                                                    className={`px-6 py-3 font-semibold ${
                                                        record.status === 'Present'
                                                            ? 'text-green-600'
                                                            : 'text-red-500'
                                                    }`}
                                                >
                                                    {record.status}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {attendanceData.length > 0 && !loading && (
                        <div className="flex justify-between items-center mt-8">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                            >
                                ⬅ Previous
                            </button>
                            <span className="text-indigo-800 font-semibold">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                            >
                                Next ➡
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
