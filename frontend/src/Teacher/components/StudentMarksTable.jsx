import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Optional loader
const Loader = () => (
  <div className="flex justify-center items-center h-48">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500"></div>
  </div>
);

// ✅ Sample fallback chart data
const fakeChartData = [
  { label: "Class I", pass: 12, fail: 18 },
  { label: "Class II", pass: 28, fail: 2 },
  { label: "Class III", pass: 14, fail: 22 },
  { label: "Class IV", pass: 30, fail: 0 },
  { label: "Class V", pass: 3, fail: 27 },
];

const Card = ({ title, children }) => (
  <div className="rounded-lg bg-white shadow dark:bg-gray-900 p-5">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

export default function StudentMarksTable() {
  const [examData, setExamData] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Commented out real fetch (keep for future)

  // useEffect(() => {
  //   axios.get("https://school-management-system-1-jprf.onrender.com/api/v2/class/all").then((res) => {
  //     // handle if needed
  //   });

  //   axios.get("https://school-management-system-1-jprf.onrender.com/api/v11/exam/all").then((res) => {
  //     const currentYear = new Date().getFullYear();
  //     const data = Array.isArray(res.data.data)
  //       ? res.data.data.filter(
  //         (exam) => new Date(exam.createdAt).getFullYear() === currentYear
  //       )
  //       : [];
  //     setExamData(data);

  //     if (data.length) {
  //       const sorted = [...data].sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //       );
  //       setSelectedExam(sorted[0].examName);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!selectedExam) return;
  //   setLoading(true);
  //   axios.get("https://school-management-system-1-jprf.onrender.com/api/v11/exam/all").then((res) => {
  //     const raw = Array.isArray(res.data.data) ? res.data.data : [];
  //     const marks = raw.filter((mark) => mark.examName === selectedExam);

  //     const grouped = {};
  //     marks.forEach((mark) => {
  //       const className = mark.classId?.Classname || "Unknown";
  //       const pass = grouped[className]?.pass || 0;
  //       const fail = grouped[className]?.fail || 0;

  //       const totalMarks = Array.isArray(mark.marks)
  //         ? mark.marks.reduce((acc, curr) => acc + curr.markObtained, 0)
  //         : 0;
  //       const avg = mark.marks?.length ? totalMarks / mark.marks.length : 0;
  //       const isPass = avg >= 33;

  //       grouped[className] = {
  //         label: className,
  //         pass: isPass ? pass + 1 : pass,
  //         fail: isPass ? fail : fail + 1,
  //       };
  //     });

  //     const result = Object.values(grouped);
  //     setChartData(result);
  //     setLoading(false);
  //   });
  // }, [selectedExam]);


  // ✅ Show fake data initially
  useEffect(() => {
    setTimeout(() => {
      setChartData(fakeChartData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Card title="Pass vs Fail • Student Exam List">
      <div className="mb-4">
        <label className="text-sm font-medium mr-2">Select Exam:</label>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">-- Select Exam --</option>
          {(Array.isArray(examData) ? examData : []).map((exam, idx) => (
            <option key={idx} value={exam.examName}>
              {exam.examName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradPass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradFail" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis dataKey="label" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip contentStyle={{ background: "#ffffff", borderRadius: "0.5rem" }} labelStyle={{ fontSize: "0.75rem" }} />
            <Area type="monotone" dataKey="pass" stroke="#10b981" fillOpacity={1} fill="url(#gradPass)" strokeWidth={2} />
            <Area type="monotone" dataKey="fail" stroke="#ef4444" fillOpacity={1} fill="url(#gradFail)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
