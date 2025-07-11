import React, { useContext, useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { AuthStudentContext } from '../../context/StudentAuth';
import axios from 'axios';
import { useAuth } from '../../context/auth';

export default function TodaysClassCard() {
    const { auth } = useAuth();
    const { student } = useContext(AuthStudentContext);
    const [Subject, setSubject] = useState([]);
    const [subjectIds, setSubjectIds] = useState([]);
    const [teachers, setTeachers] = useState([]);

    // Fetch subjects for the class
    const GetSubject = async () => {
        try {
            const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v2/subject/ClassId/${student?.class?._id}`);
            setSubject(data);
            const ids = data.map(subject => subject._id);
            setSubjectIds(ids);
        } catch (error) {
            console.log("GetSubject error:", error);
        }
    };

    // Fetch teachers who teach any of those subjects
    const fetchTeachersBySubjects = async () => {
        try {
            const { data } = await axios.post("https://school-management-system-1-jprf.onrender.com/api/v2/subject/by-subjects", {
                subjectIds,
            });
            setTeachers(data);
        } catch (err) {
            console.error("fetchTeachersBySubjects error:", err);
        }
    };

    useEffect(() => {
        if (student?.class?._id) GetSubject();
    }, [student, auth]);

    useEffect(() => {
        if (subjectIds.length > 0) fetchTeachersBySubjects();
    }, [subjectIds]);

    // Find teacher for a subject by subject ID
    const getTeacherBySubjectId = (subjectId) => {
        return teachers.find(teacher =>
            teacher.subject.some(s => s._id === subjectId)
        );

    };

    return (
        <div className="bg-[#ffffff] rounded shadow-md border border-gray-300">
            <div className="flex justify-between items-center p-4 border-b border-b-gray-300">
                <h3 className="text-sm font-semibold text-gray-800">Today's Class</h3>
                <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="space-y-3 p-4 w-full h-[40vh] overflow-y-auto">
                {Subject.map((Sub, idx) => {
                    const teacher = getTeacherBySubjectId(Sub._id);

                    const teacherImg = teacher?.userId?.profileImage 
                    const teacherName = teacher?.userId?.name || "Teacher";

                    return (
                        <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-gray-300 shadow-md">
                            <div className="flex items-center space-x-3">
                                <img src={teacherImg ? `https://school-management-system-1-jprf.onrender.com/${teacherImg}` : "https://avatar.iran.liara.run/public/44"} alt="teacher" className="w-10 h-11 rounded" />
                                <div>
                                    <p className="text-[12px] font-semibold text-gray-800">{Sub?.subjectName}</p>
                                    <p className="text-[10px] text-gray-500 flex items-center">
                                        <FaClock className="mr-1" /> 09:00 - 09:45 AM
                                    </p>
                                    <p className="text-[10px] text-gray-600 italic">{teacherName}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700`}>
                                <span className="w-1.5 h-1.5 border rounded-full mr-2 bg-green-800 inline-block" /> Active
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
