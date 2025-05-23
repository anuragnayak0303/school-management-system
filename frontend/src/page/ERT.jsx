import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import StateCitySelect from '../components/StateCity';
import toast from 'react-hot-toast';
import axios from 'axios'; // ✅ Axios import

export default function ERT() {
    const [formData, setFormData] = useState({
        studentName: '',
        fatherName: '',
        motherName: '',
        email: '',
        mobile: '+91',
        whatsapp: '+91',
        dob: '',
        schoolName: '',
        currentClass: '',
        state: '',
        city: '',
        address: '',
        pincode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:8000/api/ert/submit', formData); // ✅ Axios call

            if (data.success) {
                toast.success("Form submitted successfully!");
                setFormData({
                    studentName: '',
                    fatherName: '',
                    motherName: '',
                    email: '',
                    mobile: '+91',
                    whatsapp: '+91',
                    dob: '',
                    schoolName: '',
                    currentClass: '',
                    state: '',
                    city: '',
                    address: '',
                    pincode: ''
                });
            } else {
                toast.error(data.message || "Submission failed. Please try again.");
            }
        } catch (error) {
            console.error("Axios error:", error);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="w-full mt-0.5">
                    {/* Banner */}
                    <div className="relative w-full h-[400px]">
                        <img
                            src="https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Dundlod Public School"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-end mb-2.5 bg-[#00000049] justify-center bg-opacity-40">
                            <h1 className="text-white text-4xl md:text-6xl font-bold text-center">
                                ERT REGISTRATION FORM 2025-26
                            </h1>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="px-6 md:px-20 py-10 bg-white text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                            Dundlod Public School Presents: Excellence Recognition Test 2025
                        </h2>
                        <p className="text-gray-700 text-lg md:text-xl">
                            📖 A Golden Opportunity for Students of Classes 1st to 8th! Are you ready to unlock your potential and take a step closer to excellence?
                            <br />
                            Dundlod Public School, Soyla invites young learners to showcase their talent, compete with peers and grab the chance to be recognized and rewarded. 🏆
                        </p>
                    </div>

                    {/* Form */}
                    <form className="max-w-6xl mx-auto p-6 bg-white" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Student Name', name: 'studentName' },
                                { label: 'Father Name', name: 'fatherName' },
                                { label: 'Mother Name', name: 'motherName' },
                                { label: 'Email Address', name: 'email', type: 'email' },
                                { label: 'Mobile Number', name: 'mobile' },
                                { label: 'WhatsApp Number', name: 'whatsapp' },
                                { label: 'Date of Birth', name: 'dob', type: 'date' },
                                { label: 'Current School Name', name: 'schoolName' },
                            ].map(({ label, name, type = 'text' }) => (
                                <div key={name}>
                                    <label className="block font-medium mb-1">{label} *</label>
                                    <input className="w-full border rounded p-2" type={type} name={name} value={formData[name]} onChange={handleChange} />
                                </div>
                            ))}

                            <div>
                                <label className="block font-medium mb-1">Current Class *</label>
                                <select className="w-full border rounded p-2" name="currentClass" value={formData.currentClass} onChange={handleChange}>
                                    <option value="">Please select</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                        <option key={n} value={n}>Class {n}</option>
                                    ))}
                                </select>
                            </div>

                            {/* ✅ State and City dropdowns */}
                            <StateCitySelect fromdata={formData} setFormData={setFormData} />

                            <div>
                                <label className="block font-medium mb-1">Street Address *</label>
                                <input className="w-full border rounded p-2" type="text" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Pin Code *</label>
                                <input className="w-full border rounded p-2" type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-16 h-16 mt-3.5 rounded-md bg-purple-900 text-white">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
