import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

const data = [
  { year: "2020", admissions: 800 },
  { year: "2021", admissions: 1600 },
  { year: "2022", admissions: 1200 },
  { year: "2023", admissions: 800 },
  { year: "2024", admissions: 2200 },
  { year: "2025", admissions: 2000 },
];

export default function StudentAdmissionChart() {

  //   const [data, setData] = useState([]);
  // const [totalAdmissions, setTotalAdmissions] = useState(0);

  // useEffect(() => {
  //   const fetchAdmissions = async () => {
  //     try {
  //       const res = await axios.get("https://school-management-system-1-jprf.onrender.com/api/v1/students/admissions-per-year");
  //       const apiData = res.data; // Expected format: [{ year: "2020", admissions: 150 }, ...]

  //       // Generate last 6 years (previous 5 + current)
  //       const currentYear = new Date().getFullYear();
  //       const years = Array.from({ length: 6 }, (_, i) => String(currentYear - 5 + i));

  //       // Build full data with default 0 if year missing in API response
  //       const admissionsMap = Object.fromEntries(apiData.map(item => [item.year, item.admissions]));
  //       const filledData = years.map((year) => ({
  //         year,
  //         admissions: admissionsMap[year] || 0,
  //       }));

  //       setData(filledData);
  //       const total = filledData.reduce((acc, item) => acc + item.admissions, 0);
  //       setTotalAdmissions(total);
  //     } catch (error) {
  //       console.error("Error fetching admissions:", error);
  //     }
  //   };

  //   fetchAdmissions();
  // }, []);
  return (
    <div className="bg-gray-50 border border-gray-300 shadow-md rounded w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-start  px-4 py-3 border-b border-b-gray-300">
        <div className="flex space-x-2">
          <p className="text-sm text-gray-500 font-medium">Total Admissions</p>
          <h2 className="text-sm  font-bold text-gray-900">2,200</h2>
        </div>
        <div className="w-6 h-6 rounded-lg bg-red-500 text-white flex items-center justify-center shadow-md">
          <FaChartLine className="text-sm" />
        </div>
      </div>

      {/* Graph */}
      <div className="w-full h-[80%] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="admissionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                fontSize: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
              labelStyle={{ color: "#6B7280" }}
            />
            <Area
              type="monotone"
              dataKey="admissions"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#admissionGradient)"
              dot={{ r: 3, stroke: "#3B82F6", strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
