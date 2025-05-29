import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherProfileOverview() {
  const doughnutData = {
    datasets: [
      {
        data: [90, 10],
        backgroundColor: ["#3B82F6", "#EF4444"],
        borderWidth: 1,
        cutout: "60%",
      },
    ],
  };

  return (
    <div className="w-full max-w-[770px] h-[20vh] mt-4 flex justify-between space-x-4">
      {/* Teacher Info Card */}
      <div className="w-[55%] h-full flex items-center justify-around space-x-2 border shadow bg-[#202C4B] rounded">
        <div className="w-[70px] h-[70px] border rounded border-white" />
        <div>
          <p className="text-[10px] bg-blue-50 w-[55px] text-blue-600 font-semibold px-1.5 py-[1px] rounded">
            #T594651
          </p>
          <h1 className="text-white text-xl font-semibold">Henriques Morgan</h1>
        </div>
        <button className="bg-blue-700 text-white px-3 py-1.5 rounded-md">
          Edit Profile
        </button>
      </div>

      {/* Syllabus Chart */}
      <div className="w-[43%] h-full shadow bg-white rounded flex space-x-3.5 items-center justify-center p-4">
        <div className="w-[30%]">
          <Doughnut data={doughnutData} options={{ cutout: "100%" }} />
        </div>
        <div className="flex flex-col items-start text-sm">
          <h1 className="font-semibold text-center">Syllabus</h1>
          <div className="flex items-center gap-1 text-green-600">
            <span className="text-lg">●</span> Completed: 90%
          </div>
          <div className="flex items-center gap-1 text-red-500">
            <span className="text-lg">●</span> Pending: 10%
          </div>
        </div>
      </div>
    </div>
  );
}
