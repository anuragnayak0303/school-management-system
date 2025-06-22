import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import TeacherSidebar from './TeacherSideBar';
import MainHeader from '../components/MainHeader';
import { useAuth } from '../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function MarkResult() {
    const [form, setForm] = useState({
        classId: '',
        studentId: '',
        examName: '',
        fullMarks: '',
        subjectId: '',
        markObtained: '',
    });

    const [errors, setErrors] = useState({});
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [students, setStudents] = useState([]);
    const { auth } = useAuth();
    const [TeacherDetails, setTeacherDetails] = useState({});

    const GetaData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/teachers/TeacherData/${auth?.user?.id}`);
            setTeacherDetails(data);
        } catch (error) {
            toast.error('Failed to load teacher details');
        }
    };

    const fetchStudentsByClass = async (classId) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v3/student/byClass/${classId}`);
            setStudents(data);
        } catch (error) {
            toast.error('Failed to fetch students');
        }
    };

    useEffect(() => {
        if (auth?.user) GetaData();
    }, [auth]);

    useEffect(() => {
        if (form.classId) {
            fetchStudentsByClass(form.classId);
        } else {
            setStudents([]);
        }
    }, [form.classId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleAddMark = () => {
        let newErrors = {};

        if (!form.subjectId) newErrors.subjectId = 'Subject is required';
        if (!form.markObtained) newErrors.markObtained = 'Mark is required';
        if (subjectMarks.some((m) => m.subjectId === form.subjectId)) {
            newErrors.subjectId = 'Mark already added for this subject';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors((prev) => ({ ...prev, ...newErrors }));
            toast.error(Object.values(newErrors)[0]);
            return;
        }

        const subjectName = TeacherDetails?.subject?.find((s) => s._id === form.subjectId)?.subjectName || '';

        setSubjectMarks([
            ...subjectMarks,
            {
                subjectId: form.subjectId,
                subjectName,
                markObtained: form.markObtained,
            },
        ]);

        setForm({ ...form, subjectId: '', markObtained: '' });
    };

    const handleDeleteSubject = (id) => {
        setSubjectMarks(subjectMarks.filter((m) => m.subjectId !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!form.classId) validationErrors.classId = 'Class is required';
        if (!form.studentId) validationErrors.studentId = 'Student is required';
        if (!form.examName) validationErrors.examName = 'Exam name is required';
        if (!form.fullMarks) validationErrors.fullMarks = 'Full marks are required';
        if (subjectMarks.length === 0) validationErrors.subjectMarks = 'Add at least one subject mark';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error(Object.values(validationErrors)[0]);
            return;
        }

        const payload = {
            studentId: form.studentId,
            examName: form.examName,
            classId: form.classId,
            marks: subjectMarks.map((m) => ({
                subjectId: m.subjectId,
                markObtained: m.markObtained,
            })),
            fullMarks: form.fullMarks,
        };

        try {
            const { data } = await axios.post('http://localhost:8000/api/v11/exam/add', payload);
            toast.success(data?.message || 'Marks submitted!');
            setForm({
                classId: '',
                studentId: '',
                examName: '',
                fullMarks: '',
                subjectId: '',
                markObtained: '',
            });
            setSubjectMarks([]);
            setErrors({});
        } catch (err) {
            const msg = err?.response?.data?.message || 'Failed to submit.';
            toast.error(msg);
            setForm({
                classId: '',
                studentId: '',
                examName: '',
                fullMarks: '',
                subjectId: '',
                markObtained: '',
            });
            setSubjectMarks([]);
            setErrors({});
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-tr from-sky-100 via-pink-50 to-indigo-100">
            <TeacherSidebar />
            <div className="ml-0 md:ml-64 flex-grow flex flex-col min-h-screen">
                <MainHeader />
                <div className="p-6 max-w-5xl w-full mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="bg-white shadow-2xl rounded-2xl p-8 border border-indigo-200"
                    >
                        <h1 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-3">
                            <FaCheckCircle className="text-green-500" />
                            Add Student Marks
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-600 font-medium">Class</label>
                                    <select
                                        name="classId"
                                        value={form.classId}
                                        onChange={handleChange}
                                        className="w-full border border-indigo-300 rounded-lg p-2 bg-white shadow-sm"
                                    >
                                        <option value="">Select Class</option>
                                        {TeacherDetails?.Class?.map((cls, i) => (
                                            <option key={i} value={cls._id}>{cls.Classname}</option>
                                        ))}
                                    </select>
                                    {errors.classId && <p className="text-red-600 text-sm mt-1">{errors.classId}</p>}
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 font-medium">Student</label>
                                    <select
                                        name="studentId"
                                        value={form.studentId}
                                        onChange={handleChange}
                                        className="w-full border border-indigo-300 rounded-lg p-2 bg-white shadow-sm"
                                    >
                                        <option value="">Select Student</option>
                                        {students.map((stu) => (
                                            <option key={stu._id} value={stu._id}>{stu?.userId?.name}</option>
                                        ))}
                                    </select>
                                    {errors.studentId && <p className="text-red-600 text-sm mt-1">{errors.studentId}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-600 font-medium">Exam Name</label>
                                    <select
                                        name="examName"
                                        value={form.examName}
                                        onChange={handleChange}
                                        placeholder="e.g. Mid Term"
                                        className="w-full border border-indigo-300 rounded-lg p-2 bg-white shadow-sm"
                                    >
                                        <option value="">Select Exam</option>
                                        <option value="Quarter 1">Quarter 1</option>
                                        <option value="Quarter 2">Quarter 2</option>
                                        <option value="Half Yearly">Half Yearly</option>
                                        <option value="Model">Model</option>
                                        <option value="Final">Final</option>
                                    </select>


                                    {errors.examName && <p className="text-red-600 text-sm mt-1">{errors.examName}</p>}
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 font-medium">Full Marks</label>
                                    <input
                                        type="number"
                                        name="fullMarks"
                                        value={form.fullMarks}
                                        onChange={handleChange}
                                        className="w-full border border-indigo-300 rounded-lg p-2 bg-white shadow-sm"
                                    />
                                    {errors.fullMarks && <p className="text-red-600 text-sm mt-1">{errors.fullMarks}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-600 font-medium">Subject</label>
                                    <select
                                        name="subjectId"
                                        value={form.subjectId}
                                        onChange={handleChange}
                                        className="w-full border border-indigo-300 rounded-lg p-2 bg-white shadow-sm"
                                    >
                                        <option value="">Select Subject</option>
                                        {TeacherDetails?.subject
                                            ?.filter((subj) => subj?.classId?._id === form.classId)
                                            .map((subj, i) => (
                                                <option key={i} value={subj._id}>{subj.subjectName}</option>
                                            ))}
                                    </select>
                                    {errors.subjectId && <p className="text-red-600 text-sm mt-1">{errors.subjectId}</p>}
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 font-medium">Mark Obtained</label>
                                    <input
                                        type="number"
                                        name="markObtained"
                                        value={form.markObtained}
                                        onChange={handleChange}
                                        className="w-full border border-indigo-300 rounded-lg p-2 bg-white shadow-sm"
                                    />
                                    {errors.markObtained && <p className="text-red-600 text-sm mt-1">{errors.markObtained}</p>}
                                </div>
                            </div>

                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={handleAddMark}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
                                >
                                    + Add Subject Mark
                                </button>
                            </div>

                            {subjectMarks.length > 0 && (
                                <div className="bg-indigo-50 p-4 rounded-xl shadow-inner">
                                    <h3 className="text-md font-semibold text-indigo-700 mb-2">Subjects Added</h3>
                                    <ul className="space-y-2">
                                        {subjectMarks.map((m, i) => (
                                            <li key={i} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                                                <span className="text-gray-800">{m.subjectName}</span>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-indigo-700 font-bold">{m.markObtained}</span>
                                                    <button type="button" onClick={() => handleDeleteSubject(m.subjectId)} className="text-red-500 hover:text-red-700 transition">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex justify-center pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
                                >
                                    Submit Marks
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
