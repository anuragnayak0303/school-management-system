import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function AllTeacherList() {

    const [teachers, setteachers] = useState([])

    const getAllTeacher = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/teachers/get`)
            setteachers(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTeacher()

    }, [])

    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-100">
                <MainHeader />

                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Teacher</div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">Teachers List</h1>
                        <NavLink
                            to={'/school/add_teacher'}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            Add Teacher
                        </NavLink>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-md shadow-sm">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3">Subject</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Phone</th>
                                    <th className="px-4 py-3">Date of Join</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-3 text-blue-600 font-medium hover:underline cursor-pointer">{teacher.id}</td>
                                        <td className="px-4 py-3 flex items-center gap-2">
                                            <img src={teacher.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                                            {teacher.name}
                                        </td>
                                        <td className="px-4 py-3">{teacher.class}</td>
                                        <td className="px-4 py-3">{teacher.subject}</td>
                                        <td className="px-4 py-3">{teacher.email}</td>
                                        <td className="px-4 py-3">{teacher.phone}</td>
                                        <td className="px-4 py-3">{teacher.doj}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {teacher.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button className="text-gray-500 hover:text-gray-700">
                                                ⋮
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
