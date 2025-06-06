import express from 'express';
import { createAttendance, deleteAttendance, getAllAttendance, getAttendanceById, getAttendanceByQuery, getTodayAttendanceByClassAndSubject, updateAttendance } from '../controllers/attendanceController.js';


const studentAttendencrouter = express.Router();
// http://localhost:8000/api/v8/student/attendance/add
studentAttendencrouter.post('/add', createAttendance);
studentAttendencrouter.get('/today/by-class-subject', getTodayAttendanceByClassAndSubject);
studentAttendencrouter.get('/get', getAllAttendance);
studentAttendencrouter.get('/search', getAttendanceByQuery); // use ?teacherId=&classId=&date=
studentAttendencrouter.get('/:id', getAttendanceById);
studentAttendencrouter.delete('/:id', deleteAttendance); // optional
studentAttendencrouter.put('/:id', updateAttendance);   // optional

export default studentAttendencrouter;
