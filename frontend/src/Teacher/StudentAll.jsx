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

    const storedClassId = sessionStorage.getItem("selectedClassId") || "all";
    const [selectedClassId, setSelectedClassId] = useState(storedClassId);

    const fetchDetails = async () => {
        try {
            const { data } = await axios.get(
                `https://school-management-system-1-jprf.onrender.com/api/teachers/TeacherData/${auth?.user?.id}`
            );
            setTeacher(data);
            if (Array.isArray(data.Class)) {
                setClassList(data.Class);
            }
        } catch (error) {
            console.log("Error in fetchDetails:", error);
        }
    };

    const fetchStudentsByClassList = async (classIds) => {
        try {
            const res = await axios.post(
                'https://school-management-system-1-jprf.onrender.com/api/v3/student/students/by-class-list',
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

    useEffect(() => {
        fetchDetails();
    }, [auth]);

    useEffect(() => {
        if (classList.length > 0) {
            const ids = classList.map(cls => cls._id);
            fetchStudentsByClassList(ids);
        }
    }, [classList]);

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
        <div className="flex min-h-screen bg-gray-50">
            <TeacherSidebar />
            <div className="ml-0 md:ml-64 flex-grow">
                <MainHeader />
                <div className="p-6 max-w-7xl mx-auto">
                    <div className="">
                        <h2 className="text-4xl font-bold text-indigo-800 mb-6">
                            📘 Assigned Classes
                        </h2>

                        {/* Class Filter Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-md shadow-lg border border-gray-300">
                            <button
                                onClick={() => setSelectedClassId("all")}
                                className={`px-5 py-2 text-sm rounded-full font-medium transition duration-200 ${selectedClassId === "all"
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "bg-gray-100 border border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                                    }`}
                            >
                                All Classes
                            </button>
                            {classList.map(cls => (
                                <button
                                    key={cls._id}
                                    onClick={() => setSelectedClassId(cls._id)}
                                    className={`px-5 py-2 text-sm rounded-full font-medium transition duration-200 ${selectedClassId === cls._id
                                        ? "bg-indigo-600 text-white shadow-md"
                                        : "bg-gray-100 border border-indigo-300 text-indigo-700 hover:bg-indigo-100"
                                        }`}
                                >
                                    Class {cls.Classname}
                                </button>
                            ))}
                        </div>

                        <h3 className="text-2xl font-semibold text-indigo-700 mb-5">
                            👥 Student List
                        </h3>

                        {loading ? (
                            <div className="flex flex-col justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-300 border-t-indigo-700"></div>
                                <span className='font-semibold text-xl'>Loading ,please wait...</span>
                            </div>
                        ) : filteredStudents.length === 0 ? (
                            <p className="text-gray-600">No students found for this class.</p>
                        ) : (
                            <div className="overflow-x-auto rounded-md border border-gray-300 shadow-lg bg-white">
                                <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-800">
                                    <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-bold tracking-wide">
                                        <tr>
                                            <th className="px-6 py-2">#</th>
                                            <th className="px-6 py-2">Profile</th>
                                            <th className="px-6 py-2">Name</th>
                                            <th className="px-6 py-2">Email</th>
                                            <th className="px-6 py-2">Class</th>
                                            <th className="px-6 py-2">Roll No</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredStudents.map((student, index) => (
                                            <tr
                                                key={student._id}
                                                className="hover:bg-gray-50 transition duration-200"
                                            >
                                                <td className="px-6 py-2 font-semibold text-gray-600">{index + 1}</td>
                                                <td className="px-6 py-2">
                                                    {student.userId?.profileImage ? (
                                                        <img
                                                            src={`https://school-management-system-1-jprf.onrender.com/${student.userId.profileImage}`}
                                                            alt="profile"
                                                            className="h-10 w-10 object-cover rounded-full border border-indigo-300 shadow"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold shadow">
                                                            {student.userId?.name
                                                                ? student.userId.name[0].toUpperCase() +
                                                                student.userId.name.slice(-1).toUpperCase()
                                                                : 'NA'}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-2">{student.userId?.name}</td>
                                                <td className="px-6 py-2">{student.userId?.email}</td>
                                                <td className="px-6 py-2">{student.class?.Classname}</td>
                                                <td className="px-6 py-2">{student.rollNumber}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
