import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewTeacher() {
    const { id } = useParams();
    const [teacherDetails, setTeacherDetails] = useState({});

    const getSingleData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/teachers/getSingle/${id}`);
            setTeacherDetails(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching teacher data", error);
        }
    };

    useEffect(() => {
        getSingleData();
    }, [id]);

    return (
        <div className="flex flex-col md:flex-row">
            <Toaster />
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-100">
                <MainHeader />
                <div className="p-4 sm:p-6 space-y-6">
                    <p className="text-sm text-gray-500">Dashboard &gt; Teachers &gt; Teacher Details</p>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-800">Teachers Details</h1>
                        <NavLink
                            to={'/school/all_teacher'}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                        >
                            All Teacher
                        </NavLink>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Panel */}
                        <div className="w-full h-[55vh] lg:w-1/4 bg-white rounded-xl shadow p-4 space-y-4">
                            <div className="flex items-center space-x-4">
                                {teacherDetails?.userId?.profileImage ? (
                                    <img
                                        src={`http://localhost:8000/${teacherDetails.userId.profileImage}`}
                                        alt="avatar"
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-500 text-white text-xl font-bold">
                                        {teacherDetails?.userId?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{teacherDetails?.userId?.name}</h2>
                                    <p className="text-sm text-blue-600">{teacherDetails?.teacherId}</p>
                                    <p className="text-sm text-gray-500">Joined: {new Date(teacherDetails?.dateOfJoining).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <hr className="border-gray-200" />

                            <div>
                                <h3 className="font-semibold text-sm mb-2">Basic Information</h3>
                                <ul className="text-sm space-y-1 text-gray-600">
                                    <li><strong>Gender:</strong> {teacherDetails?.gender}</li>
                                    <li><strong>Blood Group:</strong> {teacherDetails?.bloodGroup}</li>
                                    <li><strong>Salary:</strong> ₹{teacherDetails?.salary || '20000'}</li>
                                    <li><strong>Phone:</strong> {teacherDetails?.address?.phone}</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="flex-1 space-y-6 overflow-y-auto">
                            {/* Profile Details */}
                            <section className="bg-white rounded-xl shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                    <Detail label="Father's Name" value={teacherDetails?.fatherName} />
                                    <Detail label="Mother Name" value={teacherDetails?.motherName} />
                                    <Detail label="Date of Birth" value={new Date(teacherDetails?.dateOfBirth).toLocaleDateString()} />
                                    <Detail label="Marital Status" value={teacherDetails?.maritalStatus} />
                                    <Detail label="Qualification" value={teacherDetails?.qualification} />
                                    <Detail label="Experience" value={teacherDetails?.workExperience} />
                                </div>
                            </section>

                            {/* Bank Details */}
                            <section className="bg-white rounded-xl shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                    <Detail label="Bank Name" value={teacherDetails?.bankDetails?.bankName} />
                                    <Detail label="Branch" value={teacherDetails?.bankDetails?.branchName} />
                                    <Detail label="IFSC" value={teacherDetails?.bankDetails?.ifscCode} />
                                </div>
                            </section>

                            {/* Class and Subject Details */}
                            <section className="bg-white rounded-xl shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Class</h3>
                                {teacherDetails?.Class?.length > 0 ? (
                                    <div className="space-y-4">
                                        {teacherDetails.Class.map((cls, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                            >
                                                <p className="text-sm font-medium text-gray-700 mb-1">
                                                    Class: <span className="text-gray-900">{cls.Classname}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No classes assigned.</p>
                                )}
                            </section>
                            <section className="bg-white rounded-xl shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4"> Subjects</h3>
                                {teacherDetails?.subject?.length > 0 ? (
                                    <div className="space-y-4">
                                        {teacherDetails.subject.map((cls, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                                            >
                                                <p className="text-sm font-medium text-gray-700 mb-1">
                                                    Subject: <span className="text-gray-900">{cls.subjectName}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No classes assigned.</p>
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
        <p className="text-gray-800 font-medium">{value || '—'}</p>
    </div>
);
