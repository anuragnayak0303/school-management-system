import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecentEvent() {
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

      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const formatTime = (timeStr) => {
    return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full md:w-[30%] h-[55vh] bg-white rounded shadow p-5 text-gray-800">
      <h3 className="font-semibold text-gray-800 text-base mb-3">Upcoming Events</h3>

      <div className="h-[40vh] overflow-y-auto pr-1">
        {events && events.length > 0 ? (
          events.map((e, i) => (
            <div key={i} className="border-l-2 border-blue-500 shadow-md p-3 mb-4 bg-white rounded-md">
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
          <div className="text-sm text-gray-500 text-center mt-10">No upcoming events.</div>
        )}
      </div>
    </div>
  );
}
