import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useAuth } from "../context/auth";
import { FaFilter } from "react-icons/fa";
import Sidebar from "./Sidebar";
import MainHeader from "../components/MainHeader";

export default function LeavRequesr() {
    const { auth } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");

    const fetchLeaves = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v2/employees/leave/all`);
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
            setFilteredLeaves(leaves.filter((l) => l.status === filterStatus));
        }
    }, [leaves, filterStatus]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const { data } = await axios.put(`https://school-management-system-1-jprf.onrender.com/api/v2/employees/leave/status/${id}`, {
                status: newStatus,
            });
            fetchLeaves()
            toast.success(`Leave ${newStatus.toLowerCase()} ✅`);
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
                                            <th className="px-4 py-3 text-left">Teacher ID</th>
                                            <th className="px-4 py-3 text-left">Image</th>
                                            <th className="px-4 py-3 text-left">Name</th>
                                            <th className="px-4 py-3 text-left">Reason</th>
                                            <th className="px-4 py-3 text-left">From</th>
                                            <th className="px-4 py-3 text-left">To</th>
                                            <th className="px-4 py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {filteredLeaves.map((leave) => (
                                            <tr key={leave._id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium text-blue-500">
                                                    {leave?.userId?.teacherId || "N/A"}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <img
                                                        src={`https://school-management-system-1-jprf.onrender.com/${leave?.userId?.userId?.profileImage}`}
                                                        alt="profile"
                                                        className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://via.placeholder.com/40";
                                                        }}
                                                    />
                                                </td>

                                                <td
                                                    className="px-4 py-3 capitalize"
                                                    title={leave?.userId?.userId?.name}
                                                >
                                                    {leave?.userId?.userId?.name?.split(" ")[0] || "Unknown"}
                                                </td>

                                                <td className="px-4 py-3 capitalize">{leave.reason}</td>
                                                <td className="px-4 py-3">
                                                    {new Date(leave.fromDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {new Date(leave.toDate).toLocaleDateString()}
                                                </td>

                                                <td className="px-4 py-3 text-center">
                                                    {leave.status === "Pending" ? (
                                                        <div className="flex justify-center space-x-2">
                                                            <button
                                                                onClick={() => handleStatusUpdate(leave._id, "Approved")}
                                                                className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow transition"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(leave._id, "Rejected")}
                                                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow transition"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${leave.status === "Approved"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                            }`}>
                                                            {leave.status}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-10 text-center">No leave applications yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
