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

        </div>
      </main>
    </div>
  );
};

export default CourseManagement;
