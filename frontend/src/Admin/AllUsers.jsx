import React, { useEffect, useState } from 'react';
import MainHeader from '../components/MainHeader';
import Sidebar from './Sidebar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;

    const GetAllData = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v2/user/getAll`);
            setUsers(data || []);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        GetAllData();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

   const getInitials = (name = "") => {
    const words = name.trim().split(/\s+/); // split on any whitespace
    if (words.length >= 2) {
        return (
            words[0][0]?.toUpperCase() +
            words[1][0]?.toUpperCase()
        );
    } else if (words.length === 1 && words[0].length > 0) {
        return words[0].substring(0, 2).toUpperCase();
    }
    return "NA";
};


    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl mb-6 shadow-lg border-l-4 border-blue-500">
                        <h1 className="text-2xl font-bold text-gray-800">All Staff Members</h1>
                        <NavLink
                            to={'/school/admin/create_staff'}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 text-sm font-medium"
                        >
                            + Add New Staff
                        </NavLink>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                        <table className="min-w-full table-auto text-left border-collapse">
                            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-3">Profile</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user, index) => (
                                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition">
                                        <td className="px-6 py-3">
                                            {user.profileImage ? (
                                                <img
                                                    src={`https://school-management-system-1-jprf.onrender.com/${user.profileImage}`}
                                                    alt="profile"
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-sm shadow-md">
                                                    {getInitials(user?.name)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-gray-800 font-semibold">{user.name}</td>
                                        <td className="px-6 py-3 text-gray-700">{user.email}</td>
                                        <td className="px-6 py-3">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize font-medium">
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 transition"
                        >
                            Previous
                        </button>
                        <span className="text-sm font-medium text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 transition"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
