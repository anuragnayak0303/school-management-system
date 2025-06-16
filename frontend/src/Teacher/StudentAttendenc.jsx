import React, { useEffect, useState } from 'react';
import TeacherSidebar from './TeacherSideBar';
import MainHeader from '../components/MainHeader';
import { useAuth } from '../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function StudentAttendance() {
  const { auth } = useAuth();
  const [teacher, setTeacher] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const fetchDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/teachers/TeacherData/${auth?.user?.id}`
      );
      setTeacher(data);
    } catch (error) {
      console.log('Error fetching teacher data:', error);
    }
  };

  useEffect(() => {
    if (auth?.user?.id) {
      fetchDetails();
    }
  }, [auth]);

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    setSelectedSubject(null);
    setAttendance([]);
    setIsReadOnly(false);

    const matchedSubjects =
      teacher?.subject?.filter((sub) => sub?.classId?._id === classId) || [];
    setSubjects(matchedSubjects);
  };

  const handleSubjectSelect = async (subject) => {
    setSelectedSubject(subject);
    setIsReadOnly(false);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v8/student/attendance/today/by-class-subject?classId=${selectedClass}&subjectId=${subject._id}`
      );
      const existing = res.data.attendance.map((entry) => ({
        _id: entry.studentId._id,
        userId: { name: entry.studentId.userId.name, profileImage: entry.studentId.userId.profileImage },
        status: entry.status,
      }));

      setAttendance(existing);
      setIsReadOnly(true);
      toast.success('Attendance already exists for this subject.');
    } catch (err) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v3/student/byClass/${selectedClass}`
        );

        if (data.length === 0) {
          toast.error('No students found for the selected class.');
          setAttendance([]);
          return;
        }

        const studentData = data.map((student) => ({
          ...student,
          status: '',
        }));

        setAttendance(studentData);
        setIsReadOnly(false);
        toast('You can mark attendance now.');
      } catch (error) {
        toast.error('Error loading students');
        setAttendance([]);
      }
    }
  };

  const handleStatusChange = (index, status) => {
    if (isReadOnly) return;
    const updated = [...attendance];
    updated[index].status = status;
    setAttendance(updated);
  };

  const handleSubmit = async () => {
    if (!selectedSubject) {
      toast.error('Please select a subject.');
      return;
    }

    if (attendance.some((entry) => entry.status === '')) {
      toast.error('Mark attendance for all students.');
      return;
    }

    const payload = {
      teacherId: teacher?._id,
      classId: selectedClass,
      subjects: [selectedSubject._id],
      attendance: attendance.map((entry) => ({
        studentId: entry._id,
        status: entry.status,
      })),
      date: new Date().toISOString(),
    };

    try {
      await axios.post(
        'http://localhost:8000/api/v8/student/attendance/add',
        payload
      );
      toast.success('Attendance submitted.');
      setIsReadOnly(true);
    } catch (error) {
      toast.error('Failed to submit attendance.');
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
    return (first + last).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 animate-fade-in">
      <TeacherSidebar />
      <div className="ml-0 md:ml-64 flex-grow">
        <MainHeader />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white p-10 rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-all border-2 border-purple-200">
            <h2 className="text-5xl font-extrabold text-center text-purple-800 mb-10 drop-shadow-md">
              🎓 Mark Student Attendance
            </h2>

            {/* Class Dropdown */}
            <div className="flex justify-center mb-8">
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="p-4 text-lg rounded-2xl border-4 border-blue-300 shadow-xl w-80 bg-white focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <option value="">📘 Select Class</option>
                {teacher?.Class?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.Classname}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selection */}
            {subjects.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-semibold mb-4 text-center text-pink-700">
                  📚 Select Subject
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {subjects.map((subject, idx) => (
                    <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="subject"
                        checked={selectedSubject?._id === subject._id}
                        onChange={() => handleSubjectSelect(subject)}
                        className="w-5 h-5 accent-blue-500"
                      />
                      <span className="text-lg font-medium text-gray-700">
                        {subject?.subjectName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Attendance Table */}
            {attendance.length > 0 && (
              <div className="overflow-x-auto rounded-xl shadow-lg">
                <table className="min-w-full bg-white rounded-xl">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-300 to-blue-400 text-white text-lg">
                      <th className="py-4 px-6 text-left rounded-tl-xl">👨 Profile</th>
                      <th className="py-4 px-6 text-left">👨‍🎓 Student Name</th>
                      <th className="py-4 px-6 text-left rounded-tr-xl">✅ Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((student, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100 transition duration-300">
                        <td className="px-4 py-2 w-1/6">
                          {student?.userId?.profileImage ? (
                            <img
                              src={`http://localhost:8000/${student.userId.profileImage}`}
                              className="h-10 w-10 rounded-full object-cover"
                              alt="Profile"
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/40" }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-bold">
                              {getInitials(student?.userId?.name)}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 text-gray-800 font-medium">
                          {student?.userId?.name}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-4">
                            <button
                              onClick={() => handleStatusChange(index, 'Present')}
                              disabled={isReadOnly}
                              className={`px-5 py-2 rounded-full font-bold text-white transition duration-300 transform hover:scale-105 ${student.status === 'Present'
                                ? 'bg-green-500 shadow-lg'
                                : 'bg-gray-300 hover:bg-green-400'
                                } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => handleStatusChange(index, 'Absent')}
                              disabled={isReadOnly}
                              className={`px-5 py-2 rounded-full font-bold text-white transition duration-300 transform hover:scale-105 ${student.status === 'Absent'
                                ? 'bg-red-500 shadow-lg'
                                : 'bg-gray-300 hover:bg-red-400'
                                } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              Absent
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Submit Button */}
            {!isReadOnly && attendance.length > 0 && (
              <div className="mt-10 text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-lg px-12 py-4 rounded-2xl font-bold shadow-xl transform transition duration-300 hover:scale-105"
                >
                  🚀 Submit Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
