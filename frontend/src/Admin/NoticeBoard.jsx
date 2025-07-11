import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MainHeader from '../components/MainHeader';
import { PiNotificationLight } from "react-icons/pi";
import { FaCalendar } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import AddEventModal from './components/AddEventModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';
import TeacherDashboard from '../Teacher/TeacherDashbaord';
import TeacherSidebar from '../Teacher/TeacherSideBar';
import StudentSideBar from '../Student/StudentSideBar';

export default function NoticeBoard() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedNotices, setSelectedNotices] = useState([]);
  const location = useLocation()
  const getEvents = async () => {
    try {
      const { data } = await axios.get(`https://school-management-system-1-jprf.onrender.com/api/v8/event/all`);
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  const handleDownloadPDF = async () => {
    const filtered = events.filter(event => selectedNotices.includes(event._id));
    if (filtered.length === 0) return alert("No notices selected!");

    const doc = new jsPDF();

    for (let i = 0; i < filtered.length; i++) {
      const el = document.getElementById(`notice-${filtered[i]._id}`);
      if (el) {
        const canvas = await html2canvas(el);
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        if (i > 0) doc.addPage();
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
    }

    const today = new Date().toLocaleDateString('en-GB').replaceAll('/', '-');
    doc.save(`notices-${today}.pdf`);
  };

  return (
    <div className="flex">
      {
        location.pathname.startsWith('/school/teacher/') ? <TeacherSidebar /> : location.pathname.startsWith('/school/student/') ? <StudentSideBar /> : <Sidebar />
      }
      <div className="ml-0 md:ml-64 w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <MainHeader />
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl mb-6 shadow-lg border-l-4 border-blue-500">
            <h1 className="text-2xl font-bold text-gray-800">Notice Board</h1>
            {
              !location.pathname.startsWith('/school/student') && <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 text-sm font-medium"
              >
                + Add new
              </button>
            }
          </div>

          {/* {events.length > 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleDownloadPDF}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Download Selected
              </button>
            </div>
          )} */}

          <div className="w-full h-full">
            {events.slice(0, visibleCount).map((notice, index) => (
              <div
                key={index}
                id={`notice-${notice._id}`}
                className="w-full h-[12vh] border shadow-sm rounded bg-[#fcfcfc] border-gray-300 flex justify-between px-5 py-2 mb-3 hover:border-blue-600 transition-colors"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedNotices.includes(notice._id)}
                    onChange={() => {
                      setSelectedNotices(prev =>
                        prev.includes(notice._id)
                          ? prev.filter(id => id !== notice._id)
                          : [...prev, notice._id]
                      );
                    }}
                    className="h-4 w-4 cursor-pointer border border-[#E9EDF4] bg-[#FFF] outline-0"
                  />
                  <div className="w-7 h-7 bg-gray-200 rounded-md flex justify-center items-center">
                    <PiNotificationLight className="text-sm text-blue-700" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-sm font-bold text-gray-700">{notice.title}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaCalendar className="text-xs mr-1.5" />
                      Added on : {new Date(notice?.startDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <p className='w h-full text-xs font-bold flex justify-center items-center '>{notice?.message}</p>

                {hoveredIndex === index && (
                  <div className={`flex items-center space-x-3 ${location.pathname.startsWith('/school/student/') && " hidden "}`}>
                    <div onClick={() => setShowEditModal()} className="w-6 h-6 flex justify-center items-center rounded border border-gray-300 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                      <FiEdit />
                    </div>
                    <div className="w-6 h-6 flex justify-center items-center rounded border border-gray-300 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                      <MdDeleteForever />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {visibleCount < events.length && (
              <div className="text-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="text-sm text-blue-700 font-medium hover:underline"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
      {showEditModal && <AddEventModal onClose={() => setShowEditModal(false)} />}
    </div>
  );
}
