import React from "react";
import { CalendarCheck } from "lucide-react";
import AttendanceGraph from "./AttendanceGraph ";

export default function PunchInCard({ user, handlePunchIn, punchedIn, punchTime ,history}) {
  const timeNow = new Date();

  return (
    <div className=" w-full md:w-1/2 ">
      <div className="bg-white h-full rounded shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Hi {user?.name} 👋</h2>
            <p className="text-sm text-gray-500">Welcome to your dashboard</p>
          </div>
          <img
            src={`http://localhost:8000/${user?.image}`}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600">
            {timeNow.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </h1>
          <p className="text-sm text-gray-500">
            {timeNow.toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePunchIn}
            disabled={punchedIn}
            className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center text-white text-sm font-semibold shadow-lg transition transform hover:scale-105 ${punchedIn
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-br from-green-400 to-green-600"
              }`}
          >
            <CalendarCheck className="w-6 h-6 mb-1" />
            {punchedIn ? "Punched In" : "Punch In"}
          </button>
        </div>

        <div className="text-center text-sm">
          {punchedIn ? (
            <p className="text-green-600">
              ✅ You punched in at{" "}
              {punchTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          ) : (
            <p className="text-blue-600">Please punch in to mark attendance</p>
          )}
        </div>
      </div>
{/* 
      <div className="w-full h-[30vh] border mt-3.5">
        <AttendanceGraph history={history}/>
      </div> */}
    </div>


  );
}
