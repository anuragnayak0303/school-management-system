import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import AddEventModal from "./AddEventModal";
import axios from "axios";



export default function AdminSheduleCard() {
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v8/event/all`);

      // 📅 Today's date at midnight (00:00:00)
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);

      // ✅ Filter out past events
      const upcomingEvents = data.filter(event => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0); // Ensure time is removed
        return eventDate >= todayMidnight;
      });

      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatTime = (timeStr) =>
    new Date(`1970-01-01T${timeStr}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

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
    "July", "August", "September", "October", "November", "December",
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
    <div className="w-full md:w-[32%] h-full border border-gray-300 bg-gray-50 rounded shadow-md text-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-b-gray-300 px-4 py-3">
        <h2 className="text-sm font-bold">Schedules</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 cursor-pointer text-sm hover:underline font-medium"
        >
          + Add New
        </button>
      </div>

      {/* Calendar */}
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-3">
            <button
              onClick={() => changeMonth(-1)}
              className="hover:text-blue-600 bg-amber-100 rounded-full p-1 shadow"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="text-base font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => changeMonth(1)}
              className="hover:text-blue-600 bg-amber-100 rounded-full p-1 shadow"
            >
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
        <h3 className="font-semibold text-gray-800 text-base mb-3">Upcoming Events</h3>
        <div className="overflow-y-auto h-[100px] pr-1">
          {events && events.length > 0 ? (
            events.map((e, i) => (
              <div
                key={i}
                className="border-l-2 pt-2 border-blue-500 shadow-md p-3 mb-4 bg-white rounded-md"
              >
                <div className="flex justify-between text-sm font-semibold text-blue-900 mb-2">
                  <span>{e?.title}</span>
                  <span className="text-xs text-gray-500">{formatDate(e?.startDate)}</span>
                </div>
                <hr className="border-gray-300 my-1" />
                <div className="text-xs text-gray-600 flex items-center gap-1">
                  {formatTime(e?.startTime)} – {formatTime(e?.endTime)}
                </div>
                <div className="text-xs text-gray-500 mt-1 italic">
                  {e?.category} | {e?.audience}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center mt-4">No upcoming events.</div>
          )}
        </div>

      </div>
      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
