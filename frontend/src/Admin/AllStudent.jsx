import React, { useEffect, useState, useRef } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import { MoreVertical } from 'lucide-react';
import { saveAs } from 'file-saver';
import { NavLink } from 'react-router-dom';

export default function AllStudent() {
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filters, setFilters] = useState({
    classId: '',
    from: '',
    to: '',
  });
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/v3/student/get`);
      setAllStudents(data);
      setFilteredStudents(data);
      const distinct = [...new Set(data.map(s => s.class?.Classname).filter(Boolean))];
      setClasses(distinct);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    let temp = [...allStudents];
    if (filters.classId) {
      temp = temp.filter(s => s.class?.Classname === filters.classId);
    }
    if (filters.from) {
      temp = temp.filter(s => new Date(s.admissionDate) >= new Date(filters.from));
    }
    if (filters.to) {
      temp = temp.filter(s => new Date(s.admissionDate) <= new Date(filters.to));
    }
    setFilteredStudents(temp);
    setPage(1);
    setSelectedIds(new Set());
  }, [filters, allStudents]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPages = Math.ceil(filteredStudents.length / perPage);
  const pageItems = filteredStudents.slice((page - 1) * perPage, page * perPage);

  const exportCSV = () => {
    const rows = pageItems.map(s => ({
      Admission: s.admissionNumber,
      Roll: s.rollNumber,
      Name: s.userId.name,
      Class: s.class?.Classname,
      Gender: s.gender,
      Status: s.status,
      Joined: s.admissionDate?.slice(0, 10),
      DOB: s.dateOfBirth?.slice(0, 10),
    }));
    const header = Object.keys(rows[0]).join(',') + '\n';
    const csv = header + rows.map(r => Object.values(r).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'students.csv');
  };

  const toggleSelect = id => {
    const clone = new Set(selectedIds);
    clone.has(id) ? clone.delete(id) : clone.add(id);
    setSelectedIds(clone);
  };

  const getInitials = fullName => {
    const parts = fullName.trim().split(' ');
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : parts[0][0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  const ActionDropdown = ({ id }) => (
    <div
      ref={actionMenuRef}
      className="absolute right-0 top-9 w-auto flex space-x-3 px-3 py-2 bg-white shadow-md rounded border border-gray-200 z-50 animate-fade-in"
    >
      <NavLink to={`/school/admin/view-students/${id}`} className='text-sm font-semibold cursor-pointer'>view</NavLink>
      <NavLink to={`/school/admin/edit_student/${id}`} className='text-sm font-semibold cursor-pointer'>Edit</NavLink>
      <div className='text-sm font-semibol text-red-600 cursor-pointer'>Delete</div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="md:ml-64 w-full min-h-screen bg-gray-50">
        <MainHeader />
        <div className="p-6 space-y-6">
          <div className="flex justify-between  items-center">
            <h1 className="text-2xl font-semibold">All Students</h1>
            <div className='flex space-x-4 '>
              <button
                disabled={!pageItems.length}
                onClick={exportCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow"
              >
                Export &darr;
              </button>
              {selectedIds.size > 0 && (
                <div className=" w-30 h-10 flex justify-center items-center text-sm font-semibold text-green-700 bg-green-100  rounded-md shadow">
                  Selected: {selectedIds.size}
                </div>
              )}
            </div>

          </div>


          {/* Filters */}
          <div className="flex flex-wrap justify-between items-end bg-gradient-to-br from-white to-gray-100 p-4 rounded-md shadow-sm">
            <div className='flex flex-wrap gap-4'>
              <div className="flex flex-col w-56">
                <label className="text-sm font-medium text-gray-700 mb-1">Class</label>
                <select
                  value={filters.classId}
                  onChange={e => setFilters(f => ({ ...f, classId: e.target.value }))}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-400 transition-all"
                >
                  <option value="">All</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col w-80">
                <label className="text-sm font-medium text-gray-700 mb-1">Admission Date</label>
                <input
                  type="date"
                  value={filters.from}
                  onChange={e => setFilters(f => ({ ...f, from: e.target.value }))}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-400 transition-all"
                />
              </div>

            </div>


            <div className="flex flex-col tems-center gap-2">
              <label className="text-sm font-semibold text-gray-600">Show per page</label>
              <select
                value={perPage}
                onChange={e => setPerPage(Number(e.target.value))}
                className="px-3 py-2 bg-white border w-32 font-semibold border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                {[10, 20, 30, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          {/* Page Size Selector */}

          {/* Table */}
          <div className="bg-white rounded-sm shadow overflow-x-auto mt-4">
            <table className="w-full text-gray-700 text-sm">
              <thead className="bg-gray-100 uppercase text-xs font-semibold text-left">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      onChange={e => {
                        const ids = new Set(selectedIds);
                        pageItems.forEach(s => e.target.checked ? ids.add(s._id) : ids.clear());
                        setSelectedIds(ids);
                      }}
                    />
                  </th>
                  {['Admission No', 'Roll', 'Name', 'Class', 'Gender', 'Status', 'Date of Join', 'DOB', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan="10" className="p-4 text-center text-gray-500">No records</td>
                  </tr>
                )}
                {pageItems.map((s, i) => (
                  <tr key={s._id} className="border-t border-t-gray-200 hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(s._id)}
                        onChange={() => toggleSelect(s._id)}
                      />
                    </td>
                    <td className="px-4 py-3">{s.admissionNumber}</td>
                    <td className="px-4 py-3">{s.rollNumber}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      {s.userId.profileImage ? (
                        <img src={`http://localhost:8000/${s.userId.profileImage}`} className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex justify-center items-center font-bold text-xs">
                          {getInitials(s.userId.name)}
                        </div>
                      )}
                      <span>{s.userId.name}</span>
                    </td>
                    <td className="px-4 py-3">{s.class?.Classname || '-'}</td>
                    <td className="px-4 py-3">{s.gender}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs rounded font-semibold ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{s.admissionDate?.slice(0, 10)}</td>
                    <td className="px-4 py-3">{s.dateOfBirth?.slice(0, 10)}</td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical size={18} />
                      </button>
                      {openMenuIndex === i && <ActionDropdown id={s?._id} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredStudents.length)} of {filteredStudents.length}
            </span>
            <div className="space-x-2">

              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              >Prev</button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              >Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
