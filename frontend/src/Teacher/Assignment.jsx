import React, { useEffect, useState } from "react";
import TeacherSideBar from "./TeacherSideBar";
import MainHeader from "../components/MainHeader";
import Calendar from "./components/Calendar";
import axios from "axios";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

export default function Assignment() {
    const { auth } = useAuth();
    const [teacher, setTeacher] = useState({});
    const [allSubjects, setAllSubjects] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [todayAssignments, setTodayAssignments] = useState([]);
    const [tomorrowAssignments, setTomorrowAssignments] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "",
        class: "",
        dueDate: "",
        file: null,
    });

    const fetchDetails = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/teachers/TeacherData/${auth?.user?.id}`
            );
            setTeacher(data);
            setAllSubjects(data?.subject || []);
            setAllClasses(data?.Class || []);
        } catch (error) {
            toast.error("Failed to fetch teacher details.");
        }
    };

    const fetchAssignments = async (teacherId) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/v9/assignments/get/${teacherId}`);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            const todayList = [];
            const tomorrowList = [];

            data?.assignments?.forEach(ass => {
                const dueDate = new Date(ass.dueDate);
                dueDate.setHours(0, 0, 0, 0);

                if (dueDate.getTime() === today.getTime()) {
                    todayList.push(ass);
                } else if (dueDate.getTime() === tomorrow.getTime()) {
                    tomorrowList.push(ass);
                }
            });

            setTodayAssignments(todayList);
            setTomorrowAssignments(tomorrowList);
        } catch (err) {
            console.log(err);
            toast.error("Could not load assignments");
        }
    };

    useEffect(() => {
        if (auth?.user?.id) fetchDetails();
    }, [auth]);

    useEffect(() => {
        if (teacher?._id) fetchAssignments(teacher._id);
    }, [teacher]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "class") {
            setFormData({ ...formData, class: value });
            const relatedSubjects = allSubjects.filter((sub) => sub?.classId?._id == value);
            setFilteredSubjects(relatedSubjects);
        } else if (name === "subject") {
            setFormData({ ...formData, subject: value });
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, subject, class: cls, dueDate } = formData;

        if (!title || !description || !subject || !cls || !dueDate) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const currentYear = new Date().getFullYear().toString();
        const data = new FormData();
        data.append("title", title);
        data.append("teacherId", teacher?._id);
        data.append("description", description);
        data.append("subject", subject);
        data.append("class", cls);
        data.append("dueDate", dueDate);
        data.append("academicYear", currentYear);
        if (formData.file) data.append("file", formData.file);

        try {
            await axios.post("http://localhost:8000/api/v9/assignments/create", data, {
                headers: {
                    Authorization: auth?.token,
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Assignment created successfully.");
            setFormData({ title: "", description: "", subject: "", class: "", dueDate: "", file: null });
            fetchAssignments(teacher._id);
        } catch (error) {
            toast.error("Failed to create assignment.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 animate-fade-in">
            <TeacherSideBar />
            <div className="ml-0 md:ml-64 flex-grow flex flex-col min-h-screen">
                <MainHeader />
                <div className="p-6 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
                    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full lg:w-2/3">
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
                            <span className="text-indigo-500 text-5xl">📝</span> Add New Assignment
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" name="title" placeholder="Assignment Title" value={formData.title} onChange={handleChange} className="w-full px-6 py-3 border border-gray-300 rounded-2xl" />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-6 py-3 border border-gray-300 rounded-2xl" />
                            <div className="flex gap-4">
                                <select name="class" value={formData.class} onChange={handleChange} className="w-1/2 px-6 py-3 border border-gray-300 rounded-2xl">
                                    <option value="">--- select Class ---</option>
                                    {allClasses.map((cls) => (
                                        <option key={cls._id} value={cls._id}>Class {cls?.Classname?.split(" ")[1]}</option>
                                    ))}
                                </select>
                                <select name="subject" value={formData.subject} onChange={handleChange} className="w-1/2 px-6 py-3 border border-gray-300 rounded-2xl">
                                    <option value="">--- select Subject ---</option>
                                    {filteredSubjects.map((sub) => (
                                        <option key={sub._id} value={sub._id}>{sub.subjectName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 items-center">
                                <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-1/2 px-6 py-3 border border-gray-300 rounded-2xl" />
                                <label className="flex items-center gap-3 w-1/2 cursor-pointer">
                                    📎
                                    <input type="file" name="file" onChange={handleChange} className="hidden" />
                                    <span className="px-6 py-3 bg-gray-100 border rounded-2xl text-gray-700">Choose File</span>
                                </label>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl font-semibold px-6 py-3 rounded-2xl">
                                🚀 Create Assignment
                            </button>
                        </form>
                    </div>
                    <div className="w-full lg:w-1/3 space-y-6">
                        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-indigo-600">📌 Upcoming Assignments</h3>
                            <div className="space-y-6 text-sm">
                                {todayAssignments.length > 0 && (
                                    <>
                                        <h4 className="text-lg font-bold text-green-600">📅 Today</h4>
                                        {todayAssignments.map((ass, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-green-100 shadow-inner hover:scale-105">
                                                <p className="font-semibold text-gray-800">{ass.title}</p>
                                                <p className="text-green-700">{ass.subject?.subjectName || "N/A"}</p>
                                                <p className="text-gray-500">{new Date(ass.dueDate).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {tomorrowAssignments.length > 0 && (
                                    <>
                                        <h4 className="text-lg font-bold text-purple-600">📅 Tomorrow</h4>
                                        {tomorrowAssignments.map((ass, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-purple-100 shadow-inner hover:scale-105">
                                                <p className="font-semibold text-gray-800">{ass.title}</p>
                                                <p className="text-purple-700">{ass.subject?.subjectName || "N/A"}</p>
                                                <p className="text-gray-500">{new Date(ass.dueDate).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {todayAssignments.length === 0 && tomorrowAssignments.length === 0 && (
                                    <p className="text-gray-500 text-sm text-center">No upcoming assignments.</p>
                                )}
                            </div>
                        </div>
                        <Calendar />
                    </div>
                </div>
            </div>
        </div>
    );
}
