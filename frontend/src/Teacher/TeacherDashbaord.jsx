import React, { useEffect, useState } from "react";
import TeacherSideBar from "./TeacherSideBar";
import MainHeader from "../components/MainHeader";
import TeacherProfileOverview from "./components/TeacherProfileOverview";
import ScheduleCard from "./components/ScheduleCard";
import PunchInCard from "./components/PunchInCard";
import AttendanceCard from "./components/AttendanceCard";
import { useAuth } from "../context/auth";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";

export default function TeacherDashboard() {
  const { auth } = useAuth();
  const [teacher, setTeacher] = useState({});
  const [punchedIn, setPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);
  const [history, setHistory] = useState([]);

  const [editSubject, setEditSubject] = useState(null);
  const [completion, setCompletion] = useState("");
  const [showModal, setShowModal] = useState(false);

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
          (entry) =>
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

  const handleEditClick = (subject) => {
    setEditSubject(subject);
    setCompletion(subject?.completion || "");
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v2/subject/updatasyllabus/${editSubject._id}`,
        {
          completion: completion,
        }
      );
      alert("Syllabus completion updated!");
      setShowModal(false);
      fetchDetails();
    } catch (err) {
      console.error("Error updating syllabus:", err);
      alert("Failed to update.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSideBar />
      <div className="ml-0 md:ml-64 flex-grow">
        <MainHeader />
        <div className="p-4 max-w-7xl">
          {/* Welcome Banner */}
          <div className="w-full h-[17vh] flex items-center rounded-md p-4 bg-blue-600 justify-between mb-4">
            <div className="text-white font-semibold space-y-1.5">
              <h1 className="text-2xl">Good Morning {auth?.user?.name}</h1>
              <h5 className="text-xs">Have a Good day at work</h5>
            </div>
            <img
              src="https://preskool.dreamstechnologies.com/html/template/assets/img/bg/bg-01.png"
              alt=""
              className="h-[15vh]"
            />
          </div>

          {/* Dashboard Section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full md:w-[70%] gap-4 ">
              <TeacherProfileOverview data={auth?.user} teacher={teacher} />
              <div className="flex flex-col md:flex-row gap-4 ">
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

          {/* Subjects and Syllabus Completion */}
          <div className="w-full h-auto py-3.5 justify-center flex flex-wrap gap-3.5">
            {teacher?.subject &&
              teacher?.subject.map((ele, i) => (
                <div
                  key={i}
                  className="lg:w-64 h-64 w-full shadow-xl bg-white rounded"
                >
                  <div className="w-full h-[8vh] border-b border-b-gray-300 flex justify-between items-center pt-2.5 pb-1.5 px-2.5">
                    <h1 className="uppercase font-semibold text-blue-700 text-sm">
                      {ele?.classId?.Classname}
                    </h1>
                    <p className="uppercase text-red-400 font-semibold text-sm">
                      {ele?.subjectName}
                    </p>
                    <FaUserEdit
                      className="text-green-600 text-lg cursor-pointer"
                      onClick={() => handleEditClick(ele)}
                    />
                  </div>
                  <h1 className="text-center uppercase text-sm font-semibold font-sans tracking-widest mt-1">
                    Syllabus status
                  </h1>
                  <div className="flex flex-col justify-center items-center">
                    <div className="sm:w-[130px]">
                      <Doughnut
                        data={{
                          datasets: [
                            {
                              data: [
                                ele?.completion || 0,
                                100 - (ele?.completion || 0),
                              ],
                              backgroundColor: ["#008631", "#EF4444"],
                              borderWidth: 1,
                              cutout: "60%",
                            },
                          ],
                        }}
                        options={{
                          cutout: "60%",
                          plugins: {
                            legend: { display: false },
                          },
                        }}
                      />
                    </div>
                    <ul className="flex text-sm justify-around mt-1.5 w-full">
                      <li className="text-green-700 font-semibold">
                        Complete : <span>{ele?.completion || 0}%</span>
                      </li>
                      <li className="text-red-600 font-semibold">
                        Pending :{" "}
                        <span>{100 - (ele?.completion || 0)}%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal for editing syllabus completion */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0000116c] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Edit Syllabus Completion
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Subject: <span className="font-medium">{editSubject?.subjectName}</span>
            </p>
            <input
              type="number"
              min="0"
              max="100"
              value={completion}
              onChange={(e) => setCompletion(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Enter completion %"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
