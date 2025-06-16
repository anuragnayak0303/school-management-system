import React, { useEffect, useState } from 'react';
import TeacherSidebar from './TeacherSideBar';
import MainHeader from '../components/MainHeader';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { FaUserEdit } from 'react-icons/fa';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd';

export default function AllSyllabus() {
    const { auth } = useAuth();
    const [teacher, setTeacher] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [editSubject, setEditSubject] = useState(null);
    const [completion, setCompletion] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `http://localhost:8000/api/teachers/TeacherData/${auth?.user?.id}`
            );
            setTeacher(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const handleEditClick = (ele) => {
        setEditSubject(ele);
        setCompletion(ele?.completion || 0);
        setShowModal(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:8000/api/v2/subject/updatasyllabus/${editSubject._id}`,
                { completion: completion }
            );
            alert("Syllabus completion updated!");
            setShowModal(false);
            fetchDetails();
        } catch (err) {
            console.error("Error updating syllabus:", err);
            alert("Failed to update.");
        }
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const updatedSubjects = Array.from(teacher.subject);
        const [moved] = updatedSubjects.splice(source.index, 1);
        updatedSubjects.splice(destination.index, 0, moved);

        setTeacher((prev) => ({
            ...prev,
            subject: updatedSubjects
        }));
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
            <TeacherSidebar />
            <div className="ml-0 md:ml-64 flex-grow">
                <MainHeader />
                <div className="p-6 max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                        </div>
                    ) : (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="subjectList" direction="horizontal">
                                {(provided) => (
                                    <div
                                        className="flex flex-wrap gap-8 justify-center"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {teacher?.subject &&
                                            teacher.subject.map((ele, i) => {
                                                const completed = ele?.completion || 0;
                                                const pending = 100 - completed;

                                                const chartData = [
                                                    { name: 'Complete', complete: completed, pending: 0 },
                                                    { name: 'Pending', complete: 0, pending: pending },
                                                ];

                                                return (
                                                    <Draggable key={ele._id} draggableId={ele._id} index={i}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="w-[340px] bg-white rounded-3xl p-5 shadow-[0_15px_25px_rgba(0,0,0,0.2)] transform transition-all duration-300 hover:rotate-1 hover:scale-[1.03] hover:shadow-[0_25px_35px_rgba(0,0,0,0.3)]"
                                                                style={{ perspective: 1000, ...provided.draggableProps.style }}
                                                            >
                                                                <div className="flex justify-between items-center mb-3 border-b pb-2">
                                                                    <div>
                                                                        <h2 className="text-indigo-700 font-bold uppercase text-sm">
                                                                            {ele?.classId?.Classname}
                                                                        </h2>
                                                                        <p className="text-pink-500 font-semibold uppercase text-xs">
                                                                            {ele?.subjectName}
                                                                        </p>
                                                                    </div>
                                                                    <FaUserEdit
                                                                        onClick={() => handleEditClick(ele)}
                                                                        className="text-green-600 hover:text-green-800 text-lg cursor-pointer"
                                                                    />
                                                                </div>
                                                                <h3 className="text-center text-lg font-bold text-gray-700 mb-3">
                                                                    🎯 SYLLABUS STATUS
                                                                </h3>
                                                                <div className="h-44 w-full rounded-xl bg-gradient-to-br from-white to-indigo-50 shadow-inner border border-gray-200 overflow-hidden">
                                                                    <ResponsiveContainer width="100%" height="100%">
                                                                        <AreaChart data={chartData}>
                                                                            <defs>
                                                                                <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
                                                                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                                                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                                                                                </linearGradient>
                                                                                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                                                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                                                </linearGradient>
                                                                            </defs>
                                                                            <XAxis dataKey="name" hide />
                                                                            <YAxis hide />
                                                                            <CartesianGrid strokeDasharray="4 4" vertical={false} />
                                                                            <Tooltip />
                                                                            <Area
                                                                                type="monotone"
                                                                                dataKey="complete"
                                                                                stroke="#22c55e"
                                                                                fill="url(#colorComplete)"
                                                                            />
                                                                            <Area
                                                                                type="monotone"
                                                                                dataKey="pending"
                                                                                stroke="#3b82f6"
                                                                                fill="url(#colorPending)"
                                                                            />
                                                                        </AreaChart>
                                                                    </ResponsiveContainer>
                                                                </div>
                                                                <div className="flex justify-around mt-3 text-sm font-semibold">
                                                                    <div className="text-green-600 text-center">
                                                                        ✅ Complete
                                                                        <div className="text-2xl font-bold">{completed}%</div>
                                                                    </div>
                                                                    <div className="text-blue-600 text-center">
                                                                        ⏳ Pending
                                                                        <div className="text-2xl font-bold">{pending}%</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}
                </div>
            </div>
            {showModal && editSubject && (
                <div className="fixed inset-0 bg-[#00000069] bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl border-2 border-blue-300">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Syllabus Completion</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Subject: <span className="font-semibold text-indigo-700">{editSubject?.subjectName}</span>
                        </p>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={completion}
                            onChange={(e) => setCompletion(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                            placeholder="Enter completion %"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
