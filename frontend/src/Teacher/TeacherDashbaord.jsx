import React, { useEffect, useState } from "react";
import TeacherSideBar from "./TeacherSideBar";
import MainHeader from "../components/MainHeader";
import TeacherProfileOverview from "./components/TeacherProfileOverview";
import ScheduleCard from "./components/ScheduleCard";
import PunchInCard from "./components/PunchInCard";
import AttendanceCard from "./components/AttendanceCard";
import { useAuth } from "../context/auth";
import axios from "axios";
import StudentMarksTable from "./components/StudentMarksTable";

export default function TeacherDashboard() {
  const { auth } = useAuth();
  const [teacher, setTeacher] = useState({});
  const [punchedIn, setPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/teachers/TeacherData/${auth?.user?.id}`
      );
      setTeacher(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/attendance/${auth?.user?.id}`
        );
        const data = await res.json();
        setHistory(data);

        const today = new Date().toDateString();
        const todayRecord = data.find(
          (entry) => new Date(entry.punchInTime).toDateString() === today
        );

        if (todayRecord) {
          setPunchedIn(true);
          setPunchTime(new Date(todayRecord.punchInTime));
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchDetails();
    fetchAttendance();
  }, [auth]);

  const handlePunchIn = async () => {
    const now = new Date();
    setPunchTime(now);
    setPunchedIn(true);

    try {
      await fetch("http://localhost:8000/api/attendance/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: auth?.user?.id, punchInTime: now }),
      });

      setHistory((prev) => [
        { userId: auth?.user?.id, punchInTime: now },
        ...prev,
      ]);
    } catch (err) {
      console.error("Error punching in:", err);
    }
  };

  const generateCalendarDays = () => {
    const year = 2025;
    const month = 4;
    const daysInMonth = 31;
    const firstDay = new Date(year, month, 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    return calendarDays;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSideBar />
      <div className="ml-0 md:ml-64 flex-grow flex flex-col min-h-screen">
        <MainHeader />
        <div className="p-4 max-w-7xl w-full">
          <div className="w-full h-[17vh] flex items-center rounded-md p-4 bg-blue-600 justify-between mb-4">
            <div className="text-white font-semibold space-y-1.5">
              <h1 className="text-2xl">Good Morning {auth?.user?.name}</h1>
              <h5 className="text-xs">Have a Good day at work</h5>
            </div>
            <img
              src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png"
              alt="bg"
              className="h-[15vh]"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-[70%] gap-4">
              <TeacherProfileOverview data={auth?.user} teacher={teacher} />
              <div className="flex flex-col md:flex-row gap-4">
                <AttendanceCard history={history} />
                <PunchInCard
                  user={auth?.user}
                  handlePunchIn={handlePunchIn}
                  punchedIn={punchedIn}
                  punchTime={punchTime}
                  history={history}
                />
              </div>
            </div>
            <ScheduleCard calendarDays={calendarDays} />
          </div>

          {/* Student Marks Section */}
          <div className="w-full mt-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-800">Student Marks</h2>
              <div className="flex gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1 cursor-pointer">
                  <i className="fa fa-calendar" /> All Classes
                </span>
                <span className="flex items-center gap-1 cursor-pointer">
                  <i className="fa fa-calendar" /> All Sections
                </span>
              </div>
            </div>
            <div className="p-2">
              <StudentMarksTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
