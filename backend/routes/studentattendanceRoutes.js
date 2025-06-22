import express from 'express';
import { createAttendance, deleteAttendance, getAllAttendance, getAttendanceById, getAttendanceByQuery, getAttendanceByStudentId, getAttendanceBySubjectIds, getTodayAttendanceByClassAndSubject, updateAttendance } from '../controllers/attendanceController.js';


const studentAttendencrouter = express.Router();
// http://localhost:8000/api/v8/student/attendance/student/
studentAttendencrouter.post('/add', createAttendance);
studentAttendencrouter.get('/student/:studentId', getAttendanceByStudentId);
studentAttendencrouter.get('/today/by-class-subject', getTodayAttendanceByClassAndSubject);
studentAttendencrouter.get('/get', getAllAttendance);
studentAttendencrouter.get('/search', getAttendanceByQuery); // use ?teacherId=&classId=&date=
studentAttendencrouter.get('/:id', getAttendanceById);
studentAttendencrouter.delete('/:id', deleteAttendance); // optional
studentAttendencrouter.put('/:id', updateAttendance);   // optional
// http://localhost:8000/api/v8/student/attendance/by-subjects
studentAttendencrouter.post('/by-subjects', getAttendanceBySubjectIds);

export default studentAttendencrouter;
