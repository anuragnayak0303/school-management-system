import React, { useEffect, useRef, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';

export default function EditTeacher() {
    const { id } = useParams();
    const formRef = useRef();
    const [teacherDetails, setTeacherDetails] = useState({});
    const [allClasses, setAllClasses] = useState([]);
    const [classSubjectData, setClassSubjectData] = useState([]);
    const [allSubjectsByClass, setAllSubjectsByClass] = useState({});
    const nav = useNavigate()
    useEffect(() => {
        fetchInitialData();
    }, [id]);

    const fetchInitialData = async () => {
        await Promise.all([getClasses(), getSingleData()]);
    };

    const getClasses = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/v2/class/all");
            setAllClasses(data);
        } catch {
            toast.error("Error fetching classes");
        }
    };

    const getSingleData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/teachers/getSingle/${id}`);
            setTeacherDetails(data);

            const grouped = data.subject?.reduce((acc, subj) => {
                acc[subj.classId] = acc[subj.classId] || [];
                acc[subj.classId].push(subj._id);
                return acc;
            }, {});

            const classData = Object.entries(grouped || {}).map(([classId, subjects]) => ({
                classId,
                subjects
            }));

            setClassSubjectData(classData);

            const allSubjects = await Promise.all(
                Object.keys(grouped || {}).map(classId =>
                    axios.get(`http://localhost:8000/api/v2/subject/ClassId/${classId}`)
                        .then(res => ({ classId, subjects: res.data }))
                )
            );

            const subjectsByClass = allSubjects.reduce((acc, item) => {
                acc[item.classId] = item.subjects;
                return acc;
            }, {});

            setAllSubjectsByClass(subjectsByClass);
        } catch {
            toast.error("Failed to load teacher details");
        }
    };

    const handleClassChange = async (e) => {
        const selectedId = e.target.value;
        if (!selectedId || classSubjectData.some(cls => cls.classId === selectedId)) return;

        try {
            const { data } = await axios.get(`http://localhost:8000/api/v2/subject/ClassId/${selectedId}`);
            setAllSubjectsByClass(prev => ({ ...prev, [selectedId]: data }));
            setClassSubjectData(prev => [...prev, { classId: selectedId, subjects: [] }]);
        } catch {
            toast.error("Failed to load subjects");
        }
    };

    const handleSubjectChange = (classId, subjectId, checked) => {
        setClassSubjectData(prev =>
            prev.map(cls =>
                cls.classId === classId
                    ? {
                        ...cls,
                        subjects: checked
                            ? [...cls.subjects, subjectId]
                            : cls.subjects.filter(id => id !== subjectId)
                    }
                    : cls
            )
        );
    };

    const removeClass = (classId) => {
        setClassSubjectData(prev => prev.filter(cls => cls.classId !== classId));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const formData = new FormData(form);

        formData.append('classes', JSON.stringify(classSubjectData));

        const bankFields = ["accountName", "accountNumber", "bankName", "ifscCode", "branchName"];
        bankFields.forEach(field => {
            const value = form[field]?.value;
            if (value) {
                formData.append(`bankDetails[${field}]`, value);
            }
        });

        try {
            const res = await axios.put(`http://localhost:8000/api/teachers/edit/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200) {
                toast.success("Teacher updated successfully!");
                setTimeout(() => {
                    nav('/school/admin/all_teacher')
                }, 2000);
            } else {
                toast.error("⚠️ Update failed.");
            }
        } catch (e) {
            console.error(e);
            toast.error("❌ Failed to update teacher.");
        }
    };
    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-100">
                <MainHeader />
                <div className="p-4 sm:p-6">
                    <div className="text-sm text-gray-500 mb-2">Admin &gt; Edit Teacher</div>
                    <div className="flex justify-between items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">Edit Teacher</h1>
                        <NavLink to={'/school/admin/all_teacher'} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                            All Teachers
                        </NavLink>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        {/* Personal Details */}
                        <div className="bg-white rounded-lg shadow-md">
                            <h2 className="text-xl bg-indigo-200 p-4 font-bold rounded-t-lg">Personal Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Upload Photo</label>
                                    <input name="photo" type="file" accept="image/*" className="block w-full text-sm text-gray-700" />
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
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Class & Subject Details */}
                        <div className="bg-white rounded-xl shadow-md">
                            <h2 className="bg-indigo-200 rounded-t-xl px-4 py-2 font-semibold text-blue-800">Class & Subject Details</h2>
                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Add Class</label>
                                    <select onChange={handleClassChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                                        <option value="">-- Select a class --</option>
                                        {allClasses.map(cls => (
                                            <option key={cls._id} value={cls._id}>
                                                {classSubjectData.some(c => c.classId === cls._id) ? "✓ " : ""}
                                                {cls.Classname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {classSubjectData.map((cls, idx) => (
                                    <div key={idx} className="bg-gray-100 rounded p-4 mb-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-semibold text-blue-600">
                                                Class: {allClasses.find(c => c._id === cls.classId)?.Classname || cls.classId}
                                            </h3>
                                            <button type="button" onClick={() => removeClass(cls.classId)} className="text-red-500 text-sm">Remove</button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {(allSubjectsByClass[cls.classId] || []).map(subject => (
                                                <label key={subject._id} className="flex items-center gap-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        checked={cls.subjects.includes(subject._id)}
                                                        onChange={(e) => handleSubjectChange(cls.classId, subject._id, e.target.checked)}
                                                    />
                                                    {subject.subjectName}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gender, Status, Blood */}
                        <div className="bg-white rounded-xl shadow-md">
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
                        <div className="bg-white rounded-xl shadow-md">
                            <h2 className="bg-indigo-200 rounded-t-xl px-4 py-2 font-semibold text-blue-800">Bank Details</h2>
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
