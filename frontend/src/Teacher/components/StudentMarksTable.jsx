import React, { useState } from "react";
import { FaAngleDown, FaCalendarAlt } from "react-icons/fa";

const students = [
  {
    id: "35013",
    name: "Janet",
    class: "III",
    section: "A",
    marks: 89,
    cgpa: 4.2,
    status: "Pass",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "35013",
    name: "Joann",
    class: "IV",
    section: "B",
    marks: 88,
    cgpa: 3.2,
    status: "Pass",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg",
  },
  {
    id: "35011",
    name: "Kathleen",
    class: "II",
    section: "A",
    marks: 69,
    cgpa: 4.5,
    status: "Pass",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    id: "35010",
    name: "Gifford",
    class: "I",
    section: "B",
    marks: 21,
    cgpa: 4.5,
    status: "Pass",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "35009",
    name: "Lisa",
    class: "II",
    section: "B",
    marks: 31,
    cgpa: 3.9,
    status: "Fail",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export default function StudentMarksTable() {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSection, setSelectedSection] = useState("All Sections");

  const filtered = students.filter(
    (s) =>
      (selectedClass === "All Classes" || s.class === selectedClass) &&
      (selectedSection === "All Sections" || s.section === selectedSection)
  );

  return (
    <div className="w-full h-full bg-white rounded overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <h2 className="font-semibold text-base">Student Marks</h2>
        <div className="flex gap-3 text-sm items-center">
          {/* Class Filter */}
          <button
            onClick={() =>
              setSelectedClass((prev) =>
                prev === "All Classes" ? "I" : "All Classes"
              )
            }
            className="flex items-center gap-1 bg-white text-blue-700 px-3 py-1 rounded-full border shadow-sm hover:bg-blue-100 transition"
          >
            <FaCalendarAlt className="text-sm" />
            {selectedClass}
            <FaAngleDown className="text-xs" />
          </button>

          {/* Section Filter */}
          <button
            onClick={() =>
              setSelectedSection((prev) =>
                prev === "All Sections" ? "A" : "All Sections"
              )
            }
            className="flex items-center gap-1 bg-white text-blue-700 px-3 py-1 rounded-full border shadow-sm hover:bg-blue-100 transition"
          >
            <FaCalendarAlt className="text-sm" />
            {selectedSection}
            <FaAngleDown className="text-xs" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="py-2 px-4 font-medium">ID</th>
              <th className="py-2 px-4 font-medium">Name</th>
              <th className="py-2 px-4 font-medium">Class</th>
              <th className="py-2 px-4 font-medium">Section</th>
              <th className="py-2 px-4 font-medium">Marks %</th>
              <th className="py-2 px-4 font-medium">CGPA</th>
              <th className="py-2 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr
                key={idx}
                className="border-b border-b-gray-300 hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4">{student.id}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <span className="text-gray-800 font-medium">
                    {student.name}
                  </span>
                </td>
                <td className="py-3 px-4">{student.class}</td>
                <td className="py-3 px-4">{student.section}</td>
                <td className="py-3 px-4 text-blue-600 font-semibold">
                  {student.marks}%
                </td>
                <td className="py-3 px-4 text-indigo-600">{student.cgpa}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      student.status === "Pass"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
