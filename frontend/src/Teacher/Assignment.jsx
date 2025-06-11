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
    const [filteredClasses, setFilteredClasses] = useState([]);

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
            console.log(data)
            setTeacher(data);
            setAllSubjects(data?.subject || []);
            setAllClasses(data?.Class || []);
        } catch (error) {
            toast.error("Failed to fetch teacher details.");
        }
    };

    useEffect(() => {
        if (auth?.user?.id) fetchDetails();
    }, [auth]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "class") {
            console.log("Cls")
            setFormData({ ...formData, class: value });
            const relatedSubjects = allSubjects.filter((sub) =>
                sub?.classId?._id == value
            );
            console.log(relatedSubjects)
            setFilteredSubjects(relatedSubjects);
        } else if (name === "subject") {
            setFormData({ ...formData, subject: value });
            // const relatedClasses = allClasses.filter((cls) =>
            //     cls?.subjectIds?.includes(value)
            // );
            // setFilteredClasses(relatedClasses);
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
            setFormData({
                title: "",
                description: "",
                subject: "",
                class: "",
                dueDate: "",
                file: null,
            });
            setFilteredClasses([]);
            setFilteredSubjects([]);
        } catch (error) {
            console.log(error)
            toast.error("Failed to create assignment.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 animate-fade-in">
            <TeacherSideBar />
            <div className="ml-0 md:ml-64 flex-grow flex flex-col min-h-screen">
                <MainHeader />
                <div className="p-6 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
                    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full lg:w-2/3 transform hover:scale-[1.01] transition-all duration-300">
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3 animate-slide-down">
                            <span className="text-indigo-500 text-5xl">📝</span> Add New Assignment
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                name="title"
                                placeholder="Assignment Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-6 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-inner"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-6 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 shadow-inner"
                            />
                            <div className="flex gap-4">
                                <select
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    className="w-1/2 px-6 py-3 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 shadow-inner"
                                >
                                    <option value="">--- select Class ---</option>
                                    {(filteredClasses.length ? filteredClasses : allClasses).map((cls) => (
                                        <option key={cls._id} value={cls._id}>
                                            Class {cls?.Classname?.split(" ")[1]}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-1/2 px-6 py-3 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-200 shadow-inner"
                                >
                                    <option value="">--- select Subject ---</option>
                                    {(filteredSubjects.length ? filteredSubjects : allSubjects).map((sub) => (
                                        <option key={sub._id} value={sub._id}>{sub.subjectName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4 items-center">
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="w-1/2 px-6 py-3 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-200 shadow-inner"
                                />
                                <label className="flex items-center gap-3 w-1/2 cursor-pointer">
                                    📎
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    <span className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 border rounded-2xl text-gray-700 hover:shadow-lg">
                                        Choose File
                                    </span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xl font-semibold px-6 py-3 rounded-2xl shadow-xl hover:scale-105"
                            >
                                🚀 Create Assignment
                            </button>
                        </form>
                    </div>

                    <div className="w-full lg:w-1/3 space-y-6">
                        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-indigo-600">📌 Upcoming Assignments</h3>
                            <div className="space-y-4 text-sm">
                                <div className="p-4 rounded-2xl bg-indigo-100 shadow-inner hover:scale-105">
                                    <p className="font-semibold text-gray-800">Math Homework</p>
                                    <p className="text-indigo-600">Mathematics</p>
                                    <p className="text-gray-500">Apr 25, 2024</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-purple-100 shadow-inner hover:scale-105">
                                    <p className="font-semibold text-gray-800">History Essay</p>
                                    <p className="text-purple-600">History</p>
                                    <p className="text-gray-500">Apr 3, 2024</p>
                                </div>
                            </div>
                        </div>

                        <Calendar />
                    </div>
                </div>
            </div>
        </div>
    );
}
