import React, { useState } from 'react'
import MainHeader from '../components/MainHeader'
import Sidebar from './Sidebar'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

export default function CreateStaff() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('https://school-management-system-1-jprf.onrender.com/api/v2/user/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "Staff"
            });

            toast.success("User created successfully!");
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-0 md:ml-64 w-full min-h-screen bg-gray-50">
                <MainHeader />
                <Toaster />
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-md">
                        <h1 className="text-xl font-bold text-gray-800">Add Staff</h1>
                        <NavLink
                            to={'/school/admin/all_users'}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            All Staff
                        </NavLink>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-[1.02] hover:shadow-3xl duration-500 max-w-xl mx-auto animate-fadeIn">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner transition-transform duration-300 hover:-translate-y-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner transition-transform duration-300 hover:-translate-y-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner transition-transform duration-300 hover:-translate-y-1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner transition-transform duration-300 hover:-translate-y-1"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
