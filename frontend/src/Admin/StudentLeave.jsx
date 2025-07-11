import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import MainHeader from '../components/MainHeader';
import Sidebar from './Sidebar';
import { FaFilter } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function StudentLeaveforAdmin() {
    const { auth } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");

    const fetchLeaves = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v10/student-leave/`);
            setLeaves(data);
        } catch (error) {
            console.error("Error fetching leave data", error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    useEffect(() => {
        if (filterStatus === "All") {
            setFilteredLeaves(leaves);
        } else {
            setFilteredLeaves(
                leaves.filter((leave) => leave.status?.toLowerCase() === filterStatus.toLowerCase())
            );
        }
    }, [filterStatus, leaves]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`https://school-management-system-1-jprf.onrender.com/api/v10/student-leave/${id}/status`, {
                status: newStatus,
            });
            toast.success(`Leave ${newStatus.toLowerCase()} ✅`);
            fetchLeaves(); // refresh data
        } catch (err) {
            console.error(err);
            toast.error("Status update failed ❌");
        }
    };


    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <Sidebar />
            <div className="flex-grow w-full md:ml-64">
                <MainHeader />
                <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                    <h1 className='w-full h-auto p-2 text-center mb-5 text-xl font-semibold'>Student Leave Request</h1>
                    {/* Filter Buttons */}
                    <div className="mb-4 flex flex-wrap gap-2 items-center text-sm sm:text-base">
                        <FaFilter className="text-gray-600" />
                        {["All", "Pending", "Approved", "Rejected"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-1 rounded-full font-medium transition ${filterStatus === status
                                    ? "bg-blue-600 text-white shadow"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Leave List Table */}
                    {filteredLeaves.length > 0 ? (
                        <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gradient-to-l from-blue-100 via-purple-100 to-pink-100 text-gray-800 font-bold uppercase">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Student ID</th>
                                            <th className="px-4 py-3 text-left">Image</th>
                                            <th className="px-4 py-3 text-left">Name</th>
                                            <th className="px-4 py-3 text-left">Reason</th>
                                            <th className="px-4 py-3 text-left">From</th>
                                            <th className="px-4 py-3 text-left">To</th>
                                            <th className="px-4 py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {filteredLeaves.map((leave) => {
                                            const student = leave?.student || {};
                                            const user = student?.userId || {};
                                            const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "No Name")}&background=random&size=40`;

                                            return (
                                                <tr key={leave._id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 font-medium text-blue-500">
                                                        {student?.admissionNumber || "N/A"}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <img
                                                            src={
                                                                user?.profileImage
                                                                    ? `https://school-management-system-1-jprf.onrender.com/${user.profileImage}`
                                                                    : fallbackImg
                                                            }
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = fallbackImg;
                                                            }}
                                                            alt="profile"
                                                            className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 capitalize" title={user?.name || ""}>
                                                        {user?.name?.split(" ")[0] || "Unknown"}
                                                    </td>
                                                    <td className="px-4 py-3 capitalize">{leave.reason}</td>
                                                    <td className="px-4 py-3">
                                                        {new Date(leave.from).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {new Date(leave.to).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        {leave.status.toLowerCase() === "pending" ? (
                                                            <div className="flex justify-center space-x-2">
                                                                <button
                                                                    onClick={() => handleStatusUpdate(leave._id, "approved")}
                                                                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow transition"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleStatusUpdate(leave._id, "rejected")}
                                                                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow transition"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span
                                                                className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${leave.status === "approved"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                                    }`}
                                                            >
                                                                {leave.status}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-10 text-center">No leave applications found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
