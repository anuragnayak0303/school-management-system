// src/pages/AllStudentMark.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainHeader from "../components/MainHeader";
import axios from "axios";
import { motion } from "framer-motion";

export default function AllStudentMark() {
  const [allClass, setAllClass] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [examNames, setExamNames] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    axios
      .get(`https://school-management-system-1-jprf.onrender.com/api/v2/class/all`)
      .then((res) => setAllClass(res.data))
      .catch(console.error);
  }, []);

  const fetchSubjectsByClass = async (classId) => {
    try {
      const res = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v2/subject/ClassId/${classId}`);
      setSubjects(res.data || []);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const fetchMarks = async () => {
    if (!selectedClassId) return;
    setLoading(true);
    try {
      const res = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v11/exam/classId/${selectedClassId}`);
      const allMarks = res.data?.data || [];

      const uniqueExamNames = [...new Set(allMarks.map((m) => m.examName))];
      setExamNames(uniqueExamNames);

      const filtered = allMarks.filter(
        (entry) => new Date(entry.createdAt).getFullYear() === currentYear
      );

      setMarksData(filtered);
      fetchSubjectsByClass(selectedClassId);
    } catch (err) {
      console.error("Error fetching marks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, [selectedClassId]);

  const displayedMarks = marksData.filter(
    (entry) => selectedExam === "" || entry.examName === selectedExam
  );

  const getTotal = (marks) => marks.reduce((sum, m) => sum + m.markObtained, 0);

  const getPassFail = (marks, fullMarks) => {
    const total = getTotal(marks);
    const passMark = fullMarks * 0.33;
    return total >= passMark ? "Pass" : "Fail";
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-indigo-50 to-sky-100">
        <MainHeader />
        <div className="p-4 sm:p-6">
          {/* Filters */}
          <motion.div
            className="w-full flex flex-wrap gap-4 justify-center items-center mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <select
              className="px-6 py-2 rounded-xl border shadow-md outline-0 bg-white"
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setSelectedExam("");
              }}
              value={selectedClassId}
            >
              <option value="">--- Select Class ---</option>
              {allClass.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  class {cls.Classname}
                </option>
              ))}
            </select>

            <select
              className="px-6 py-2 rounded-xl border shadow-md outline-0 bg-white"
              onChange={(e) => setSelectedExam(e.target.value)}
              value={selectedExam}
              disabled={!examNames.length}
            >
              <option value="">--- Select Exam ---</option>
              {examNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Table */}
          <div className="w-full bg-white rounded-2xl p-4 shadow-xl overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <motion.div
                  className="w-12 h-12 border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
              </div>
            ) : displayedMarks.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No marks found.</div>
            ) : (
              <table className="w-full text-sm text-center border-collapse">
                <thead className="bg-indigo-400 text-white rounded-t-xl">
                  <tr>
                    <th className="p-3 font-semibold">Student</th>
                    <th className="p-3 font-semibold">Exam</th>
                    {subjects.map((sub) => (
                      <th className="p-3 font-semibold" key={sub._id}>
                        {sub.subjectName}
                      </th>
                    ))}
                    <th className="p-3 font-semibold">Total Marks</th>
                    <th className="p-3 font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMarks.map((mark, index) => {
                    const markMap = {};
                    mark.marks.forEach((m) => {
                      markMap[m.subjectId._id] = m.markObtained;
                    });

                    return (
                      <motion.tr
                        key={mark._id}
                        className="bg-white hover:bg-indigo-100 transition duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="p-2 font-medium text-gray-800">
                          {mark.studentId?.userId?.name || "Unnamed"}
                        </td>
                        <td className="p-2">{mark.examName}</td>
                        {subjects.map((sub) => (
                          <td key={sub._id} className="p-2 text-gray-700">
                            {markMap[sub._id] !== undefined ? markMap[sub._id] : "—"}
                          </td>
                        ))}
                        <td className="p-2 font-bold text-indigo-600">{getTotal(mark.marks)}</td>
                        <td className="p-2">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-semibold shadow-md ${getPassFail(mark.marks, mark.fullMarks) === "Pass"
                                ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                              }`}
                          >
                            {getPassFail(mark.marks, mark.fullMarks)}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
