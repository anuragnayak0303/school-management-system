import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";


import { useAuth } from "../context/auth";
import { FaTrashAlt, FaFilter } from "react-icons/fa";
import Sidebar from "./Sidebar";
import MainHeader from "../components/MainHeader";

export default function LeavRequesr() {
    const { auth } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [teacher, setTeacher] = useState({});
    const [filterStatus, setFilterStatus] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        reason: "",
        fromDate: "",
        toDate: "",
    });

   

    const fetchLeaves = async (teacherId) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/employees/leave/all`);
            setLeaves(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching leave data", error);
        }
    };

    useEffect(() => {
      fetchLeaves()
    }, []);

    useEffect(() => {
        if (filterStatus === "All") {
            setFilteredLeaves(leaves);
        } else {
            setFilteredLeaves(leaves.filter((l) => l.status === filterStatus));
        }
    }, [leaves, filterStatus]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.reason || !form.fromDate || !form.toDate) {
            return toast.error("Please fill in all fields.");
        }

        try {
            const { data } = await axios.post("http://localhost:8000/api/v2/employees/leave/apply", {
                reason: form.reason,
                fromDate: form.fromDate,
                toDate: form.toDate,
                userId: teacher._id,
            });
            setLeaves([...leaves, data.leave]);
            toast.success("Leave Request Sent ✅");
            setForm({ reason: "", fromDate: "", toDate: "" });
            setShowForm(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to send leave request ❌");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this leave request?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8000/api/v2/employees/leave/delete/${id}`);
            setLeaves(leaves.filter((leave) => leave._id !== id));
            toast.success("Leave deleted successfully ✅");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete leave ❌");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
           <Sidebar/>
            <div className="flex-grow w-full md:ml-64">
                <MainHeader/>
                <div className="p-4 sm:p-6 max-w-6xl mx-auto">
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
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Reason</th>
                                            <th className="px-4 py-3 text-left">From</th>
                                            <th className="px-4 py-3 text-left">To</th>
                                            <th className="px-4 py-3 text-left">Status</th>
                                            <th className="px-4 py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {filteredLeaves.map((leave, index) => (
                                            <tr key={leave._id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">{index + 1}</td>
                                                <td className="px-4 py-3 capitalize">{leave.reason}</td>
                                                <td className="px-4 py-3">{new Date(leave.fromDate).toLocaleDateString()}</td>
                                                <td className="px-4 py-3">{new Date(leave.toDate).toLocaleDateString()}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${leave.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : leave.status === "Approved"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                        }`}>
                                                        {leave.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => handleDelete(leave._id)}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Delete Leave"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
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
