import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TeacherSideBar from "./TeacherSideBar";
import MainHeader from "../components/MainHeader";
import { useAuth } from "../context/auth";
import { FaTrashAlt, FaFilter } from "react-icons/fa";

export default function LeaveApplication() {
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

    const fetchDetails = async () => {
        try {
            const { data } = await axios.get(
                `https://school-management-system-1-jprf.onrender.com/api/teachers/TeacherData/${auth?.user?.id}`
            );
            setTeacher(data);
        } catch (error) {
            console.error("Error fetching teacher details", error);
        }
    };

    const fetchLeaves = async (teacherId) => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v2/employees/leave/my/${teacherId}`);
            setLeaves(data);
        } catch (error) {
            console.error("Error fetching leave data", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if (teacher?._id) {
            fetchLeaves(teacher._id);
        }
    }, [teacher]);

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
            const { data } = await axios.post("https://school-management-system-1-jprf.onrender.com/api/v2/employees/leave/apply", {
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
            await axios.delete(`https://school-management-system-1-jprf.onrender.com/api/v2/employees/leave/delete/${id}`);
            setLeaves(leaves.filter((leave) => leave._id !== id));
            toast.success("Leave deleted successfully ✅");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete leave ❌");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            <TeacherSideBar />
            <div className="flex-grow w-full md:ml-64">
                <MainHeader />
                <div className="p-6 max-w-6xl mx-auto  mt-6">

                    {/* Toggle Form Button */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition duration-300"
                        >
                            {showForm ? "Cancel" : "➕ Send Leave Request"}
                        </button>
                    </div>

                    {/* Leave Form */}
                    {showForm && (
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-300 mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">📝 Apply for Leave</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {["reason", "fromDate", "toDate"].map((field, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-center gap-4">
                                        <label className="text-gray-700 w-full sm:w-32 capitalize font-medium">
                                            {field === "reason" ? "Reason" : field === "fromDate" ? "From Date" : "To Date"}
                                        </label>
                                        <input
                                            type={field === "reason" ? "text" : "date"}
                                            name={field}
                                            value={form[field]}
                                            onChange={handleChange}
                                            className="flex-grow border border-gray-300 px-4 py-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 transform hover:scale-[1.02]"
                                            required
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform duration-200"
                                    >
                                        Submit 📤
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Filter Buttons */}
                    <div className="mb-6 bg-gray-50 p-4 border border-gray-300 shadow-md rounded-sm flex flex-wrap gap-2 items-center text-sm sm:text-base">
                        <FaFilter className="text-gray-600" />
                        {["All", "Pending", "Approved", "Rejected"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-1 rounded-full shadow-md active:shadow-sm font-medium transition ${
                                    filterStatus === status
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Leave Table */}
                    {filteredLeaves.length > 0 ? (
                        <div className="bg-white rounded-sm border border-gray-300 shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-gray-700">
                                    <thead className="bg-gray-100 text-gray-700 font-semibold uppercase">
                                        <tr>
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Reason</th>
                                            <th className="px-4 py-3 text-left">From</th>
                                            <th className="px-4 py-3 text-left">To</th>
                                            <th className="px-4 py-3 text-left">Status</th>
                                            <th className="px-4 py-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredLeaves.map((leave, index) => (
                                            <tr key={leave._id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-3 font-semibold">{index + 1}</td>
                                                <td className="px-4 py-3 capitalize">{leave.reason}</td>
                                                <td className="px-4 py-3">{new Date(leave.fromDate).toLocaleDateString()}</td>
                                                <td className="px-4 py-3">{new Date(leave.toDate).toLocaleDateString()}</td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`px-3 py-1 text-xs font-bold rounded-full ${
                                                            leave.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : leave.status === "Approved"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {leave.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button
                                                        onClick={() => handleDelete(leave._id)}
                                                        className="text-red-500 hover:text-red-700 transition"
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
