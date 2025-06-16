// Enhanced CourseManagement.js with colorful 3D effects, animation, and loading indicator

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainHeader from "../components/MainHeader";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SubjectSearchFilter from "./components/SubjectSearchFilter ";
import SubjectTable from "./components/SubjectTable ";
import SubjectForm from "./components/SubjectForm";
import { Loader2 } from 'lucide-react';

const CourseManagement = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [AllClasses, setAllClasses] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  const [subjectName, setSubjectName] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const [editingSubjectId, setEditingSubjectId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleForm = () => {
    if (isFormOpen) resetForm();
    setIsFormOpen(!isFormOpen);
  };

  const resetForm = () => {
    setSubjectName("");
    setSubjectType("");
    setClassId("");
    setSubjectCode("");
    setEditingSubjectId(null);
  };

  const getClasses = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v2/class/all");
      setAllClasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/v2/subject/all");
      setAllSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClasses();
    getSubjects();
  }, []);

  const handleEditSubject = (subj) => {
    setSubjectName(subj.subjectName);
    setSubjectType(subj.subjectType);
    setClassId(subj.classId?._id || "");
    setSubjectCode(subj.subjectCode || "");
    setEditingSubjectId(subj._id);
    setIsFormOpen(true);
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v2/subject/delete-multiple/${id}`);
      toast.success("Subject deleted successfully");
      getSubjects();
    } catch (error) {
      console.error("Failed to delete subject:", error.response?.data || error.message);
      toast.error("Failed to delete subject");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjectData = { subjectName, subjectType, classId, subjectCode };

    try {
      if (editingSubjectId) {
        await axios.put(`http://localhost:8000/api/v2/subject/update/${editingSubjectId}`, subjectData);
        toast.success("Subject updated successfully");
      } else {
        await axios.post("http://localhost:8000/api/v2/subject/add", subjectData);
        toast.success("Subject added successfully");
      }
      getSubjects();
      resetForm();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting subject:", error.response?.data || error.message);
      toast.error(editingSubjectId ? "Failed to update subject" : "Failed to add subject");
    }
  };

  const filteredSubjects = allSubjects.filter((subj) => {
    const matchName = subj.subjectName.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass ? subj.classId?._id === filterClass : true;
    return matchName && matchClass;
  });

  return (
    <div className="flex flex-col md:flex-row">
      <Toaster />
      <Sidebar />
      <main className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 animate-fade-in">
        <MainHeader />

        <div className="p-4 sm:p-6">
          <div className="text-sm text-gray-500 mb-2">Admin &gt; Subject</div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl mb-6 shadow-xl border border-purple-200">
            <h1 className="text-2xl font-bold text-purple-700 drop-shadow-md">📘 Subject Management</h1>
            <button
              onClick={toggleForm}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-full text-sm shadow hover:scale-105 transition-transform"
            >
              {editingSubjectId ? "Edit Subject" : "Add Subject"}
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-[50vh] animate-pulse">
              <div className="w-16 h-16 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="text-indigo-600 font-medium text-sm animate-bounce">Loading data...</p>
            </div>
          ) : (
            <>
              <SubjectSearchFilter
                search={search}
                setSearch={setSearch}
                filterClass={filterClass}
                setFilterClass={setFilterClass}
                classList={AllClasses}
              />

              <div className="transition-opacity duration-500 ease-in-out">
                <SubjectTable
                  subjects={filteredSubjects}
                  handleEdit={handleEditSubject}
                  handleDelete={handleDeleteSubject}
                />
              </div>

              <SubjectForm
                isOpen={isFormOpen}
                toggleForm={toggleForm}
                onSubmit={handleSubmit}
                subjectName={subjectName}
                setSubjectName={setSubjectName}
                subjectType={subjectType}
                setSubjectType={setSubjectType}
                classId={classId}
                setClassId={setClassId}
                subjectCode={subjectCode}
                setSubjectCode={setSubjectCode}
                editingSubjectId={editingSubjectId}
                classList={AllClasses}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseManagement;
