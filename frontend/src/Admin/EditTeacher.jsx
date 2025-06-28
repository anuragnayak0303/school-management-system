import React, { useEffect, useRef, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';

export default function EditTeacher() {
    const { id } = useParams();
    const formRef = useRef();
    const navigate = useNavigate();

    const [teacherDetails, setTeacherDetails] = useState({});
    const [allClasses, setAllClasses] = useState([]);
    const [classSubjectData, setClassSubjectData] = useState([]);
    const [allSubjectsByClass, setAllSubjectsByClass] = useState({});

    useEffect(() => {
        fetchInitialData();
    }, [id]);

    const fetchInitialData = async () => {
        await Promise.all([loadClasses(), loadTeacherData()]);
    };

    const loadClasses = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/v2/class/all');
            setAllClasses(data);
        } catch {
            toast.error('Error fetching classes');
        }
    };

    const loadTeacherData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/teachers/getSingle/${id}`);
            setTeacherDetails(data);

            const grouped = (data.subject || []).reduce((acc, subj) => {
                acc[subj.classId] = acc[subj.classId] || [];
                acc[subj.classId].push(subj._id);
                return acc;
            }, {});

            setClassSubjectData(Object.entries(grouped).map(([classId, subjects]) => ({
                classId, subjects
            })));

            const subjectRequests = Object.keys(grouped).map(classId =>
                axios.get(`http://localhost:8000/api/v2/subject/ClassId/${classId}`)
                    .then(res => ({ classId, subjects: res.data }))
            );
            const results = await Promise.all(subjectRequests);

            const sbc = results.reduce((acc, r) => {
                acc[r.classId] = r.subjects;
                return acc;
            }, {});
            setAllSubjectsByClass(sbc);

        } catch {
            toast.error('Failed to load teacher details');
        }
    };

    const handleClassChange = async e => {
        const classId = e.target.value;
        if (!classId || classSubjectData.some(c => c.classId === classId)) return;

        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/subject/ClassId/${classId}`);
            setAllSubjectsByClass(prev => ({ ...prev, [classId]: data }));
            setClassSubjectData(prev => [...prev, { classId, subjects: [] }]);
        } catch {
            toast.error('Failed to load subjects');
        }
    };

    const handleSubjectChange = (classId, subjectId, checked) => {
        setClassSubjectData(prev =>
            prev.map(c =>
                c.classId === classId
                    ? { ...c, subjects: checked ? [...c.subjects, subjectId] : c.subjects.filter(sid => sid !== subjectId) }
                    : c
            )
        );
    };

    const removeClass = classId => {
        setClassSubjectData(prev => prev.filter(c => c.classId !== classId));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append('classes', JSON.stringify(classSubjectData));

        ['accountName', 'accountNumber', 'bankName', 'ifscCode', 'branchName'].forEach(field => {
            const val = formRef.current[field]?.value;
            if (val) formData.append(`bankDetails[${field}]`, val);
        });

        try {
            const res = await axios.put(`http://localhost:8000/api/teachers/edit/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status === 200) {
                toast.success('Teacher updated successfully!');
                setTimeout(() => navigate('/school/admin/all_teacher'), 1500);
            } else {
                toast.error('Update failed.');
            }
        } catch {
            toast.error('Failed to update teacher.');
        }
    };
    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Edit Teacher</div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl mb-6 shadow-lg border-l-4 border-blue-500">
                        <h1 className="text-xl font-bold text-gray-800">Edit Teacher</h1>
                        <NavLink to={'/school/admin/all_teacher'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                            All Teachers
                        </NavLink>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {/* Personal Details */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="text-xl bg-indigo-200 p-4 font-bold">Personal Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pt-6 pb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Photo</label>
                                    <input name="photo" type="file" accept="image/*" className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-md focus:outline-0" />
                                </div>
                                {[
                                    { name: "teacherId", label: "Teacher ID", type: "text", maxLength: 13, defaultValue: teacherDetails.teacherId },
                                    { name: "firstName", label: "First Name", type: "text", defaultValue: teacherDetails?.userId?.name?.split(" ")[0] || '' },
                                    { name: "lastName", label: "Last Name", type: "text", defaultValue: teacherDetails?.userId?.name?.split(" ")[1] || "" },
                                    { name: "primaryContact", label: "Primary Contact", type: "tel", maxLength: 10, defaultValue: teacherDetails?.address?.phone },
                                    { name: "email", label: "Email", type: "email", defaultValue: teacherDetails?.userId?.email },
                                    { name: "dateOfJoining", label: "Date Of Joining", type: "date", defaultValue: teacherDetails.dateOfJoining?.split("T")[0] },
                                    { name: "fatherName", label: "Father Name", type: "text", defaultValue: teacherDetails.fatherName },
                                    { name: "motherName", label: "Mother Name", type: "text", defaultValue: teacherDetails.motherName },
                                    { name: "dateOfBirth", label: "Date Of Birth", type: "date", defaultValue: teacherDetails.dateOfBirth?.split("T")[0] },
                                    { name: "qualification", label: "Qualification", type: "text", defaultValue: teacherDetails.qualification },
                                    { name: "workExperience", label: "Work Experience (Years)", type: "number", defaultValue: teacherDetails.workExperience },
                                    { name: "address", label: "Address", type: "text", defaultValue: teacherDetails?.address?.address },
                                    { name: "panOrIdNumber", label: "PAN or ID Number", type: "text", defaultValue: teacherDetails.panOrIdNumber },
                                    { name: "salary", label: "Basic salary", type: "number", defaultValue: teacherDetails.salary },
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            maxLength={field.maxLength}
                                            defaultValue={field.defaultValue}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-md focus:outline-0"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class & Subject Details */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="text-xl bg-indigo-200 p-4 font-bold rounded">
                                Class & Subject Details
                            </h2>
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="text-sm font-medium block mb-1">Add Class</label>
                                    <select onChange={handleClassChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">-- Select a class --</option>
                                        {allClasses.map(c => (
                                            <option key={c._id} value={c._id}>
                                                {classSubjectData.some(x => x.classId === c._id) ? '✓ ' : ''}{c.Classname}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {classSubjectData.map((cls, idx) => {
                                    const subjects = allSubjectsByClass[cls.classId] || [];
                                    return (
                                        <div key={idx} className="relative bg-white shadow-xl rounded-lg border-2 border-indigo-300 p-6">
                                            <h3 className="absolute -top-4 left-4 bg-indigo-600 text-white px-4 py-1 rounded-md shadow text-sm font-semibold">
                                                Class {allClasses.find(c => c._id === cls.classId)?.Classname}
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => removeClass(cls.classId)}
                                                className="absolute top-2 right-3 text-red-500 text-sm hover:underline"
                                            >
                                                Remove
                                            </button>
                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                {subjects.map(s => {
                                                    const assigned = s.define_teacher;
                                                    const isCurrent = assigned === id;
                                                    const disabled = assigned && !isCurrent;
                                                    const checked = cls.subjects.includes(s._id);

                                                    return (
                                                        <label
                                                            key={s._id}
                                                            className={`flex items-center space-x-2 text-sm border px-3 py-2 rounded-md shadow-sm ${disabled ? 'bg-red-50 border-red-300 text-red-600' : 'bg-blue-50 border-blue-300'
                                                                }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                disabled={disabled}
                                                                checked={checked}
                                                                onChange={() => {
                                                                    if (disabled) toast.error('Subject already assigned to another teacher');
                                                                    else handleSubjectChange(cls.classId, s._id, !checked);
                                                                }}
                                                            />
                                                            <span className={disabled ? 'line-through' : ''}>{s.subjectName}</span>
                                                            {isCurrent && <span className="text-green-600 text-xs ml-auto">✔️ Yours</span>}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Gender, Status, Blood */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="bg-indigo-200 rounded px-4 py-2 font-semibold text-blue-800">Gander and Some Other Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
                                {[
                                    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
                                    { name: "maritalStatus", label: "Marital Status", type: "text" },
                                    { name: "bloodGroup", label: "Blood Group", type: "text" },
                                    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        {field.type === "select" ? (
                                            <select
                                                name={field.name}
                                                defaultValue={teacherDetails?.[field.name] || ""}
                                                className="w-full border rounded px-3 py-2"
                                            >
                                                <option value={field.name == "gender" ? teacherDetails?.gender : field.name == "status" ? teacherDetails?.status : ''}>{field.name == "gender" ? teacherDetails?.gender : field.name == "status" ? teacherDetails?.status : `select ${field.label}`}</option>
                                                {field.options.map(opt => (
                                                    <option key={opt} value={opt} className={`${(opt == teacherDetails?.gender || opt == teacherDetails?.status) && ' hidden '}`}>{opt}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                name={field.name}
                                                type="text"
                                                defaultValue={teacherDetails?.[field.name] || ""}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="bg-white rounded border border-gray-300 shadow-md">
                            <h2 className="bg-indigo-200 rounded px-4 py-2 font-semibold text-blue-800">Bank Details</h2>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: "accountName", label: "Account Holder Name", defaultValue: teacherDetails.bankDetails?.accountName },
                                    { name: "accountNumber", label: "Account Number", defaultValue: teacherDetails.bankDetails?.accountNumber },
                                    { name: "bankName", label: "Bank Name", defaultValue: teacherDetails.bankDetails?.bankName },
                                    { name: "ifscCode", label: "IFSC Code", defaultValue: teacherDetails.bankDetails?.ifscCode },
                                    { name: "branchName", label: "Branch Name", defaultValue: teacherDetails.bankDetails?.branchName },
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type="text"
                                            defaultValue={field.defaultValue || ""}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                                Update Teacher
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
