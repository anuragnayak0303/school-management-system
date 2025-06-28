import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewStudentDetails() {
    const [student, setStudent] = useState(null);
    const { id } = useParams()
    const getData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v3/student/getById/${id}`)
            console.log(data)
            setStudent(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        // Sample call, replace with real ID/API
        getData()
    }, [id]);

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen bg-gray-50 relative overflow-hidden">
                <MainHeader />

                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 animate-pulse blur-2xl opacity-60" />
                    <div className="absolute top-10 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow" />
                    <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slower" />
                </div>

                <div className="relative z-10 p-8 space-y-10">
                    <h1 className="text-3xl font-bold text-gray-800">Student Details</h1>

                    {!student ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        <>
                            {/* Student Profile Card */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md">
                                <div className="bg-gray-100 px-6 py-3 rounded-t-xl border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">👤 Student Profile</h2>
                                </div>
                                <div className="p-6 flex gap-6 items-center">
                                    <img
                                        src={student.userId?.profileImage || '/default-avatar.png'}
                                        className="w-28 h-28 rounded-full border-4 border-white shadow"
                                        alt="Profile"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold">{student.userId?.name}</h3>
                                        <p className="text-gray-600">{student.userId?.email}</p>
                                        <p className="text-sm text-blue-600 mt-1">{student.userId?.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Admission Information Card */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md">
                                <div className="bg-gray-100 px-6 py-3 rounded-t-xl border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">🎓 Admission Information</h2>
                                </div>
                                <div className="p-6 grid md:grid-cols-2 gap-6 text-gray-700">
                                    <div>
                                        <p><strong>Admission No:</strong> {student.admissionNumber}</p>
                                        <p><strong>Roll No:</strong> {student.rollNumber}</p>
                                        <p><strong>Class:</strong> {student.class?.name || 'N/A'}</p>
                                        <p><strong>Academic Year:</strong> {student.academicYear}</p>
                                        <p><strong>Status:</strong> {student.status}</p>
                                    </div>
                                    <div>
                                        <p><strong>Admission Date:</strong> {new Date(student.admissionDate).toLocaleDateString()}</p>
                                        <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                                        <p><strong>Gender:</strong> {student.gender}</p>
                                        <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
                                        <p><strong>Religion:</strong> {student.religion}</p>
                                        <p><strong>Category:</strong> {student.category}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Parent Info Card */}
                            <div className="bg-white border border-gray-200 rounded-xl shadow-md">
                                <div className="bg-gray-100 px-6 py-3 rounded-t-xl border-b">
                                    <h2 className="text-xl font-semibold text-gray-700">👪 Parent / Guardian Information</h2>
                                </div>
                                <div className="p-6 grid md:grid-cols-3 gap-4">
                                    {[{ label: 'Father', data: student.father }, { label: 'Mother', data: student.mother }, { label: 'Guardian', data: student.guardian }]
                                        .map((parent, index) => (
                                            <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                                <h3 className="font-bold text-gray-700 mb-2">{parent.label}</h3>
                                                {parent.data?.photo && (
                                                    <img src={parent.data.photo} alt="Parent" className="w-20 h-20 rounded-full mb-3" />
                                                )}
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li><strong>Name:</strong> {parent.data?.name}</li>
                                                    <li><strong>Email:</strong> {parent.data?.email}</li>
                                                    <li><strong>Phone:</strong> {parent.data?.phone}</li>
                                                    <li><strong>Relation:</strong> {parent.data?.relation}</li>
                                                    <li><strong>Occupation:</strong> {parent.data?.occupation}</li>
                                                </ul>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
