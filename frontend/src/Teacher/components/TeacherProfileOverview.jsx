import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { NavLink } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherProfileOverview({ data ,teacher}) {
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
    <div className="w-full  flex flex-col lg:flex-row justify-between gap-4">
      {/* Teacher Info Card */}
      <div className="w-full lg:w-[55%] lg:h-[20vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border shadow bg-[#202C4B] rounded p-4">
        <div className="flex items-center gap-4">
          <img src={`http://localhost:8000/${data?.image}`} className="w-[70px] h-[70px] border rounded border-white" />
          <div>
            <p className="lg:text-[10px] bg-blue-50 w-fit text-blue-600 font-semibold px-2 py-[1px] rounded">
             {teacher?.teacherId}
            </p>
            <h1 className="text-white text-lg sm:text-xl font-semibold">{data?.name}</h1>
          </div>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-md whitespace-nowrap">
         <NavLink to={'/school/teacher/view_details'}>Edit Profile</NavLink> 
        </button>
      </div>

      {/* Syllabus Chart */}
      <div className="w-full lg:w-[43%] lg:h-[20vh] flex flex-col sm:flex-row items-center justify-center gap-4 shadow bg-white rounded p-4">
        <div className="sm:w-[100px] w-[130px] lg:[100px">
          <Doughnut data={doughnutData} options={{ cutout: "60%" }} />
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
