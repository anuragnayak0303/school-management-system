import React, { useRef, useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function AddTeacher() {
    const formRef = useRef();
    const [allClasses, setAllClasses] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [classId, setClassId] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const getSubjects = async (selectedClassId) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/subject/ClassId/${selectedClassId}`);
            setAllSubjects(data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const formData = new FormData(form);

        // Add selected subjects manually to FormData
        selectedSubjects.forEach((subjectId, index) => {
            formData.append(`subjects[${index}]`, subjectId);
        });

        try {
            const res = await axios.post('http://localhost:8000/api/teachers/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200 || res.status === 201) {
                toast.success("✅ Teacher added successfully!");

                // Reset form fields
                form.reset();
                setClassId("");
                setSelectedSubjects([]);
                setAllSubjects([]);
            } else {
                toast.error("⚠️ Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("❌ Failed to add teacher.");
        }
    };


    const getClasses = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v2/class/all");
            setAllClasses(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getClasses();
    }, []);

    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-100">
                <MainHeader />

                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Teacher</div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">Add New Teacher</h1>
                        <NavLink
                            to={'/school/all_teacher'}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            All Classes
                        </NavLink>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Details */}
                        <div className="bg-white rounded-lg shadow-md">
                            <h2 className="text-xl bg-indigo-200 p-4 font-bold rounded-t-lg">Personal Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Photo</label>
                                    <input
                                        name="photo"
                                        type="file"
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>

                                {[
                                    { name: "teacherId", label: "Teacher ID", type: "text" },
                                    { name: "firstName", label: "First Name", type: "text" },
                                    { name: "lastName", label: "Last Name", type: "text" },
                                    { name: "primaryContact", label: "Primary Contact", type: "tel", maxLength: 10 },
                                    { name: "email", label: "Email", type: "email" },
                                    { name: "dateOfJoining", label: "Date Of Joining", type: "date" },
                                    { name: "fatherName", label: "Father Name", type: "text" },
                                    { name: "motherName", label: "Mother Name", type: "text" },
                                    { name: "dateOfBirth", label: "Date Of Birth", type: "date" },
                                    { name: "qualification", label: "Qualification", type: "text" },
                                    { name: "workExperience", label: "Work Experience (Years)", type: "number" },
                                    { name: "address", label: "Address", type: "text" },
                                    { name: "panOrIdNumber", label: "PAN or ID Number", type: "text" },
                                    { name: "salary", label: "Basic salary", type: "number" },
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            maxLength={field.maxLength}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Class & Subject Details */}
                        <div className="bg-white rounded-xl shadow-md">
                            <h2 className="bg-indigo-200 rounded-t-xl px-4 py-2 font-semibold text-blue-800">Class & Subject Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Class</label>
                                    <select
                                        value={classId}
                                        onChange={(e) => {
                                            const selectedId = e.target.value;
                                            setClassId(selectedId);
                                            getSubjects(selectedId);
                                            setSelectedSubjects([]);
                                        }}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="">Select Class</option>
                                        {allClasses.map((cls) => (
                                            <option key={cls._id} value={cls._id}>{cls.Classname}</option>
                                        ))}
                                    </select>
                                    {/* ✅ Hidden input to include classId in formData */}
                                    <input type="hidden" name="classId" value={classId} />
                                </div>


                                {/* Subjects Checkboxes */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Subjects</label>
                                    <div className="border border-gray-300 rounded-md px-3 py-2 max-h-40 overflow-y-auto">
                                        {allSubjects.length === 0 && (
                                            <p className="text-gray-500 text-sm">No subjects available</p>
                                        )}
                                        {allSubjects.map((subj) => (
                                            <div key={subj._id} className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id={`subject-${subj._id}`}
                                                    name="subject"
                                                    value={subj._id}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        setSelectedSubjects((prev) =>
                                                            checked
                                                                ? [...prev, subj._id]
                                                                : prev.filter(id => id !== subj._id)
                                                        );
                                                    }}
                                                    checked={selectedSubjects.includes(subj._id)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`subject-${subj._id}`} className="text-sm">{subj.subjectName}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select name="gender" className="w-full border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Marital Status</label>
                                    <input name="maritalStatus" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Blood Group</label>
                                    <input name="bloodGroup" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <select name="status" className="w-full border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="bg-white rounded-xl shadow-md">
                            <h2 className="bg-indigo-200 rounded-t-xl px-4 py-2 font-semibold text-blue-800">Bank Account Detail</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
                                {[{ label: "Account Name", name: "accountName" },
                                { label: "Account Number", name: "accountNumber" },
                                { label: "Bank Name", name: "bankName" },
                                { label: "IFSC Code", name: "ifscCode" },
                                { label: "Branch Name", name: "branchName" }].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="text-right">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                            >
                                Save Teacher
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
