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
    const [loadingSubjects, setLoadingSubjects] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // 🔄 Spinner flag

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

        setLoadingSubjects(true);
        try {
            const { data: subjects } = await axios.get(`http://localhost:8000/api/v2/subject/ClassId/${selectedClassId}`);
            const modifiedSubjects = subjects.map(subject => ({
                ...subject,
                hasTeacher: Boolean(subject.define_teacher)
            }));

            setAllSubjectsByClass(prev => ({ ...prev, [selectedClassId]: modifiedSubjects }));
            setClassSubjectData(prev => [...prev, { classId: selectedClassId, subjects: [] }]);
        } catch (error) {
            toast.error("Failed to load subjects");
        } finally {
            setLoadingSubjects(false);
        }
    };

    const handleSubjectChange = (classId, subjectId, isChecked) => {
        setClassSubjectData(prev =>
            prev.map(entry =>
                entry.classId === classId
                    ? {
                        ...entry,
                        subjects: isChecked
                            ? [...entry.subjects, subjectId]
                            : entry.subjects.filter(id => id !== subjectId)
                    }
                    : entry
            )
        );
    };

    const removeClass = (classIdToRemove) => {
        setClassSubjectData(prev => prev.filter(entry => entry.classId !== classIdToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
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
                toast.error("⚠️ Something went wrong.");
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "❌ Failed to add teacher.");
        } finally {
            setIsSubmitting(false);
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
                        <NavLink to={'/school/admin/all_teacher'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
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
                                    <input name="photo" type="file" accept="image/*" className={commonInputClass} />
                                </div>
                                {[
                                    { name: "teacherId", label: "Teacher ID" },
                                    { name: "firstName", label: "First Name" },
                                    { name: "lastName", label: "Last Name" },
                                    { name: "primaryContact", label: "Primary Contact" },
                                    { name: "email", label: "Email", type: "email" },
                                    { name: "dateOfJoining", label: "Date Of Joining", type: "date" },
                                    { name: "fatherName", label: "Father Name" },
                                    { name: "motherName", label: "Mother Name" },
                                    { name: "dateOfBirth", label: "Date Of Birth", type: "date" },
                                    { name: "qualification", label: "Qualification" },
                                    { name: "workExperience", label: "Work Experience", type: "number" },
                                    { name: "address", label: "Address" },
                                    { name: "panOrIdNumber", label: "PAN or ID Number" },
                                    { name: "salary", label: "Basic Salary", type: "number" },
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type || "text"}
                                            className={commonInputClass}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class & Subject */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="text-xl bg-indigo-200 p-4 font-bold">Classes & Subjects</h2>
                            <div className="p-6 space-y-4">
                                <select onChange={handleClassChange} className={`${commonInputClass} max-w-xs`}>
                                    <option value="">Select Class to Add</option>
                                    {allClasses.map(cls => (
                                        <option key={cls._id} value={cls._id}>Class {cls.Classname}</option>
                                    ))}
                                </select>

                                {loadingSubjects && (
                                    <div className="text-center text-sm text-gray-500">Loading subjects...</div>
                                )}

                                {!loadingSubjects && classSubjectData.map(({ classId, subjects }) => {
                                    const className = allClasses.find(c => c._id === classId)?.Classname || classId;
                                    const subjectsList = allSubjectsByClass[classId] || [];

                                    return (
                                        <div key={classId} className="relative bg-white border-2 border-indigo-300 rounded-lg p-6 shadow-md">
                                            <div className="absolute -top-4 left-4 bg-indigo-600 text-white px-4 py-1 rounded-md shadow text-sm font-semibold">
                                                Class: {className}
                                            </div>
                                            <div className="absolute top-2 right-3">
                                                <button type="button" onClick={() => removeClass(classId)} className="text-red-600 font-semibold hover:underline text-sm">
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                {subjectsList.map(subject => (
                                                    <label key={subject._id} className={`flex items-center space-x-2 text-sm border px-3 py-2 rounded-md shadow-sm ${subject.hasTeacher ? "bg-red-50 border-red-300 text-red-600" : "bg-blue-50 border-blue-300"}`}>
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

                        {/* Gender & Status */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="bg-indigo-200 px-4 py-2 font-semibold text-blue-800 rounded">Gender and Other Info</h2>
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

                        {/* Bank Info */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="bg-indigo-200 px-4 py-2 font-semibold text-blue-800 rounded">Bank Account Details</h2>
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
                                        <input name={field.name} type="text" className={commonInputClass} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                className={`bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                                    }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting && (
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5-5-5-5v4a12 12 0 00-12 12h4z"></path>
                                    </svg>
                                )}
                                {isSubmitting ? "Saving..." : "Save Teacher"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
