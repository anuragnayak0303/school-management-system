import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip);

export default function AdminAttendanceCard() {
  const [activeTab, setActiveTab] = useState("students");
  const [attendanceData, setAttendanceData] = useState(null);
  const nav = useNavigate()
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/attendance/");

        const total = 20;
        const today = new Date().toISOString().split("T")[0];
        console.log(today)
        const getStatusCounts = () => {
          let present = 0;
          let late = 0;

          data.forEach((entry) => {
            const punchTime = new Date(entry.punchInTime);
            // console.log(punchTime)
            const punchDate = punchTime.toISOString().split("T")[0];
            // console.log(punchDate)

            if (punchDate !== today) return;

            if (punchDate == today) {
              const hours = punchTime.getHours();
              const minutes = punchTime.getMinutes();

              if (hours < 11 || (hours === 11 && minutes < 30)) {

                present++;

              } else if (
                (hours === 11 && minutes >= 30) ||
                (hours > 11 && hours < 14) ||
                (hours === 14 && minutes <= 30)
              ) {
                late++;

              }
            }


          });

          const absent = total - (present + late);
          return {
            total,
            present,
            late,
            absent,
            emergency: 0, // Add logic if needed
          };
        };
        setAttendanceData(getStatusCounts());
      } catch (error) {
        console.error("Failed to fetch attendance data", error);
      }
    };

    fetchAttendance();
  }, []);

  console.log(attendanceData)

  const current = {
    total: attendanceData?.total,
    absent: attendanceData?.absent,
    present: attendanceData?.present,
    late: attendanceData?.late,
  };

  const chartData = {
    labels: ["Present", "Others"],
    datasets: [
      {
        data: [
          current.present,
          current.absent + current.late,
        ],
        backgroundColor: ["#3B82F6", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  const presentPercent = current?.total
    ? ((current?.present + current?.late / current?.total) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="lg:w-[33%] bg-gray-50 rounded shadow-md border border-gray-300 w-full h-[75vh] animate-fade-in flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-b-gray-300 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-700">Attendance</h3>
        <span className="text-sm text-gray-400 cursor-pointer">📅 Today</span>
      </div>

      <div className="px-4 py-[19px]">
        {/* Tabs */}
        <div className="flex justify-evenly text-sm font-medium text-gray-600">
          {["students", "teachers", "staff"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 border-b-2 ${"teachers" === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent"
                }`}
              onClick={() => "students" == tab && nav('/school/')}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-4 mb-2 p-2">
          <div className="text-center bg-gray-200 px-3 w-24 py-2 rounded">
            <p className="text-lg font-semibold text-gray-800">{current.present}</p>
            <p className="text-xs text-gray-500">Presnt</p>
          </div>
          <div className="text-center bg-gray-200 w-24 px-3 py-2 rounded">
            <p className="text-lg font-semibold text-gray-800">{current.late}</p>
            <p className="text-xs text-gray-500">Late</p>
          </div>
          <div className="text-center bg-gray-200 w-24 px-3 py-2 rounded">
            <p className="text-lg font-semibold text-gray-800">{current.absent}</p>
            <p className="text-xs text-gray-500">Absent</p>
          </div>
        </div>

        {/* Chart */}
        <div className="relative w-3/4 mx-auto my-2">
          <Doughnut
            data={chartData}
            options={{
              cutout: "65%",
              plugins: { tooltip: { enabled: false } },
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-blue-600">
            {presentPercent}%
          </div>
        </div>

        {/* View All */}
        <div className="flex justify-center mt-4">
          <button className="text-sm font-medium text-gray-700 px-4 py-1 bg-gray-100 rounded hover:bg-gray-200">
            ⬇ View All
          </button>
        </div>
      </div>
    </div>
  );
}
