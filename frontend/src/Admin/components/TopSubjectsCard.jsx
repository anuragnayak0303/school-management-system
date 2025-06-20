import React, { useState } from "react";
import { FaInfoCircle, FaAngleDown } from "react-icons/fa";

const subjects = [
  { name: "Maths", value: 20, color: "#dc2626" },
  { name: "Physics", value: 35, color: "#60a5fa" },
  { name: "Chemistry", value: 50, color: "#2563eb" },
  { name: "Botany", value: 60, color: "#22c55e" },
  { name: "English", value: 45, color: "#eab308" },
  { name: "Spanish", value: 70, color: "#ef4444" },
  { name: "Japanese", value: 85, color: "#dc2626" },
];

const classList = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);

export default function TopSubjectsCard() {
  const [selectedClass, setSelectedClass] = useState("Class II");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded border border-gray-300 shadow-md h-full w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-gray-300 relative">
        <h2 className="text-sm font-semibold text-gray-800">Top Subjects</h2>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-xs font-medium text-gray-700 px-2 py-1 transition"
          >
            <span>{selectedClass}</span>
            <FaAngleDown className="w-3 h-3" />
          </button>

          {/* Dropdown List */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 z-10 w-[72px] bg-white border border-gray-300 rounded shadow-md text-sm overflow-hidden">
              {classList.map((cls, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedClass(cls);
                    setDropdownOpen(false);
                  }}
                  className={`px-2 py-1 cursor-pointer hover:bg-blue-100 transition ${
                    selectedClass === cls ? "bg-blue-50 font-semibold text-blue-700" : "text-gray-700"
                  }`}
                >
                  {cls}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Info Note */}
        <div className="bg-green-50 text-green-700 text-xs font-medium flex items-start gap-2 p-2 rounded border border-green-200 mb-4">
          <FaInfoCircle className="mt-0.5 w-4 h-4" />
          <p>
            These Results are obtained from the syllabus completion on the
            respective class.
          </p>
        </div>

        {/* Subject Progress List */}
        <div className="space-y-4 overflow-y-auto pr-1 h-[35vh]">
          {subjects.map((subj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-xs text-gray-700 font-medium">{subj.name}</div>
              <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${subj.value}%`,
                    backgroundColor: subj.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
