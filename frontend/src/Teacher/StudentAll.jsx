import React, { useEffect, useState } from 'react';
import TeacherSidebar from './TeacherSideBar';
import MainHeader from '../components/MainHeader';
import { useAuth } from '../context/auth';
import axios from 'axios';

export default function TeacherStudentList() {
    const { auth } = useAuth();

    const [teacher, setTeacher] = useState({});
    const [classList, setClassList] = useState([]);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Restore selected class from session storage (defaults to "all")
    const storedClassId = sessionStorage.getItem("selectedClassId") || "all";
    const [selectedClassId, setSelectedClassId] = useState(storedClassId);

    // ✅ Fetch teacher & class info
    
    const fetchDetails = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/teachers/TeacherData/${auth?.user?.id}`
            );
            setTeacher(data);
            if (Array.isArray(data.Class)) {
                setClassList(data.Class);
            }
        } catch (error) {
            console.log("Error in fetchDetails:", error);
        }
    };

    // ✅ Fetch students by class ID list
    const fetchStudentsByClassList = async (classIds) => {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/v3/student/students/by-class-list',
                { classIds }
            );
            setStudents(res.data.data);
            setFilteredStudents(res.data.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Initial fetch
    useEffect(() => {
        fetchDetails();
    }, [auth]);

    // ✅ When class list is loaded, fetch students
    useEffect(() => {
        if (classList.length > 0) {
            const ids = classList.map(cls => cls._id);
            fetchStudentsByClassList(ids);
        }
    }, [classList]);

    // ✅ Update filtered list when selected class changes
    useEffect(() => {
        sessionStorage.setItem("selectedClassId", selectedClassId);
        if (selectedClassId === "all") {
            setFilteredStudents(students);
        } else {
            const filtered = students.filter(s => s.class?._id === selectedClassId);
            setFilteredStudents(filtered);
        }
    }, [selectedClassId, students]);

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
            <TeacherSidebar />
            <div className="ml-0 md:ml-64 flex-grow">
                <MainHeader />
                <div className="p-4 max-w-7xl">
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 drop-shadow-md">🎓 Assigned Classes</h2>

                    {/* Class Filter Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => setSelectedClassId("all")}
                            className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
                                selectedClassId === "all"
                                    ? "bg-indigo-600 text-white shadow"
                                    : "bg-white border border-indigo-400 text-indigo-700 hover:bg-indigo-100"
                            }`}
                        >
                            All
                        </button>
                        {classList.map(cls => (
                            <button
                                key={cls._id}
                                onClick={() => setSelectedClassId(cls._id)}
                                className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
                                    selectedClassId === cls._id
                                        ? "bg-indigo-600 text-white shadow"
                                        : "bg-white border border-indigo-400 text-indigo-700 hover:bg-indigo-100"
                                }`}
                            >
                                {cls.Classname}
                            </button>
                        ))}
                    </div>

                    <h3 className="text-2xl font-semibold text-indigo-800 mb-4">👥 Student List</h3>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <p className="text-gray-600">No students found for the selected class.</p>
                    ) : (
                        <div className="overflow-x-auto rounded-3xl shadow-2xl border border-indigo-300 bg-white">
                            <table className="min-w-full text-sm text-left text-gray-800">
                                <thead className="text-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white uppercase font-semibold tracking-wide">
                                    <tr>
                                        <th className="px-6 py-3">#</th>
                                        <th className="px-6 py-3">Profile</th>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Class</th>
                                        <th className="px-6 py-3">Roll No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student, index) => (
                                        <tr
                                            key={student._id}
                                            className="border-b border-b-gray-300 hover:bg-indigo-50 transition transform hover:scale-[1.01]"
                                        >
                                            <td className="px-6 py-3 font-semibold">{index + 1}</td>
                                            <td className="px-6 py-3">
                                                {student.userId?.profileImage ? (
                                                    <img
                                                        src={`http://localhost:8000/${student.userId.profileImage}`}
                                                        alt="profile"
                                                        className="h-9 w-9 object-cover rounded-full border-2 border-purple-300 shadow-md"
                                                    />
                                                ) : (
                                                    <div className="h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-lg font-semibold shadow-md">
                                                        {student.userId?.name
                                                            ? student.userId.name.charAt(0).toUpperCase() +
                                                              student.userId.name.charAt(student.userId.name.length - 1).toUpperCase()
                                                            : 'NA'}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-3">{student.userId?.name}</td>
                                            <td className="px-6 py-3">{student.userId?.email}</td>
                                            <td className="px-6 py-3">{student.class?.Classname}</td>
                                            <td className="px-6 py-3">{student.rollNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
