import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import MainHeader from "../components/MainHeader";
import Sidebar from "./Sidebar";
import axios from "axios";
import toast from 'react-hot-toast'
import { useAuth } from "../context/auth";

// Dummy data
const studentVisitData = [
  { year: "2021", visits: 1200 },
  { year: "2022", visits: 2100 },
  { year: "2023", visits: 3000 },
  { year: "2024", visits: 2500 },
  { year: "2025", visits: 3600 },
];

const studentAdmissionData = [
  { year: "2021", admissions: 850 },
  { year: "2022", admissions: 1350 },
  { year: "2023", admissions: 1800 },
  { year: "2024", admissions: 2200 },
  { year: "2025", admissions: 2650 },
];

const classWiseAdmissions = [
  { year: "2021", Class1: 120, Class2: 100, Class3: 90 },
  { year: "2022", Class1: 140, Class2: 110, Class3: 95 },
  { year: "2023", Class1: 160, Class2: 120, Class3: 110 },
  { year: "2024", Class1: 180, Class2: 150, Class3: 125 },
  { year: "2025", Class1: 200, Class2: 170, Class3: 140 },
];

// Summary Card Component
const SummaryCard = ({ imgSrc, title, total, active, inactive, badgeColor }) => {
  const lightBg = badgeColor.replace("bg-", "bg-opacity-10 ").concat(" ", badgeColor);

  return (
    <div className="bg-white rounded-xl shadow-sm w-full transition hover:shadow-md duration-300 border border-gray-100">
      <div className="flex justify-between items-center p-4">
        <div className={`rounded-full p-3 ${lightBg}`}>
          <img src={imgSrc} alt={title} className="w-8 h-8 object-contain" />
        </div>
        <div className="flex flex-col items-end text-right">
          <div className="text-xl font-semibold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
        <div className={`text-xs font-semibold h-5 text-white px-2 py-0.5 rounded-full ${badgeColor}`}>
          {((inactive / total) * 100).toFixed(1)}%
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="flex justify-between text-sm text-gray-600 px-4 py-3">
        <span>
          Active: <span className="font-bold text-green-600">{active}</span>
        </span>
        <span className="text-gray-400">|</span>
        <span>
          Inactive: <span className="font-bold text-red-500">{inactive.toString().padStart(2, "0")}</span>
        </span>
      </div>
    </div>
  );
};

// Main Dashboard Page
export default function Dashboard() {
  const [marqueeText, setMarqueeText] = useState("Welcome to the School Management Dashboard");
  const [inputValue, setInputValue] = useState("");
  const { auth } = useAuth()
  const handleMarqueeSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(`http://localhost:8000/api/marquee/add`, { text: inputValue }, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      console.log(data)
      toast.success("Add Successfully ")
    } catch (error) {
      console.log(error)
    }
    setMarqueeText(inputValue);
    setInputValue("");
  };
  useEffect(() => {

  }, [auth])


  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-0 md:ml-64 w-full min-h-screen bg-gray-50">
        <MainHeader />

        {/* Marquee Display */}
    

        <div className="p-4 sm:p-6">
          <div className="text-sm text-gray-500 mb-2">Admin &gt; Dashboard</div>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

          {/* Marquee Input Card */}
          <div className="bg-white rounded-lg shadow p-5 mb-6 max-w-xl">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Set Marquee Text</h2>
            <form onSubmit={handleMarqueeSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter marquee message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <SummaryCard
              imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/student.svg"
              title="Total Students"
              total={3654}
              active={3643}
              inactive={11}
              badgeColor="bg-red-500"
            />
            <SummaryCard
              imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/teacher.svg"
              title="Total Teachers"
              total={284}
              active={254}
              inactive={30}
              badgeColor="bg-blue-500"
            />
            <SummaryCard
              imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/staff.svg"
              title="Total Staff"
              total={162}
              active={161}
              inactive={2}
              badgeColor="bg-yellow-500"
            />
            <SummaryCard
              imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/subject.svg"
              title="Total Subjects"
              total={82}
              active={81}
              inactive={1}
              badgeColor="bg-green-500"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Student Visit Chart */}
            <div className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Student Visits per Year</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={studentVisitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#4F46E5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Student Admission Chart */}
            <div className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Student Admissions per Year</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentAdmissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="admissions" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Class-wise Admissions Chart */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Class-wise Admissions per Year
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={classWiseAdmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Class1" fill="#3B82F6" name="Class 1" />
                <Bar dataKey="Class2" fill="#F59E0B" name="Class 2" />
                <Bar dataKey="Class3" fill="#10B981" name="Class 3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
