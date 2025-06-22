import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function TopSubjectsCard() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [classList, setClassList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v2/class/all");
        setClassList(res.data);
        if (res.data.length > 0) {
          setSelectedClass(res.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch classes", err);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedClass?._id) return;
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/v2/subject/ClassId/${selectedClass._id}`
        );
        const colorPool = [
          "#dc2626", "#60a5fa", "#2563eb", "#22c55e", "#eab308", "#ef4444", "#4f46e5"
        ];
        const coloredSubjects = res.data.map((subj, i) => ({
          name: subj.subjectName,
          value: subj.completion || 0,
          color: colorPool[i % colorPool.length],
        }));
        setSubjects(coloredSubjects);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch subjects", err);
        setSubjects([]);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedClass]);

  return (
    <div className="bg-gray-50 rounded border border-gray-300 shadow-md h-full w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-b-gray-300 relative">
        <h2 className="text-sm font-semibold text-gray-800">Complete Syllabus</h2>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-xs font-medium text-gray-700 px-2 py-1 transition"
          >
            <span>{selectedClass?.Classname || "Loading..."}</span>
            <FaAngleDown className="w-3 h-3" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 z-10 w-[140px] bg-white border border-gray-300 rounded shadow-md text-sm overflow-hidden">
              {classList.map((cls) => (
                <div
                  key={cls._id}
                  onClick={() => {
                    setSelectedClass(cls);
                    setDropdownOpen(false);
                  }}
                  className={`px-2 py-1 cursor-pointer hover:bg-blue-100 transition ${selectedClass?._id === cls._id
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-gray-700"
                    }`}
                >
                  {cls.Classname}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="bg-green-50 text-green-700 text-xs font-medium flex items-start gap-2 p-2 rounded border border-green-200 mb-4 animate-pulse">
          <FaInfoCircle className="mt-0.5 w-4 h-4" />
          <p>These results are obtained from the syllabus completion of the selected class.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[35vh]">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 border-4 border-t-transparent border-indigo-600 rounded-full animate-spin3D" />
              <div className="absolute inset-1 border-4 border-b-transparent border-indigo-400 rounded-full animate-spin3DReverse" />
            </div>
          </div>
        ) : (
          <div className="space-y-4 overflow-y-auto pr-1 h-[35vh]">
            {subjects.map((subj, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-xs text-gray-700 font-medium flex justify-between">
                  <span>{subj.name}</span>
                  <span className="text-gray-500 font-semibold">{subj.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-in-out"
                    style={{
                      width: `${subj.value}%`,
                      backgroundColor: subj.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
