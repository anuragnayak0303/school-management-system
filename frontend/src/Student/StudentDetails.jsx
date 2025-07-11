import React, { useEffect, useState, useContext } from 'react';
import StudentSideBar from './StudentSideBar';
import MainHeader from '../components/MainHeader';
import { AuthStudentContext } from '../context/StudentAuth';

export default function StudentDetails() {
    const { student } = useContext(AuthStudentContext);
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        setStudentData(student);
    }, [student]);

    if (!studentData) {
        return (
            <div className="text-center mt-20 text-xl font-semibold text-indigo-600 animate-pulse">
                Loading student details...
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-tr from-[#d1f1ff] via-[#f0e4ff] to-[#ffe2e5]">
            <StudentSideBar />
            <div className="flex-grow flex flex-col ml-0 lg:ml-64">
                <MainHeader />
                <div className="p-6 max-w-6xl w-full mx-auto space-y-8">
                    <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 tracking-wide drop-shadow-lg">
                        🎓 Student Profile
                    </h1>

                    {/* Profile Card */}
                    <Card>
                        <div className="flex items-center space-x-6">
                            <img
                                src={`https://school-management-system-1-jprf.onrender.com/${studentData?.userId?.profileImage || 'default.png'}`}
                                alt="Profile"
                                className="w-28 h-28 rounded-full shadow-lg border-4 border-indigo-300 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div>
                                <h2 className="text-3xl font-bold text-indigo-800">{studentData?.userId?.name}</h2>
                                <p className="text-sm text-gray-600">📧 {studentData?.userId?.email}</p>
                                <p className="text-sm text-gray-600">🎓 Roll No: {studentData?.rollNumber}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Academic Info Card */}
                    <Card title="📚 Academic Info">
                        <InfoGrid cols={3}>
                            <InfoBox label="Class" value={studentData?.class?.Classname} />
                            <InfoBox label="Admission No." value={studentData?.admissionNumber} />
                            <InfoBox label="Academic Year" value={studentData?.academicYear} />
                            <InfoBox label="Admission Date" value={new Date(studentData?.admissionDate).toLocaleDateString()} />
                            <InfoBox label="Status" value={studentData?.status} />
                            <InfoBox label="Religion" value={studentData?.religion} />
                        </InfoGrid>
                    </Card>

                    {/* Personal Info Card */}
                    <Card title="🧬 Personal Info">
                        <InfoGrid cols={3}>
                            <InfoBox label="Gender" value={studentData?.gender} />
                            <InfoBox label="Date of Birth" value={new Date(studentData?.dateOfBirth).toLocaleDateString()} />
                            <InfoBox label="Blood Group" value={studentData?.bloodGroup} />
                            <InfoBox label="Category" value={studentData?.category} />
                            <InfoBox label="Primary Contact" value={studentData?.primaryContact} />
                        </InfoGrid>
                    </Card>

                    {/* Parent Info Card */}
                    <Card title="👪 Parent Info">
                        <InfoGrid cols={2}>
                            <InfoBox label="Father's Name" value={studentData?.father?.name} />
                            <InfoBox label="Father's Phone" value={studentData?.father?.phone} />
                            <InfoBox label="Mother's Name" value={studentData?.mother?.name} />
                            <InfoBox label="Mother's Phone" value={studentData?.mother?.phone} />
                        </InfoGrid>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// 🔹 Card wrapper
function Card({ title, children }) {
    return (
        <div className="bg-white/70 backdrop-blur-2xl border border-gray-200 shadow-2xl rounded-3xl p-6 space-y-4 animate-fade-in transition-all duration-300 hover:shadow-indigo-300">
            {title && <h3 className="text-2xl font-bold text-indigo-600 border-l-4 border-indigo-400 pl-2">{title}</h3>}
            {children}
        </div>
    );
}

// 🔹 Info layout
function InfoGrid({ cols, children }) {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-${cols} gap-4`}>
            {children}
        </div>
    );
}

// 🔹 Reusable info box
function InfoBox({ label, value }) {
    return (
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-md rounded-xl p-4 transform hover:scale-105 transition-all duration-300 ease-in-out">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-lg font-semibold text-gray-700 mt-1">{value || 'N/A'}</p>
        </div>
    );
}
