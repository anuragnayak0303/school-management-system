import React, { useState } from 'react';
import TeacherSidebar from './TeacherSideBar';
import MainHeader from '../components/MainHeader';

const dummyData = {
  "Class 1": ["John Doe", "Jane Smith", "Alice Johnson"],
  "Class 2": ["Bob Lee", "Sarah Khan", "Tom Hardy"]
};

export default function StudentAttendenc() {
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [attendance, setAttendance] = useState(
    dummyData["Class 1"].map(name => ({ name, status: "" }))
  );

  const handleClassChange = (e) => {
    const className = e.target.value;
    setSelectedClass(className);
    setAttendance(dummyData[className].map(name => ({ name, status: "" })));
  };

  const handleStatusChange = (index, status) => {
    const updated = [...attendance];
    updated[index].status = status;
    setAttendance(updated);
  };

  const handleSubmit = () => {
    console.log("Submitted Attendance:", selectedClass, attendance);
    alert("Attendance submitted!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar />
      <div className="ml-0 md:ml-64 flex-grow">
        <MainHeader />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl transition-all">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Mark Attendance
            </h2>

            {/* Class Selector */}
            <div className="flex justify-center mb-10">
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="p-3 text-lg rounded-xl border-2 border-blue-400 shadow-md w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {Object.keys(dummyData).map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 text-lg font-semibold">
                    <th className="py-4 px-6 text-left">Student Name</th>
                    <th className="py-4 px-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((student, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-800 font-medium">{student.name}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleStatusChange(index, "Present")}
                            className={`px-4 py-2 rounded-full text-white font-semibold transition 
                              ${student.status === "Present"
                                ? "bg-green-500 shadow-md"
                                : "bg-gray-300 hover:bg-green-400"}`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleStatusChange(index, "Absent")}
                            className={`px-4 py-2 rounded-full text-white font-semibold transition 
                              ${student.status === "Absent"
                                ? "bg-red-500 shadow-md"
                                : "bg-gray-300 hover:bg-red-400"}`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div className="mt-10 text-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-3 rounded-xl font-bold shadow-lg transition"
              >
                Submit Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
