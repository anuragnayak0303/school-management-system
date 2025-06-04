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

  // Fetch teacher data
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

  // Handle class selection
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

  // Handle subject selection and fetch attendance
  const handleSubjectSelect = async (subject) => {
    setSelectedSubject(subject);
    setIsReadOnly(false);

    try {
      const res = await axios.get(`http://localhost:8000/api/v8/student/attendance/today/by-class-subject?classId=${selectedClass}&subjectId=${subject._id}`
      );
      const existing = res.data.attendance.map((entry) => ({
        _id: entry.studentId._id,
        userId: { name: entry.studentId.userId.name },
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

  // Mark status
  const handleStatusChange = (index, status) => {
    if (isReadOnly) return;
    const updated = [...attendance];
    updated[index].status = status;
    setAttendance(updated);
  };

  // Submit
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar />
      <div className="ml-0 md:ml-64 flex-grow">
        <MainHeader />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl transition-all">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Mark Attendance
            </h2>

            {/* Class Dropdown */}
            <div className="flex justify-center mb-6">
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="p-3 text-lg rounded-xl border-2 border-blue-400 shadow-md w-72"
              >
                <option value="">Select Class</option>
                {teacher?.Class?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.Classname}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selection */}
            {subjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-700 text-center">
                  Select Subject
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {subjects.map((subject, idx) => (
                    <label key={idx} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="subject"
                        checked={selectedSubject?._id === subject._id}
                        onChange={() => handleSubjectSelect(subject)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="text-md text-gray-700">
                        {subject?.subjectName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Attendance Table */}
            {attendance.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-blue-100 text-blue-800 text-lg font-semibold">
                      <th className="py-4 px-6 text-left">Student Name</th>
                      <th className="py-4 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((student, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-6 text-gray-800 font-medium">
                          {student?.userId?.name}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-4">
                            <button
                              onClick={() =>
                                handleStatusChange(index, 'Present')
                              }
                              disabled={isReadOnly}
                              className={`px-4 py-2 rounded-full text-white font-semibold transition 
                                ${
                                  student.status === 'Present'
                                    ? 'bg-green-500 shadow-md'
                                    : 'bg-gray-300 hover:bg-green-400'
                                } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(index, 'Absent')
                              }
                              disabled={isReadOnly}
                              className={`px-4 py-2 rounded-full text-white font-semibold transition 
                                ${
                                  student.status === 'Absent'
                                    ? 'bg-red-500 shadow-md'
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
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-3 rounded-xl font-bold shadow-lg transition"
                >
                  Submit Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
