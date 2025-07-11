import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { useAuth } from '../context/auth';
import TeacherSidebar from './TeacherSideBar';

export default function ViewDetails() {
    const { auth } = useAuth();
    const [teacherDetails, setTeacherDetails] = useState({});

    const getSingleData = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/teachers/TeacherData/${auth?.user?.id}`);
            setTeacherDetails(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching teacher data", error);
        }
    };

    useEffect(() => {
        getSingleData();
    }, [auth]);

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
            <Toaster />
            <TeacherSidebar />
            <main className="ml-0 md:ml-64 w-full min-h-screen bg-gray-50">
                <MainHeader />
                <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">

                    <p className="text-sm text-gray-500 select-none">Dashboard &gt; Teachers &gt; Teacher Details</p>

                    <header className="flex justify-between items-center bg-white rounded-xl shadow-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-900">Teacher Details</h1>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Panel */}
                        <div className="w-full lg:w-1/4 h-[55vh] bg-white rounded-md border border-gray-200 shadow-lg p-6">
                            <div className="flex items-center space-x-5">
                                {teacherDetails?.userId?.profileImage ? (
                                    <img
                                        src={`https://school-management-system-1-jprf.onrender.com/${teacherDetails.userId.profileImage}`}
                                        alt="avatar"
                                        className="w-24 h-24 rounded-xl object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-indigo-600 text-white text-3xl font-bold shadow-md">
                                        {teacherDetails?.userId?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{teacherDetails?.userId?.name || "—"}</h2>
                                    <p className="text-sm text-indigo-600 font-medium">{teacherDetails?.teacherId || "—"}</p>
                                    <p className="text-sm text-gray-500 mt-1">Joined: {teacherDetails?.dateOfJoining ? new Date(teacherDetails.dateOfJoining).toLocaleDateString() : "—"}</p>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            <div>
                                <h3 className="font-semibold text-md mb-3 text-gray-800">Basic Information</h3>
                                <ul className="text-sm space-y-2 text-gray-700">
                                    <li><strong>Gender:</strong> {teacherDetails?.gender || '—'}</li>
                                    <li><strong>Blood Group:</strong> {teacherDetails?.bloodGroup || '—'}</li>
                                    <li><strong>Salary:</strong> ₹{teacherDetails?.salary || '20000'}</li>
                                    <li><strong>Phone:</strong> {teacherDetails?.address?.phone || '—'}</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="flex-1 space-y-8 overflow-y-auto">

                            {/* Profile Details */}
                            <section className="bg-white rounded-md border border-gray-200 shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
                                    <Detail label="Father's Name" value={teacherDetails?.fatherName} />
                                    <Detail label="Mother Name" value={teacherDetails?.motherName} />
                                    <Detail label="Date of Birth" value={teacherDetails?.dateOfBirth ? new Date(teacherDetails.dateOfBirth).toLocaleDateString() : '—'} />
                                    <Detail label="Marital Status" value={teacherDetails?.maritalStatus} />
                                    <Detail label="Qualification" value={teacherDetails?.qualification} />
                                    <Detail label="Experience" value={teacherDetails?.workExperience} />
                                </div>
                            </section>

                            {/* Bank Details */}
                            <section className="bg-white rounded-md border border-gray-200 shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Bank Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 text-sm">
                                    <Detail label="Bank Name" value={teacherDetails?.bankDetails?.bankName} />
                                    <Detail label="Branch" value={teacherDetails?.bankDetails?.branchName} />
                                    <Detail label="IFSC" value={teacherDetails?.bankDetails?.ifscCode} />
                                </div>
                            </section>

                            {/* Class Details */}
                            <section className="bg-white rounded-md border border-gray-200 shadow-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Class</h3>
                                {teacherDetails?.Class?.length > 0 ? (
                                    <div className="space-y-4 h-[23vh] overflow-y-auto">
                                        {teacherDetails.Class.map((cls, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-inner"
                                            >
                                                <p className="text-sm font-medium text-gray-800">
                                                    Class: <span className="text-indigo-700">{cls.Classname}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No classes assigned.</p>
                                )}
                            </section>

                            {/* Subject Details */}
                            <section className="bg-white rounded-md border  border-gray-200 shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Subjects</h3>
                                {teacherDetails?.subject?.length > 0 ? (
                                    <div className="space-y-4 h-[36vh] overflow-y-auto">
                                        {teacherDetails.subject.map((subj, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-inner"
                                            >
                                                <p className="text-sm font-medium text-gray-800">
                                                    Subject: <span className="text-indigo-700">{subj.subjectName}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No subjects assigned.</p>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Reusable component for field display
const Detail = ({ label, value }) => (
    <div>
        <p className="text-gray-500">{label}</p>
        <p className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 shadow-inner">{value || '—'}</p>
    </div>
);
