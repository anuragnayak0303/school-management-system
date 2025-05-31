import React, { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function AttendanceCard({ history }) {
  const { dayStatus, attendanceData, dateRangeText } = useMemo(() => {
    const startOfWeek = dayjs().startOf("week").add(1, "day"); // Monday
    const today = dayjs();
    const thisWeekDates = Array.from({ length: 7 }, (_, i) =>
      startOfWeek.add(i, "day")
    );

    const dayStatusArray = new Array(7).fill("absent"); // default
    const counts = {
      Present: 0,
      Absent: 0,
      "Half Day": 0,
    };

    history.forEach((entry) => {
      const entryTime = dayjs(entry.createdAt);
      const dayIndex = thisWeekDates.findIndex((d) =>
        d.isSame(entryTime, "day")
      );

      if (dayIndex !== -1 && dayIndex !== 6) {
        const hour = entryTime.hour();

        if (hour >= 10 && hour < 11) {
          dayStatusArray[dayIndex] = "present";
          counts.Present++;
        } else if (hour >= 11) {
          dayStatusArray[dayIndex] = "halfday";
          counts["Half Day"]++;
        }
      }
    });

    thisWeekDates.forEach((date, idx) => {
      if (idx === 6) {
        dayStatusArray[idx] = "sunday";
      } else if (dayjs().isBefore(date, "day")) {
        dayStatusArray[idx] = "future"; // mark as future
      } else if (dayStatusArray[idx] === "absent") {
        counts.Absent++;
      }
    });

    const attendanceData = [
      { name: "Present", value: counts.Present, color: "#22C55E" },
      { name: "Absent", value: counts.Absent, color: "#EF4444" },
      { name: "Half Day", value: counts["Half Day"], color: "#BFDBFE" },
    ];

    const dateRangeText = `${thisWeekDates[0].format("D MMM")} - ${thisWeekDates[6].format("D MMM")}`;

    return { dayStatus: dayStatusArray, attendanceData, dateRangeText };
  }, [history]);

  const getDayColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-500 text-white";
      case "halfday":
        return "bg-blue-200 text-blue-700";
      case "absent":
        return "bg-red-500 text-white";
      case "sunday":
        return "bg-black text-white";
      case "future":
        return "bg-white text-gray-300 border border-gray-200";
      default:
        return "bg-gray-200 text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded shadow-lg p-6 space-y-4 w-full h-[80vh] md:w-1/2">
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
              className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${getDayColor(dayStatus[idx])}`}
            >
              {d}
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-500">{dateRangeText}</div>
      </div>

      <div className="grid grid-cols-3 text-center text-sm font-medium text-gray-600">
        {attendanceData.map((item, i) => (
          <div key={i}>
            <div className="text-xl font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
            <div>{item.name}</div>
          </div>
        ))}
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
  );
}
