import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function StudentAttendanceByAdmin() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ name: '', date: '', class: '', subject: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/api/v8/student/attendance/get');
        setAttendanceRecords(res.data);
        setFilteredData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch student attendance data', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value.toLowerCase() };
    setFilters(updatedFilters);

    const filtered = attendanceRecords.filter((record) =>
      record.attendance.some((att) => {
        const studentName = att.studentId?.userId?.name?.toLowerCase() || '';
        const date = new Date(record.date).toISOString().split('T')[0];
        const className = record.classId?.Classname?.toLowerCase() || '';
        const subjectName = record.subjects?.[0]?.subjectName?.toLowerCase() || '';

        return (
          studentName.includes(updatedFilters.name) &&
          date.includes(updatedFilters.date) &&
          className.includes(updatedFilters.class) &&
          subjectName.includes(updatedFilters.subject)
        );
      })
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100">
        <MainHeader />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-700 mb-6">📋 Student Attendance Summary</h1>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Search by student name"
              onChange={handleFilterChange}
              className="p-2 rounded-xl border border-indigo-200 shadow w-full"
            />
            <input
              type="date"
              name="date"
              onChange={handleFilterChange}
              className="p-2 rounded-xl border border-indigo-200 shadow w-full"
            />
            <input
              type="text"
              name="class"
              placeholder="Filter by class"
              onChange={handleFilterChange}
              className="p-2 rounded-xl border border-indigo-200 shadow w-full"
            />
            <input
              type="text"
              name="subject"
              placeholder="Filter by subject"
              onChange={handleFilterChange}
              className="p-2 rounded-xl border border-indigo-200 shadow w-full"
            />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center h-40 text-indigo-600 animate-spin text-4xl">
              <AiOutlineLoading3Quarters />
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl">
              <table className="min-w-full divide-y divide-gray-300 rounded-xl overflow-hidden">
                <thead className="bg-indigo-600 text-white text-md">
                  <tr>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Student Name</th>
                    <th className="px-6 py-4 text-left">Admission No.</th>
                    <th className="px-6 py-4 text-left">Teacher</th>
                    <th className="px-6 py-4 text-left">Class</th>
                    <th className="px-6 py-4 text-left">Subject</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-gray-700 text-sm">
                  {currentRecords.map((record) =>
                    record.attendance.map((att) => (
                      <tr key={att._id} className="hover:bg-indigo-50 transition-all duration-200">
                        <td className="px-6 py-4">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-semibold">
                          {att.studentId?.userId?.name || 'N/A'}
                        </td>
                        <td className="px-6 py-4">{att.studentId?.admissionNumber}</td>
                        <td className="px-6 py-4">{record.teacherId?.bankDetails?.accountName}</td>
                        <td className="px-6 py-4">{record.classId?.Classname}</td>
                        <td className="px-6 py-4">{record.subjects?.[0]?.subjectName || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-white font-semibold text-xs ${
                              att.status === 'Present' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            {att.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-gray-600 text-sm">
                Showing {indexOfFirstRecord + 1} to{' '}
                {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} records
              </p>
              <div className="flex gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-xl font-semibold shadow transition duration-200 ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-indigo-300 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
