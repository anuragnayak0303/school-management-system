import React from "react";
import Sidebar from "./Sidebar";
import MainHeader from "../components/MainHeader";

const dummyCourses = [
  {
    title: "9th",
    subjects: ["9th Subject", "sods"],
    plan: "asdfasdf , Academic 25",
  },
  {
    title: "8th",
    subjects: ["8th Subject"],
    plan: "+0",
  },
  {
    title: "Web development",
    subjects: [],
    plan: "+0",
  },
  {
    title: "MBA Finance",
    subjects: [],
    plan: "+0",
  },
  {
    title: "MBA Finance",
    subjects: [],
    plan: "+0",
  },
  {
    title: "MBA Finance",
    subjects: [],
    plan: "+0",
  },
];

const CourseManagement = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="md:ml-64 w-full min-h-screen bg-gray-100">
        <MainHeader />
        <div className="p-4 sm:p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-2">Admin &gt; Course</div>

          {/* Header & Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-md mb-6 shadow-sm">
            <h1 className="text-xl font-bold text-gray-800">Course Management</h1>
            <button className="mt-3 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              Add Course
            </button>
          </div>

          {/* Course Section */}
          <h2 className="text-lg font-semibold mb-2">Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyCourses.map((course, index) => (
              <div key={index} className="bg-white p-4 rounded shadow-sm border">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-base">{course.title}</h3>
                  <div className="flex gap-2 text-blue-500">
                    <button title="Edit">✏️</button>
                    <button title="Delete" className="text-red-500">🗑️</button>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-medium mb-1">Subjects:</p>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {course.subjects.length > 0 ? (
                      course.subjects.map((subj, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs"
                        >
                          {subj}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No subjects</span>
                    )}
                  </div>
                  <p className="font-medium">Plan:</p>
                  <p className="text-gray-600 text-sm mt-1">{course.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseManagement;
