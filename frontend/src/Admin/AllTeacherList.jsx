import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { IoEye } from 'react-icons/io5';
import { FaUserGear } from 'react-icons/fa6';
import { FaUserEdit, FaUserInjured } from 'react-icons/fa';

export default function AllTeacherList() {
    const [teachers, setteachers] = useState([]);
    const nav = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const getAllTeacher = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/teachers/get`);
            setteachers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTeacher = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
        if (!confirmDelete) return;

        try {
            const { data } = await axios.delete(`https://school-management-system-1-jprf.onrender.com/api/teachers/delet/${id}`);
            toast.success(data?.message || "Teacher deleted successfully");
            getAllTeacher(); // Refresh list
        } catch (error) {
            console.error("Error deleting teacher:", error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to delete teacher");
            }
        }
    };

    useEffect(() => {
        getAllTeacher();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Teacher</div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">Teachers List</h1>
                        <NavLink
                            to={'/school/admin/add_teacher'}
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
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Phone</th>
                                    <th className="px-4 py-3">Date of Join</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 text-blue-600 font-medium hover:underline cursor-pointer">{teacher.teacherId}</td>
                                        <td className="px-4 py-3 flex items-center gap-2">
                                            {teacher?.userId?.profileImage ? (
                                                <img
                                                    src={`https://school-management-system-1-jprf.onrender.com/${teacher.userId.profileImage}`}
                                                    alt="avatar"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-300 text-white font-bold">
                                                    {teacher?.userId?.name
                                                        ?.split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()
                                                        .slice(0, 2)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{teacher?.userId?.email}</td>
                                        <td className="px-4 py-3">{teacher?.address?.phone || '984653749'}</td>
                                        <td className="px-4 py-3">{new Date(teacher.dateOfBirth).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-[1px] tracking-wider text-xs font-medium ${teacher.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {teacher.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 flex space-x-2.5">
                                            <button onClick={() => nav(`/school/admin/view_teacher/${teacher._id}`)} className="text-gray-500 hover:text-gray-700 ">
                                                <IoEye className="text-xl text-purple-500  cursor-pointer" />
                                            </button>
                                            <button onClick={() => nav(`/school/admin/edit_teacher/${teacher._id}`)} className="text-gray-500 hover:text-gray-700">
                                                <FaUserEdit className="text-xl text-green-500 cursor-pointer" />
                                            </button>

                                            <button onClick={() => deleteTeacher(teacher._id)} className="text-gray-500 hover:text-gray-700">
                                                <MdDelete className="text-xl cursor-pointer text-red-500" />
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
