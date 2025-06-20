// Enhanced Admin Dashboard with Better Styling and Animations
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
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import AdminSheduleCard from "./components/AdminSheduleCard";
import RecentEvent from "./components/RecentEvent";
import AttendanceGraph from "./components/AttendanceGraph";
import { FaUserPlus } from "react-icons/fa";
import AdminAttendanceCard from "./components/AdminAttendanceCard";
import QuickLinksCard from "./components/QuickLinksCard";
import PerformanceCard from "./components/PerformanceCard";
import FeesBarChart from "./components/FeesBarChart";
import LeaveRequestsCard from "./components/LeaveRequestsCard";
import TopSubjectsCard from "./components/TopSubjectsCard";
import StudentActivityCard from "./components/StudentActivityCard";

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

const quickLinks = [
  { label: "Calendar", icon: "🗓️", bg: "bg-green-100", color: "text-green-600" },
  { label: "Exam Result", icon: "📘", bg: "bg-blue-100", color: "text-blue-600" },
  { label: "Attendance", icon: "📝", bg: "bg-yellow-100", color: "text-yellow-600" },
  { label: "Fees", icon: "💰", bg: "bg-cyan-100", color: "text-cyan-600" },
  { label: "Home Works", icon: "📋", bg: "bg-red-100", color: "text-red-600" },
  { label: "Reports", icon: "📄", bg: "bg-sky-100", color: "text-sky-600" },
];

const Loader = () => (
  <div className="flex justify-center items-center h-60">
    <div className="w-12 h-12 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
  </div>
);



const SummaryCard = ({ imgSrc, title, total, active, inactive, badgeColor }) => {
  const lightBg = badgeColor.replace("bg-", "bg-opacity-10 ") + " " + badgeColor;

  return (
    <div className="bg-gray-50 rounded shadow-md border border-gray-300 hover:shadow-2xl p-4 transition duration-300 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className={`rounded-full p-3 ${lightBg}`}>
          <img src={imgSrc} alt={title} className="w-8 h-8 object-contain" />
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">{total}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
        <div className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${badgeColor}`}>
          {((inactive / total) * 100).toFixed(1)}%
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <span>Active: <span className="font-bold text-green-600">{active}</span></span>
        <span className="text-gray-400">|</span>
        <span>Inactive: <span className="font-bold text-red-500">{inactive.toString().padStart(2, "0")}</span></span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [marqueeText, setMarqueeText] = useState("Welcome to the School Management Dashboard");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleMarqueeSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`http://localhost:8000/api/marquee/add`, { text: inputValue }, { headers: { Authorization: `Bearer ${auth?.token}` } });
      toast.success("Added successfully");
      setMarqueeText(inputValue);
      setInputValue("");
    } catch (error) {
      toast.error("Failed to add marquee text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100">
        <MainHeader />

        <div className="p-4 sm:p-6">
          <div className="text-sm text-gray-500 mb-2">Admin &gt; Dashboard</div>
          <div className="w-full p-4 flex justify-between items-center ">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <button className="flex items-center space-x-2.5 p-1.5 cursor-pointer bg-rose-500 text-white font-semibold rounded"><FaUserPlus /> <span className="text-xs">Add New Student</span></button>
          </div>

          <div className="w-full h-[15vh] rounded bg-[#202C4B] border border-[#202C4B] flex items-center mb-4">
            <div className="w-2/4 h-auto px-4 py-1.5 text-white space-y-3">
              <h1 className="text-2xl font-semibold ">Welcome Back, Mr. Herald</h1>
              <p>Have a Good day at work</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {loading ? <Loader /> : (
              <>
                <SummaryCard imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/student.svg" title="Total Students" total={3654} active={3643} inactive={11} badgeColor="bg-red-500" />
                <SummaryCard imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/teacher.svg" title="Total Teachers" total={284} active={254} inactive={30} badgeColor="bg-blue-500" />
                <SummaryCard imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/staff.svg" title="Total Staff" total={162} active={161} inactive={2} badgeColor="bg-yellow-500" />
                <SummaryCard imgSrc="https://preskool.dreamstechnologies.com/html/template/assets/img/icons/subject.svg" title="Total Subjects" total={82} active={81} inactive={1} badgeColor="bg-green-500" />
              </>
            )}
          </div>
          <div className="flex w-flex h-auto flex-col lg:flex-row gap-4  mt-5" >
            <AdminSheduleCard />
            <AdminAttendanceCard />
            <div className=" w-full lg:w-[33%] h-full ">
              <QuickLinksCard />
              <PerformanceCard />
            </div>
          </div>
          <div className="w-full h-auto  mt-5 lg:flex justify-between">
            <div className="w-full lg:w-[65%] h-[42vh] ">
              {/* student Graph */}
              <FeesBarChart />
            </div>
            <div className="w-full mt-4 lg:mt-0 lg:w-[33%] h-[42vh] ">
              <LeaveRequestsCard />
            </div>

          </div>

          <div className="w-full h-auto  lg:flex justify-between">
            <div className="w-full lg:w-[31%] mt-5 h-[57vh] ">
              <TopSubjectsCard />
            </div>
            <div className="w-full lg:w-[31%] mt-5 h-[57vh] ">
              <StudentActivityCard />
            </div>
            <div className="w-full lg:w-[34%] flex h-[57vh] mt-5 border justify-between">
              <div className="w-[200px] lg:w-[169px] h-full border border-amber-300">

              </div>
              <div className="w-[200px] lg:w-[169px] h-full border border-amber-800">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
