import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function ScheduleCard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const getMonthDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDay; i++) daysArray.push(null);
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i);

    return daysArray;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    if (!day) return;
    alert(`You clicked on ${day} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`);
  };

  const calendarDays = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="w-full md:w-[30%] h-[102vh] bg-white rounded shadow-xl p-5 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Schedules</h2>
        <a href="#" className="text-blue-600 text-sm hover:underline font-medium">
          + Add New
        </a>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-3">
          <button onClick={() => changeMonth(-1)} className="hover:text-blue-600 bg-amber-100 rounded-full p-1 shadow-gray-400 drop-shadow-sm active:shadow">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="text-base font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={() => changeMonth(1)} className="hover:text-blue-600 bg-amber-100 rounded-full p-1 shadow-gray-400 drop-shadow-sm active:shadow">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-xs text-gray-400 mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-sm text-gray-700">
          {calendarDays.map((day, i) => {
            const isToday =
              day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            return (
              <div
                key={i}
                onClick={() => handleDayClick(day)}
                className="h-8 flex items-center justify-center cursor-pointer"
              >
                {day ? (
                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-100 transition ${isToday ? "bg-blue-600 text-white font-semibold" : ""
                      }`}
                  >
                    {day}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events */}
      <h3 className="font-semibold text-gray-800 text-base mb-3"> Upcoming Events</h3>
      <div className="h-[53vh] overflow-y-scroll">

        {/* Event 1 */}
        <div className="border-l-2 border-red-500 shadow-md p-3 mb-4 ">
          <div className="flex justify-between text-sm text-gray-800 font-medium mb-2">
            <span>Vacation Meeting</span>
            <span className="text-xs text-gray-500">07 Jul 2024</span>
          </div>
          <hr className="border-gray-300 py-1.5" />
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span></span> 09:10 AM – 10:50 PM
          </div>
        </div>

        {/* Event 2 */}
        <div className="border-l-2 border-blue-500 shadow-md p-3 ">
          <div className="flex justify-between text-sm text-gray-800 font-medium mb-2">
            <span>Parents Teacher Meet</span>
            <span className="text-xs text-gray-500">15 Jul 2024</span>
          </div>
          <hr className="border-gray-300 py-1.5" />
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span></span> 09:10 AM – 10:50 PM
          </div>
        </div>
      </div>
    </div>
  );
}
