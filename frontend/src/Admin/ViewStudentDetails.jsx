import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function ViewStudentDetails() {
    const [student, setStudent] = useState(null);
    const { id } = useParams();

    const getData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v3/student/getById/${id}`);
            setStudent(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.trim().split(' ');
        const first = parts[0]?.charAt(0).toUpperCase() || '';
        const last = parts[1]?.charAt(0).toUpperCase() || '';
        return first + last;
    };


    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-50 relative overflow-hidden">
                <MainHeader />

                {/* Background Visuals */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 animate-pulse blur-2xl opacity-50" />
                    <div className="absolute top-10 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slow" />
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slower" />
                </div>

                <div className="relative z-10 p-6 md:p-10 space-y-10">
                    <div className='flex justify-between items-center'>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">📘 Student Details</h1>
                        <NavLink to={`/school/admin/all_student`} className='flex cursor-pointer justify-center items-center space-x-3 px-3 py-2 rounded text-white bg-blue-700 font-semibold'>
                            <FaArrowLeft className='mr-3' /> Go Back
                        </NavLink>
                    </div>

                    {!student ? (
                        <div className="flex justify-center items-center h-[60vh]">
                            <div className="flex gap-4 items-center">
                                {['bg-red-500', 'bg-green-500', 'bg-blue-500'].map((color, index) => (
                                    <div
                                        key={index}
                                        className={`${color} w-6 h-6 rounded-sm animate-bounceSquare`}
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    ></div>
                                ))}
                                <span className="ml-4 text-gray-700 text-lg font-semibold">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-10">

                            {/* Student Profile Card */}
                            <section className="bg-white rounded-md border border-gray-300 shadow-lg overflow-hidden">
                                <div className="border-t-4 border-blue-600 px-6 py-4 bg-gray-100">
                                    <h3 className="text-xl font-semibold text-blue-700">👤 Student Profile</h3>
                                </div>
                                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                                    {student.userId?.profileImage ? (
                                        <img
                                            src={`http://localhost:8000/${student.userId?.profileImage}`}
                                            alt="Student"
                                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white">
                                            {getInitials(student.userId?.name)}
                                        </div>
                                    )}
                                    <div className="text-center md:text-left space-y-1">
                                        <h2 className="text-2xl font-bold text-gray-800">{student.userId?.name}</h2>
                                        <p className="text-gray-600 text-sm">{student.userId?.email}</p>
                                        <span className="inline-block mt-2 px-3 py-0.5 text-sm bg-blue-100 text-blue-700 font-medium rounded">
                                            {student.userId?.role}
                                        </span>
                                        <span className={`inline-block mt-2 ml-2.5 px-3 py-0.5 text-sm bg-blue-100 text-blue-700 font-medium rounded ${student.status == 'Active' ? 'text-green-600' : 'text-red-600'}`}> {student.status}</span>
                                    </div>
                                </div>
                            </section>

                            {/* Admission Info */}
                            <section className="bg-white rounded-md shadow-lg border border-gray-300 overflow-hidden">
                                <div className="border-t-4 border-green-600 px-6 py-4 bg-gray-100">
                                    <h3 className="text-xl font-semibold text-green-700">🎓 Admission Information</h3>
                                </div>
                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm md:text-base">
                                    <div className="space-y-2">
                                        <p><span className="font-semibold text-gray-800">Admission No:</span> {student.admissionNumber}</p>
                                        <p><span className="font-semibold text-gray-800">Roll No:</span> {student.rollNumber}</p>
                                        <p><span className="font-semibold text-gray-800">Class:</span> {student.class?.Classname || 'N/A'}</p>
                                        <p><span className="font-semibold text-gray-800">Academic Year:</span> {student.academicYear}</p>
                                        <p><span className="font-semibold text-gray-800">Gender:</span> {student.gender}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p><span className="font-semibold text-gray-800">Admission Date:</span> {new Date(student.admissionDate).toLocaleDateString()}</p>
                                        <p><span className="font-semibold text-gray-800">Date of Birth:</span> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                                        <p><span className="font-semibold text-gray-800">Blood Group:</span> {student.bloodGroup}</p>
                                        <p><span className="font-semibold text-gray-800">Religion:</span> {student.religion}</p>
                                        <p><span className="font-semibold text-gray-800">Category:</span> {student.category}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Parent / Guardian Info */}
                            <section className="bg-white rounded-md shadow-lg border border-gray-300 overflow-hidden">
                                <div className="border-t-4 border-purple-600 px-6 py-4 bg-gray-100">
                                    <h3 className="text-xl font-semibold text-purple-700">👨‍👩‍👧 Parent / Guardian Information</h3>
                                </div>
                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[{ label: 'Father', data: student.father }, { label: 'Mother', data: student.mother }]
                                        .map((parent, index) => (
                                            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                                                <h4 className="text-lg font-semibold text-gray-800 mb-3">{parent.label}</h4>
                                                {parent.data?.photo && (
                                                    <img src={parent.data.photo} alt={`${parent.label}`} className="w-20 h-20 rounded-full mb-3 mx-auto" />
                                                )}
                                                <ul className="text-sm text-gray-700 space-y-1">
                                                    <li><strong>Name:</strong> {parent.data?.name || 'N/A'}</li>
                                                    <li><strong>Email:</strong> {parent.data?.email || 'N/A'}</li>
                                                    <li><strong>Phone:</strong> {parent.data?.phone || 'N/A'}</li>
                                                    <li><strong>Occupation:</strong> {parent.data?.occupation || 'N/A'}</li>
                                                </ul>
                                            </div>
                                        ))}
                                </div>
                            </section>
                        </div>
                    )
                    }
                </div >
            </main >
        </div >
    );
}
