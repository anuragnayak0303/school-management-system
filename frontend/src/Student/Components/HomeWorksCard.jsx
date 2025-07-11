// src/pages/Components/HomeWorksCard.jsx
import React, { useContext, useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { AuthStudentContext } from "../../context/StudentAuth";
import axios from "axios";

/* ------------------------------------
 * IMAGE POOL
 * ------------------------------------
 * Instead of a single static thumbnail per subject, we keep a pool
 * of cheerful homework‑style images and pick one at random for each
 * card. Feel free to replace any URLs with your own assets.
 */
const imagePool = [
  "https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-01.jpg",
  "https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-02.jpg",
  "https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-03.jpg",
  "https://preskool.dreamstechnologies.com/html/template/assets/img/home-work/home-work-04.jpg",
];

const getRandomImage = () =>
  imagePool[Math.floor(Math.random() * imagePool.length)];

/* ------------------------------------
 * COLOUR ACCENT PER SUBJECT
 * ------------------------------------ */
const subjectColors = {
  English: "text-sky-600",
  Mathematics: "text-red-600",
  Maths: "text-red-600",
  Physics: "text-blue-600",
  Chemistry: "text-green-600",
};
const getSubjectColor = (name = "Unknown") =>
  subjectColors[name] || "text-gray-600";

/* ------------------------------------
 * PROGRESS HELPERS
 * ------------------------------------ */
const calcProgress = (createdAt, dueDate) => {
  try {
    const start = new Date(createdAt);
    const end = new Date(dueDate);
    const now = new Date();
    if (end <= start) return 100;
    const pct = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(Math.round(pct), 0), 100);
  } catch {
    return 0;
  }
};
const getStrokeColor = (pct) => {
  if (pct >= 70) return "#22c55e"; // green
  if (pct >= 40) return "#eab308"; // amber
  return "#ef4444"; // red
};

/* ------------------------------------
 * COMPONENT
 * ------------------------------------ */
export default function HomeWorksCard() {
  const { student } = useContext(AuthStudentContext);
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(
        `https://school-management-system-1-jprf.onrender.com/api/v9/assignments/class/${student?.class?._id}`
      );
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load assignments", err);
    }
  };

  useEffect(() => {
    if (student?.class?._id) fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student?.class?._id]);

  return (
    <div className="w-full h-full bg-white rounded shadow-md border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
        <h2 className="text-sm font-semibold text-gray-700">Home Works</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FaBookOpen />
          <span className="text-sm font-semibold text-gray-700">All Subjects</span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4 p-4 overflow-y-auto h-[56vh]">
        {assignments.map((hw) => {
          const subjectName = hw?.subject?.subjectName || "Unknown";
          const progress = calcProgress(hw.createdAt, hw.dueDate);
          const due = new Date(hw.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={hw._id}
              className="flex justify-between items-center border-b border-gray-300 pb-4 last:border-b-0 last:pb-0"
            >
              {/* Thumbnail */}
              <img
                src={getRandomImage()}
                alt={subjectName}
                className="w-12 h-12 rounded object-cover"
              />

              {/* Details */}
              <div className="flex flex-col w-[70%] ml-3">
                <span
                  className={`text-xs font-medium flex items-center ${getSubjectColor(
                    subjectName
                  )}`}
                >
                  <IoPricetagOutline className="mr-1 -rotate-180" />
                  {subjectName}
                </span>
                <span className="text-sm font-semibold text-gray-700 truncate">
                  {hw.title}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {hw.teacher?.userId ?? ""} • Due : {due}
                </span>
              </div>

              {/* Progress Ring */}
              <div className="w-10 h-10 relative">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke={getStrokeColor(progress)}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${progress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                  {progress}%
                </div>
              </div>
            </div>
          );
        })}

        {assignments.length === 0 && (
          <p className="text-sm text-center text-gray-500 pt-8">
            No homework assigned yet.
          </p>
        )}
      </div>
    </div>
  );
}
