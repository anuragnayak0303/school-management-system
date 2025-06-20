import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { FaAngleDown } from "react-icons/fa";

const data = [
  { name: "Top", value: 45, color: "#3B82F6" },
  { name: "Average", value: 11, color: "#FBBF24" },
  { name: "Below Avg", value: 2, color: "#EF4444" },
];

const PerformanceCard = () => {
  return (
    <div className="bg-gray-50 rounded border border-gray-300 shadow w-full h-full mt-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-b-gray-300 px-4 py-3">
        <h2 className="text-[15px] tracking-wide font-semibold text-gray-800">Performance</h2>
        <div className="flex items-center gap-1 text-xs font-medium text-gray-600 cursor-pointer">
          <span>Class II</span>
          <FaAngleDown className="w-3 h-3" />
        </div>
      </div>

      {/* Body */}
      <div className="flex w-full flex-col lg:flex-row lg:justify-between  items-center px-4 py-[13px]">
        {/* Left Labels */}
        <div className="space-y-3 w-full">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-3 py-1 w-full lg:w-28 text-sm border border-dashed border-gray-300 rounded"
            >
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </span>
              <span className="font-semibold">{String(item.value).padStart(2, "0")}</span>
            </div>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="w-[65%] h-[130px] flex items-center justify-center">
          <PieChart width={130} height={130}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={38}
              outerRadius={60}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
