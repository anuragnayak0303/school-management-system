import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { MoreVertical } from 'lucide-react';

export default function AllStudent() {
    const [AllStudent, setAllStudent] = useState([]);

    const getallstudent = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v3/student/get`);
            setAllStudent(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getallstudent();
    }, []);

    const getInitials = (fullName = "") => {
        const names = fullName.trim().split(" ");
        if (names.length === 1) return names[0][0]?.toUpperCase();
        return names[0][0]?.toUpperCase() + names[names.length - 1][0]?.toUpperCase();
    };

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-50">
                <MainHeader />
                <div className="p-6">
                    <div className="text-sm text-gray-500 mb-3">Admin &gt; <span className="font-medium text-gray-700">Students</span></div>

                    <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">All Students</h1>
                    </div>

                    <div className="bg-white rounded-2xl shadow overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                                <tr>
                                    <th className="px-6 py-4 text-left">Admission No</th>
                                    <th className="px-6 py-4 text-left">Roll No</th>
                                    <th className="px-6 py-4 text-left">Name</th>
                                    <th className="px-6 py-4 text-left">Class</th>
                                    <th className="px-6 py-4 text-left">Gender</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-left">Date of Join</th>
                                    <th className="px-6 py-4 text-left">DOB</th>
                                    <th className="px-6 py-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllStudent.map((student, idx) => (
                                    <tr key={idx} className="border-t hover:bg-gray-50 transition-all">
                                        <td className="px-6 py-4">{student.admissionNumber}</td>
                                        <td className="px-6 py-4">{student.rollNumber}</td>
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            {student.photo ? (
                                                <img
                                                    src={student.photo}
                                                    alt="avatar"
                                                    className="w-9 h-9 rounded-full object-cover border border-gray-300 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                                    {getInitials(student?.userId?.name)}
                                                </div>
                                            )}
                                            <span className="font-medium">{student?.userId?.name}</span>
                                        </td>
                                        <td className="px-6 py-4">{student?.class?.Classname || "-"}</td>
                                        <td className="px-6 py-4">{student.gender}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                                                ${student.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"}`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{student.admissionDate?.slice(0, 10)}</td>
                                        <td className="px-6 py-4">{student.dateOfBirth?.slice(0, 10)}</td>
                                        <td className="px-6 py-4 flex justify-start">
                                            <button className="p-1 hover:bg-gray-100 rounded-full transition">
                                                <MoreVertical size={18} className="text-gray-500" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
