import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function ERTlist() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [filterClass, setFilterClass] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 20;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/ert/all');
        setStudents(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Unable to fetch student data. Please try again later.');
      }
    };

    fetchStudents();
  }, []);

  // Filter logic
  const filteredStudents = students.filter(student =>
    filterClass ? student.currentClass === filterClass : true
  );

  // Pagination calculations
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const uniqueClasses = [...new Set(students.map(s => s.currentClass))];

  const exportToExcel = () => {
    if (!filteredStudents.length) return;

    // Export current filtered students (all pages)
    const exportData = filteredStudents.map(({ dob, ...rest }) => ({
      ...rest,
      dob: new Date(dob).toLocaleDateString(), // format DOB
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'ERT_Students.xlsx');
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <MainHeader />

        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">
            Admin &gt; <span className="text-gray-700 font-semibold">Students</span>
          </div>

          <div className="flex justify-between items-center mb-4 p-4 rounded-md bg-white">
            <h1 className="text-2xl font-bold text-gray-800">ERT Student List</h1>
            <div className="flex gap-2 items-center">
              <select
                value={filterClass}
                onChange={(e) => {
                  setFilterClass(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on filter change
                }}
                className="border rounded px-3 py-2 text-sm"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              <button
                onClick={exportToExcel}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Export to Excel
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg">
            <div className="overflow-x-auto rounded border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Father's Name</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Mobile</th>
                    <th className="px-3 py-2 text-left">DOB</th>
                    <th className="px-3 py-2 text-left">Class</th>
                    <th className="px-3 py-2 text-left">State</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 text-gray-700">
                  {currentStudents.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-gray-400">
                        No student data available.
                      </td>
                    </tr>
                  ) : (
                    currentStudents.map((student, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-3 py-2">{student.studentName}</td>
                        <td className="px-3 py-2">{student.fatherName}</td>
                        <td className="px-3 py-2">{student.email}</td>
                        <td className="px-3 py-2">{student.mobile}</td>
                        <td className="px-3 py-2">{new Date(student.dob).toLocaleDateString()}</td>
                        <td className="px-3 py-2">{student.currentClass}</td>
                        <td className="px-3 py-2">{student.state}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => {
              const pageNum = num + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded border ${pageNum === currentPage
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 hover:bg-gray-200'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
