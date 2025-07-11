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

  const [loadingTeacher, setLoadingTeacher] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const fetchDetails = async () => {
    setLoadingTeacher(true);
    try {
      const { data } = await axios.get(
        `https://school-management-system-1-jprf.onrender.com/api/teachers/TeacherData/${auth?.user?.id}`
      );
      setTeacher(data);
    } catch (error) {
      toast.error('Failed to load teacher data.');
    } finally {
      setLoadingTeacher(false);
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
    setLoadingSubjects(true);

    const matchedSubjects =
      teacher?.subject?.filter((sub) => sub?.classId?._id === classId) || [];

    setTimeout(() => {
      setSubjects(matchedSubjects);
      setLoadingSubjects(false);
    }, 500); // Simulate delay
  };

  const handleSubjectSelect = async (subject) => {
    setSelectedSubject(subject);
    setIsReadOnly(false);
    setLoadingStudents(true);
    setAttendance([]);

    try {
      const res = await axios.get(
        `https://school-management-system-1-jprf.onrender.com/api/v8/student/attendance/today/by-class-subject?classId=${selectedClass}&subjectId=${subject._id}`
      );
      const existing = res.data.attendance.map((entry) => ({
        _id: entry.studentId._id,
        userId: {
          name: entry.studentId.userId.name,
          profileImage: entry.studentId.userId.profileImage,
        },
        status: entry.status,
      }));

      setAttendance(existing);
      setIsReadOnly(true);
      toast.success('Attendance already exists.');
    } catch {
      try {
        const { data } = await axios.get(
          `https://school-management-system-1-jprf.onrender.com/api/v3/student/byClass/${selectedClass}`
        );

        if (data.length === 0) {
          toast.error('No students found for this class.');
          setAttendance([]);
        } else {
          const studentData = data.map((student) => ({
            ...student,
            status: '',
          }));
          setAttendance(studentData);
          setIsReadOnly(false);
          toast('You can mark attendance now.');
        }
      } catch {
        toast.error('Error loading students.');
      }
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleStatusChange = (index, status) => {
    if (isReadOnly) return;
    const updated = [...attendance];
    updated[index].status = status;
    setAttendance(updated);
  };

  const handleSubmit = async () => {
    if (!selectedSubject) return toast.error('Select a subject.');
    if (attendance.some((entry) => entry.status === '')) {
      return toast.error('Mark all students.');
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
        'https://school-management-system-1-jprf.onrender.com/api/v8/student/attendance/add',
        payload
      );
      toast.success('Attendance submitted.');
      setIsReadOnly(true);
    } catch {
      toast.error('Failed to submit.');
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };

  const Loader = () => (
    <div className="flex justify-center items-center py-10">
      <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar />
      <div className="ml-0 md:ml-64 flex-grow">
        <MainHeader />
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white p-10 rounded-md shadow-xl border border-gray-200">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
              🎓 Mark Student Attendance
            </h2>

            {loadingTeacher ? (
              <Loader />
            ) : (
              <>
                {/* Class Dropdown */}
                <div className="flex justify-center mb-8">
                  <select
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="p-4 text-lg rounded-xl border border-gray-300 shadow-sm w-80 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                {loadingSubjects ? (
                  <Loader />
                ) : (
                  subjects.length > 0 && (
                    <div className="mb-10">
                      <h3 className="text-2xl font-semibold mb-4 text-center text-blue-700">
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
                              className="w-5 h-5 accent-blue-600"
                            />
                            <span className="text-lg font-medium text-gray-700">
                              {subject?.subjectName}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                )}

                {/* Student Attendance */}
                {loadingStudents ? (
                  <Loader />
                ) : (
                  attendance.length > 0 && (
                    <div className="overflow-x-auto rounded shadow border border-gray-300">
                      <table className="min-w-full bg-white rounded">
                        <thead>
                          <tr className="bg-blue-100 text-gray-800 text-lg">
                            <th className="py-3 px-6 text-left">👨 Profile</th>
                            <th className="py-3 px-6 text-left">👨‍🎓 Student Name</th>
                            <th className="py-3 px-6 text-left">✅ Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendance.map((student, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100 transition">
                              <td className="px-3 py-2 w-1/6">
                                {student?.userId?.profileImage ? (
                                  <img
                                    src={`https://school-management-system-1-jprf.onrender.com/${student.userId.profileImage}`}
                                    className="h-10 w-10 rounded-full object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/40"; }}
                                    alt="Profile"
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                    {getInitials(student?.userId?.name)}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-6 text-gray-800 font-medium">
                                {student?.userId?.name}
                              </td>
                              <td className="py-3 px-6">
                                <div className="flex gap-4">
                                  <button
                                    onClick={() => handleStatusChange(index, 'Present')}
                                    disabled={isReadOnly}
                                    className={`px-5 py-1.5 rounded-full font-bold text-white transition ${student.status === 'Present'
                                      ? 'bg-green-500'
                                      : 'bg-gray-300 hover:bg-green-400'} ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  >
                                    Present
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(index, 'Absent')}
                                    disabled={isReadOnly}
                                    className={`px-5 py-1.5 rounded-full font-bold text-white transition ${student.status === 'Absent'
                                      ? 'bg-red-500'
                                      : 'bg-gray-300 hover:bg-red-400'} ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                  )
                )}

                {/* Submit Button */}
                {!isReadOnly && attendance.length > 0 && !loadingStudents && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-4 rounded-xl font-bold shadow-md transition duration-300"
                    >
                      🚀 Submit Attendance
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
