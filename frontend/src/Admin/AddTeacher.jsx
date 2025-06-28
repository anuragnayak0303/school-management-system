import React, { useRef, useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function AddTeacher() {
    const formRef = useRef();
    const [allClasses, setAllClasses] = useState([]);
    const [classSubjectData, setClassSubjectData] = useState([]);
    const [allSubjectsByClass, setAllSubjectsByClass] = useState({});
    const [loadingSubjects, setLoadingSubjects] = useState(false); // <-- loading state

    const getClasses = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v2/class/all");
            setAllClasses(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClassChange = async (e) => {
        const selectedClassId = e.target.value;
        if (!selectedClassId || classSubjectData.find(data => data.classId === selectedClassId)) return;

        setLoadingSubjects(true); // start loading

        try {
            const { data: subjects } = await axios.get(`http://localhost:8000/api/v2/subject/ClassId/${selectedClassId}`);
            const modifiedSubjects = subjects.map(subject => ({
                ...subject,
                hasTeacher: Boolean(subject.define_teacher)
            }));

            setAllSubjectsByClass(prev => ({ ...prev, [selectedClassId]: modifiedSubjects }));
            setClassSubjectData(prev => [...prev, { classId: selectedClassId, subjects: [] }]);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            toast.error("Failed to load subjects");
        } finally {
            setLoadingSubjects(false); // stop loading
        }
    };

    const handleSubjectChange = (classId, subjectId, isChecked) => {
        setClassSubjectData(prev => prev.map(entry =>
            entry.classId === classId
                ? {
                    ...entry,
                    subjects: isChecked
                        ? [...entry.subjects, subjectId]
                        : entry.subjects.filter(id => id !== subjectId)
                }
                : entry
        ));
    };

    const removeClass = (classIdToRemove) => {
        setClassSubjectData(prev => prev.filter(entry => entry.classId !== classIdToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const formData = new FormData(form);

        classSubjectData.forEach((entry, i) => {
            formData.append(`classes[${i}][classId]`, entry.classId);
            entry.subjects.forEach((subjectId, j) => {
                formData.append(`classes[${i}][subjects][${j}]`, subjectId);
            });
        });

        try {
            const res = await axios.post('http://localhost:8000/api/teachers/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200 || res.status === 201) {
                toast.success("✅ Teacher added successfully!");
                form.reset();
                setClassSubjectData([]);
                setAllSubjectsByClass({});
            } else {
                toast.error("⚠️ Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("❌ Failed to add teacher.");
        }
    };

    useEffect(() => {
        getClasses();
    }, []);

    const commonInputClass = "w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-md focus:outline-0";

    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
                <MainHeader />

                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Teacher</div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl mb-6 shadow-lg border-l-4 border-blue-500">
                        <h1 className="text-xl font-bold text-gray-800">Add New Teacher</h1>
                        <NavLink
                            to={'/school/admin/all_teacher'}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            All Teachers
                        </NavLink>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                        {/* Personal Details */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="text-xl bg-indigo-200 p-4 font-bold">Personal Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pt-7 pb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Photo</label>
                                    <input
                                        name="photo"
                                        type="file"
                                        accept="image/*"
                                        className={commonInputClass}
                                    />
                                </div>
                                {[
                                    { name: "teacherId", label: "Teacher ID", type: "text", maxLength: 10 },
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
                                    { name: "salary", label: "Basic Salary", type: "number" },
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            maxLength={field.maxLength}
                                            className={commonInputClass}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class & Subject Details */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="text-xl bg-indigo-200 p-4 font-bold rounded">Classes & Subjects</h2>
                            <div className="p-6 space-y-4">
                                <select onChange={handleClassChange} className={`${commonInputClass} max-w-xs`}>
                                    <option value="">Select Class to Add</option>
                                    {allClasses.map(cls => (
                                        <option key={cls._id} value={cls._id}>Class {cls.Classname}</option>
                                    ))}
                                </select>

                                {/* Loading Indicator */}
                                {loadingSubjects && (
                                    <div className="flex space-x-2 justify-center items-center h-16">
                                        {[0, 1, 2].map((i) => (
                                            <div
                                                key={i}
                                                className={`w-6 h-6 rounded-sm 
            ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-green-500' : 'bg-blue-500'}
            animate-bounce-delay-${i}`}
                                                style={{ animationDelay: `${i * 0.2}s` }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {!loadingSubjects && classSubjectData.map(({ classId, subjects }) => {
                                    const className = allClasses.find(c => c._id === classId)?.Classname || classId;
                                    const subjectsList = allSubjectsByClass[classId] || [];

                                    return (
                                        <div
                                            key={classId}
                                            className="relative bg-white shadow-xl rounded-lg border-2 border-indigo-300 p-6"
                                        >
                                            {/* Class Header */}
                                            <div className="absolute -top-4 left-4 bg-indigo-600 text-white px-4 py-1 rounded-md shadow text-sm font-semibold">
                                                Class: {className}
                                            </div>

                                            {/* Remove Button */}
                                            <div className="absolute top-2 right-3">
                                                <button
                                                    type="button"
                                                    onClick={() => removeClass(classId)}
                                                    className="text-red-600 font-semibold hover:underline text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            {/* Subject List */}
                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                {subjectsList.map(subject => (
                                                    console.log(subject),
                                                    <label
                                                        key={subject._id}
                                                        className={`flex items-center space-x-2 text-sm border px-3 py-2 rounded-md shadow-sm ${subject.hasTeacher
                                                            ? "bg-red-50 border-red-300 text-red-600"
                                                            : "bg-blue-50 border-blue-300"
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            disabled={subject.hasTeacher}
                                                            checked={subjects.includes(subject._id)}
                                                            onChange={e => {
                                                                if (subject.hasTeacher) {
                                                                    toast.error("❌ This subject already has a teacher.");
                                                                    return;
                                                                }
                                                                handleSubjectChange(classId, subject._id, e.target.checked);
                                                            }}
                                                        />
                                                        <span className={subject.hasTeacher ? "line-through font-semibold" : "font-medium"}>
                                                            {subject.subjectName}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Gender and Status */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="bg-indigo-200 rounded px-4 py-2 font-semibold text-blue-800">Gander and Some Other Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Gender</label>
                                    <select name="gender" className={commonInputClass}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Marital Status</label>
                                    <input name="maritalStatus" className={commonInputClass} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Blood Group</label>
                                    <input name="bloodGroup" className={commonInputClass} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <select name="status" className={commonInputClass}>
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="bg-indigo-200 rounded px-4 py-2 font-semibold text-blue-800">Bank Account Detail</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
                                {[
                                    { label: "Account Name", name: "accountName" },
                                    { label: "Account Number", name: "accountNumber" },
                                    { label: "Bank Name", name: "bankName" },
                                    { label: "IFSC Code", name: "ifscCode" },
                                    { label: "Branch Name", name: "branchName" }
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type="text"
                                            className={commonInputClass}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                            >
                                Save Teacher
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* Loader styles */}
            <style>{`
                .loading-square {
                    width: 50px;
                    height: 50px;
                    background-color: #4f46e5; /* Indigo-600 */
                    border-radius: 8px;
                    animation: bounceUpDown 1s ease-in-out infinite;
                }
                @keyframes bounceUpDown {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }
            `}</style>
        </div>
    );
}
