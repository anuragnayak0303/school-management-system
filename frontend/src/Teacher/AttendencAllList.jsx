import React, { useEffect, useState } from 'react';
import TeacherSidebar from './TeacherSideBar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { CSVLink } from 'react-csv';

export default function AttendencAllList() {
    const { auth } = useAuth();
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState(localStorage.getItem('selectedSubjectId') || 'all');
    const [attendanceList, setAttendanceList] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10;

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:8000/api/teachers/TeacherData/${auth?.user?.id}`);
            if (Array.isArray(data.subject)) {
                setSubjectList(data.subject);
                const subjectIds = selectedSubjectId === 'all' ? data.subject.map(s => s._id) : [selectedSubjectId];
                await fetchAttendance(subjectIds);
            }
        } catch (err) {
            console.error('Error fetching teacher data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendance = async (subjectIdsArray) => {
        try {
            const { data } = await axios.post(`http://localhost:8000/api/v8/student/attendance/by-subjects`, {
                subjectIds: subjectIdsArray,
            });
            if (data.success) setAttendanceList(data.attendance);
            else setAttendanceList([]);
        } catch (err) {
            console.error('Error fetching attendance:', err);
        }
    };

    const handleSubjectClick = (subjectId) => {
        setSelectedSubjectId(subjectId);
        localStorage.setItem('selectedSubjectId', subjectId);
        const ids = subjectId === 'all' ? subjectList.map(s => s._id) : [subjectId];
        setLoading(true);
        fetchAttendance(ids).finally(() => setLoading(false));
    };

    useEffect(() => {
        if (auth?.user?.id) fetchDetails();
    }, [auth]);

    const flattenAttendance = [];
    attendanceList.forEach(record => {
        const subjectName = record.subjects?.[0]?.subjectName || 'N/A';
        const className = record.classId?.Classname || 'N/A';
        record.attendance?.forEach(att => {
            flattenAttendance.push({
                date: record.date,
                status: att.status,
                student: att.studentId,
                subjectName,
                className,
            });
        });
    });

    let filteredAttendance = flattenAttendance;
    if (selectedDate) {
        filteredAttendance = filteredAttendance.filter(item => item.date.startsWith(selectedDate));
    }
    if (searchQuery) {
        filteredAttendance = filteredAttendance.filter(item =>
            item.student?.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    filteredAttendance.sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
    const currentData = filteredAttendance.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getInitials = (name) => {
        if (!name) return "?";
        const parts = name.split(" ");
        const first = parts[0]?.[0] || "";
        const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
        return (first + last).toUpperCase();
    };

    const Loader = () => (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 z-50 fixed top-0 left-0">
            <div className="relative h-20 w-20">
                <div className="absolute inset-0 border-8 border-t-purple-500 border-r-pink-400 border-b-yellow-400 border-l-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-xl font-bold text-purple-700 drop-shadow animate-pulse">Loading...</p>
        </div>
    );

    if (loading) return <Loader />;

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100">
            <TeacherSidebar />
            <div className="ml-0 md:ml-64 flex-grow flex flex-col min-h-screen">
                <MainHeader />
                <div className="p-6 max-w-7xl w-full">
                    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                        <h2 className="text-4xl font-extrabold text-purple-800 drop-shadow tracking-wide">📚 Subject-wise Attendance</h2>
                        <CSVLink data={filteredAttendance} filename="attendance.csv" className="px-4 py-2 rounded bg-green-600 text-white">Export CSV</CSVLink>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="🔍 Search student name..."
                            className="px-4 py-2 rounded-xl border-2 border-pink-300 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <input
                            type="date"
                            className="px-4 py-2 rounded-xl border-2 border-purple-300 shadow-sm"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 mb-10">
                        <button onClick={() => handleSubjectClick("all")} className={`px-4 py-2 rounded-full shadow ${selectedSubjectId === 'all' ? 'bg-purple-700 text-white' : 'bg-white border border-purple-500 text-purple-700'}`}>All Subjects</button>
                        {subjectList.map(subject => (
                            <button
                                key={subject._id}
                                onClick={() => handleSubjectClick(subject._id)}
                                className={`px-4 py-2 rounded-full shadow ${selectedSubjectId === subject._id ? 'bg-pink-600 text-white' : 'bg-white border border-pink-500 text-pink-700'}`}
                            >
                                {subject.subjectName}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                                <tr>
                                    <th className="px-4 py-3">📅 Date</th>
                                    <th className="px-4 py-3">🧑 Profile</th>
                                    <th className="px-4 py-3">👤 Name</th>
                                    <th className="px-4 py-3"># ID</th>
                                    <th className="px-4 py-3">🏫 Class</th>
                                    <th className="px-4 py-3">📘 Subject</th>
                                    <th className="px-4 py-3">✔ Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length > 0 ? currentData.map((att, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{new Date(att.date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">
                                            {att.student?.userId?.profileImage ? (
                                                <img src={`http://localhost:8000/${att.student.userId.profileImage}`} className="h-10 w-10 rounded-full object-cover" alt="Profile" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-bold">
                                                    {getInitials(att.student?.userId?.name)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 font-semibold">{att.student?.userId?.name || 'Unknown'}</td>
                                        <td className="px-4 py-2">{att.student?.admissionNumber || 'N/A'}</td>
                                        <td className="px-4 py-2">{att.className}</td>
                                        <td className="px-4 py-2">{att.subjectName}</td>
                                        <td className="px-4 py-2">
                                            {att.status === 'Present' ? (
                                                <span className="flex items-center gap-1 text-green-600"><FaCheckCircle className="text-lg" /> Present</span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-600"><FaTimesCircle className="text-lg" /> Absent</span>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-6 text-gray-500 italic">No records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6 gap-2">
                            {[...Array(totalPages).keys()].map(page => (
                                <button
                                    key={page + 1}
                                    className={`px-4 py-2 rounded-full ${currentPage === page + 1 ? 'bg-purple-600 text-white' : 'bg-white border border-purple-300 text-purple-600'}`}
                                    onClick={() => setCurrentPage(page + 1)}
                                >
                                    {page + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
