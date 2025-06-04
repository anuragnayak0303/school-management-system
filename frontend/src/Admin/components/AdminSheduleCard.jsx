import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import AddEventModal from "./AddEventModal";



export default function AdminSheduleCard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
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
    <div className="w-full md:w-[30%] h-[50vh] bg-white rounded shadow p-5 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Schedules</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 text-sm hover:underline font-medium"
        >
          + Add New
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-3">
          <button onClick={() => changeMonth(-1)} className="hover:text-blue-600 bg-amber-100 rounded-full p-1">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="text-base font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={() => changeMonth(1)} className="hover:text-blue-600 bg-amber-100 rounded-full p-1">
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
                    className={`w-7 h-7 flex items-center justify-center rounded-full hover:bg-blue-100 transition ${isToday ? "bg-blue-600 text-white font-semibold" : ""}`}
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

      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
