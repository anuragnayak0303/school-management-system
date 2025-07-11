import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainHeader from "../components/MainHeader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddSubjectBatch from "./components/AddSubjectBatch";
import EditSubjectForm from "./components/EditSubjectForm";
import { MdDelete } from "react-icons/md";

const CourseManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [AllClasses, setAllClasses] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);
  const [initialClassId, setInitialClassId] = useState("");
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [IsError, setIsError] = useState("");

  useEffect(() => {
    if (IsError) {
      const timeout = setTimeout(() => setIsError(""), 4000);
      return () => clearTimeout(timeout);
    }
  }, [IsError]);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    if (!isFormOpen) {
      setEditingSubjectId(null);
      setEditingSubject(null);
      setInitialClassId("");
    }
  };

  const getClasses = async () => {
    try {
      const { data } = await axios.get("https://school-management-system-1-jprf.onrender.com/api/v2/class/all");
      setAllClasses(data);
    } catch (error) {
      toast.error("Failed to load classes");
    }
  };

  const getSubjects = async () => {
    try {
      const { data } = await axios.get("https://school-management-system-1-jprf.onrender.com/api/v2/subject/all");
      setAllSubjects(data);
    } catch (error) {
      toast.error("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  const handleEditSubject = (subj) => {
    setEditingSubjectId(subj._id);
    setInitialClassId(subj.classId?._id || "");
    setEditingSubject([
      {
        subjectId: subj._id,
        subjectName: subj.subjectName,
        subjectType: subj.subjectType,
        subjectCode: subj.subjectCode?.replace("#00", ""),
      },
    ]);
    setIsFormOpen(true);
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      const { data } = await axios.delete(`https://school-management-system-1-jprf.onrender.com/api/v2/subject/delete-multiple/${id}`);
      if (data?.success) {
        toast.success(data?.message);
        getSubjects();
      } else {
        setIsError(data?.message || "Unable to delete subject.");
      }
    } catch (error) {
      setIsError("Failed to delete subject.");
    }
  };

  const handleSubmitSubjects = async ({ classId, subjects }) => {
    try {
      if (editingSubjectId) {
        await axios.put(`https://school-management-system-1-jprf.onrender.com/api/v2/subject/update/${editingSubjectId}`, {
          subjects,
        });
        setEditingSubjectId("");
        setInitialClassId("");
        setEditingSubject([]);
        toast.success("Subject(s) updated successfully");
      } else {
        await axios.post("https://school-management-system-1-jprf.onrender.com/api/v2/subject/add", {
          classId,
          subjects,
        });
        toast.success("Subject(s) added successfully");
      }
      getSubjects();
      toggleForm();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Submit failed");
    }
  };

  const filteredSubjects = allSubjects.filter((subj) => {
    const matchName = subj.subjectName.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass ? subj.classId?._id === filterClass : true;
    return matchName && matchClass;
  });

  return (
    <div className="flex flex-col md:flex-row relative">
      <Toaster />

      {IsError && (
        <div className="fixed top-0 left-[60%] transform -translate-x-1/2 z-[9999] w-full max-w-md bg-pink-50 border border-pink-200 text-pink-800 px-4 py-3 rounded-b-lg shadow-md flex items-center justify-between animate-slideDown">
          <p className="text-sm font-medium truncate">{IsError}</p>
          <button
            onClick={() => setIsError("")}
            className="ml-4 text-pink-600 hover:text-pink-800 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <Sidebar />
      <main className="ml-0 md:ml-64 w-full min-h-screen bg-gray-50 bg-gradient-to-br from-white via-gray-50 to-white animate-fade-in">
        <MainHeader />
        <div className="p-4 sm:p-6">
          <div className="text-sm text-gray-500 mb-2">Admin &gt; Subject</div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl mb-6 shadow-sm border border-purple-200">
            <h1 className="text-2xl font-bold text-purple-700 drop-shadow-md">📘 Subject Management</h1>
            <button
              onClick={toggleForm}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm shadow hover:brightness-110 transition"
            >
              + Add Subject
            </button>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center">
            <input
              type="search"
              placeholder="Search Subject"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 bg-white shadow-sm focus:shadow-md rounded-md px-4 py-2 flex-1 outline-none focus:ring-1 focus:ring-purple-300 transition transform"
            />
            <select
              className="border border-gray-300 bg-white shadow-sm focus:shadow-md rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-300 transition transform"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="">Filter by Class</option>
              {AllClasses.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  Class {cls.Classname || cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin shadow-2xl"></div>
                <span className="ml-4 text-purple-600 font-semibold animate-pulse">Loading subjects...</span>
              </div>
            ) : filteredSubjects.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No subjects found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubjects.map((subj) => (
                  <div
                    key={subj._id}
                    className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg p-5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">
                        📘 {subj.subjectName}
                      </h2>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditSubject(subj)}
                          title="Edit Subject"
                          className="text-blue-600 hover:bg-blue-100 p-1.5 rounded-full transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2L9 13m-6 8h18" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subj._id)}
                          title="Delete Subject"
                          className="text-red-600 hover:bg-red-100 p-1.5 rounded-full transition"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><span className="font-medium text-gray-600">🏫 Class:</span> {subj.classId?.Classname || subj.classId?.name}</p>
                      <p><span className="font-medium text-gray-600">🧾 Code:</span> {subj.subjectCode}</p>
                      <p><span className="font-medium text-gray-600">🧠 Type:</span> {subj.subjectType}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer form */}
          {editingSubjectId ? (
            <EditSubjectForm
              isOpen={isFormOpen}
              toggleForm={toggleForm}
              onSubmit={handleSubmitSubjects}
              classList={AllClasses}
              initialClassId={initialClassId}
              initialSubject={editingSubject}
            />
          ) : (
            <AddSubjectBatch
              isOpen={isFormOpen}
              toggleForm={toggleForm}
              onSubmit={handleSubmitSubjects}
              classList={AllClasses}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseManagement;
