import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function generateTimeSlots(start, end, periodDuration, lunchStart, lunchEnd) {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  function toStr(h, m) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  while (h < endH || (h === endH && m < endM)) {
    const startTime = toStr(h, m);
    m += periodDuration;
    if (m >= 60) { h += Math.floor(m / 60); m %= 60; }
    const endTime = toStr(h, m);

    if (startTime === lunchStart) {
      slots.push({ start: lunchStart, end: lunchEnd, isLunch: true });
      [h, m] = lunchEnd.split(":").map(Number);
    } else {
      slots.push({ start: startTime, end: endTime });
    }
  }
  return slots;
}

function assignSubjects(days, timeSlots, subjects) {
  const timetable = {};
  days.forEach(day => {
    timetable[day] = [];
    let subjectIndex = 0;
    timeSlots.forEach(slot => {
      if (slot.isLunch) {
        timetable[day].push({ subject: "Lunch Break", teacher: "" });
      } else {
        const subject = subjects[subjectIndex % subjects.length];
        timetable[day].push({ subject: subject.name, teacher: subject.teacher });
        subjectIndex++;
      }
    });
  });
  return timetable;
}

export default function TimeTable() {
  const [className, setClassName] = useState("Class III");
  const [subjectList, setSubjectList] = useState([
    { name: "English", teacher: "Mrs. Sharma" },
    { name: "Mathematics (Ganit)", teacher: "Mr. Verma" },
    { name: "Hindi", teacher: "Ms. Gupta" },
    { name: "Environmental Studies (EVS)", teacher: "Mr. Khan" },
    { name: "General Knowledge (GK)", teacher: "Mrs. Joshi" },
    { name: "Computer Science", teacher: "Mr. Singh" }
  ]);
  const [subjectInput, setSubjectInput] = useState({ name: '', teacher: '' });
  const [timeSlots, setTimeSlots] = useState([]);
  const [timetable, setTimetable] = useState({});

  useEffect(() => {
    const slots = generateTimeSlots("08:00", "14:00", 40, "12:00", "13:00");
    setTimeSlots(slots);
  }, []);

  useEffect(() => {
    const assigned = assignSubjects(days, timeSlots, subjectList);
    setTimetable(assigned);
  }, [subjectList, timeSlots]);

  const handleAddSubject = () => {
    if (subjectInput.name && subjectInput.teacher) {
      setSubjectList([...subjectList, subjectInput]);
      setSubjectInput({ name: '', teacher: '' });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-0 md:ml-64 w-full min-h-screen bg-gray-50">
        <MainHeader />
        <div className="p-4 sm:p-6">
          <div className="text-sm text-gray-500 mb-2">Admin &gt; Time Table</div>

          {/* Class Name Input */}
          <div className="mb-4 flex items-center gap-3">
            <label className="text-lg font-semibold text-gray-700">Class Name:</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter Class Name"
              className="border p-2 rounded w-64"
            />
          </div>

          <h1 className="text-2xl font-bold mb-6 text-gray-800">{className} Time Table</h1>

          {/* Subject Input Form */}
          <div className="mb-6 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Add Subject</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Subject Name"
                className="border p-2 rounded w-full"
                value={subjectInput.name}
                onChange={(e) => setSubjectInput({ ...subjectInput, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Teacher Name"
                className="border p-2 rounded w-full"
                value={subjectInput.teacher}
                onChange={(e) => setSubjectInput({ ...subjectInput, teacher: e.target.value })}
              />
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          {/* Time Table Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">Time</th>
                  {days.map(day => (
                    <th key={day} className="border p-2">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, idx) => (
                  <tr key={idx}>
                    <td className="border p-2 font-semibold">{slot.start} – {slot.end}</td>
                    {days.map(day => (
                      <td key={day} className="border p-2 text-sm">
                        <div>{timetable[day]?.[idx]?.subject}</div>
                        <div className="text-gray-500">{timetable[day]?.[idx]?.teacher}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
