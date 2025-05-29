import React, { useState, useEffect } from "react";
import { CalendarCheck } from "lucide-react";
import TeacherSideBar from "./TeacherSideBar";
import MainHeader from "../components/MainHeader";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CalendarDays } from "lucide-react";
import TeacherProfileOverview from "./components/TeacherProfileOverview";

const days = ["M", "T", "W", "T", "F", "S", "S"];
const dayStatus = ["green", "green", "green", "green", "red", "gray", "gray"];
export default function TeacherDashboard() {
    const [userId] = useState("teacher123"); // Hardcoded for now
    const [punchedIn, setPunchedIn] = useState(false);
    const [punchTime, setPunchTime] = useState(null);
    const [history, setHistory] = useState([]);

    // Fetch attendance history on load
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/attendance/${userId}`);
                const data = await res.json();
                setHistory(data);

                // Optional: update UI state if user already punched in today
                const today = new Date().toDateString();
                const todayRecord = data.find((entry) =>
                    new Date(entry.punchInTime).toDateString() === today
                );

                if (todayRecord) {
                    setPunchedIn(true);
                    setPunchTime(new Date(todayRecord.punchInTime));
                }
            } catch (err) {
                console.error("Error fetching attendance:", err);
            }
        };

        fetchAttendance();
    }, [userId]);

    const handlePunchIn = async () => {
        const now = new Date();
        setPunchTime(now);
        setPunchedIn(true);

        try {
            await fetch("http://localhost:8000/api/attendance/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, punchInTime: now }),
            });

            setHistory((prev) => [{ userId, punchInTime: now }, ...prev]);
        } catch (err) {
            console.error("Error punching in:", err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <TeacherSideBar />
            <div className="ml-0 md:ml-64 flex-grow">
                <MainHeader />
                {/* Layout for Cards */}
                <div className="p-4 max-w-6xl ">

                    <div className=" w-full h-[17vh] flex items-center rounded-md p-4 bg-blue-600 justify-between">
                        <div className="text-white font-semibold space-y-1.5">
                            <h1 className="text-2xl">Good Morning Ms.Teena</h1>
                            <h5 className="text-xs">Have a Good day at work</h5>
                        </div>
                        <div>
                            <img src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png" alt="" className="h-[15vh]" />
                        </div>
                    </div>

                    <div className="w-full max-w-[770px] h-auto mt-4" >
                        <div className=" w-full flex justify-between h-[20vh]  ">
                            <TeacherProfileOverview />
                        </div>

                        <div className="w-full mt-8 flex justify-between ">
                            <div className="bg-white rounded shadow-lg p-6 space-y-4 w-[49%]">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold text-gray-700">Attendance</h2>
                                    <button className="text-sm text-gray-500 flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4" /> This Week
                                    </button>
                                </div>

                                <div className="bg-gray-50 rounded p-3 text-sm">
                                    <div className="flex gap-1 mb-2 justify-between">
                                        {days.map((d, idx) => (
                                            <span
                                                key={idx}
                                                className={`w-6 h-6 flex items-center justify-center rounded text-white text-xs font-bold ${dayStatus[idx] === "green"
                                                    ? "bg-green-500"
                                                    : dayStatus[idx] === "red"
                                                        ? "bg-red-500"
                                                        : "bg-gray-300 text-gray-600"
                                                    }`}
                                            >
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500">14 May 2024 - 21 May 2024</div>
                                </div>

                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                    <span>📅 No of total working days</span>
                                    <span className="font-semibold text-gray-700">28 Days</span>
                                </div>

                                <div className="grid grid-cols-4 text-center text-sm font-medium text-gray-600">
                                    <div>
                                        <div className="text-xl font-bold text-green-500">25</div>
                                        <div>Present</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-red-500">2</div>
                                        <div>Absent</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-gray-400">0</div>
                                        <div>Halfday</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-blue-500">1</div>
                                        <div>Late</div>
                                    </div>
                                </div>

                                <div className="w-full h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={attendanceData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={70}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {attendanceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex justify-center gap-4 text-xs text-gray-600 mt-2 flex-wrap">
                                    {attendanceData.map((entry, idx) => (
                                        <div key={idx} className="flex items-center gap-1">
                                            <span
                                                className="inline-block w-3 h-3 rounded-full"
                                                style={{ backgroundColor: entry.color }}
                                            ></span>
                                            {entry.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Welcome / Punch In Card */}
                            <div className="bg-white rounded shadow-lg p-6 space-y-4 w-[49%] h-[60vh]">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">Hi Hassan 👋</h2>
                                        <p className="text-sm text-gray-500">Welcome to your dashboard</p>
                                    </div>
                                    <img
                                        src="/profile.jpg"
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full border-2 border-blue-500"
                                    />
                                </div>

                                <div className="text-center">
                                    <h1 className="text-4xl font-extrabold text-blue-600">
                                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        {new Date().toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={handlePunchIn}
                                        disabled={punchedIn}
                                        className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center text-white text-sm font-semibold shadow-lg transition transform hover:scale-105 ${punchedIn
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-br from-green-400 to-green-600"
                                            }`}
                                    >
                                        <CalendarCheck className="w-6 h-6 mb-1" />
                                        {punchedIn ? "Punched In" : "Punch In"}
                                    </button>
                                </div>

                                <div className="text-center text-sm">
                                    {punchedIn ? (
                                        <p className="text-green-600">
                                            ✅ You punched in at{" "}
                                            {punchTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    ) : (
                                        <p className="text-blue-600">Please punch in to mark attendance</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attendance Card */}

                </div>
            </div>
        </div>

    );
}

const attendanceData = [
    { name: "Present", value: 25, color: "#22C55E" }, // green
    { name: "Absent", value: 2, color: "#EF4444" },  // red
    { name: "Half Day", value: 0, color: "#E5E7EB" }, // gray-200
    { name: "Late", value: 1, color: "#3B82F6" },    // blue
];