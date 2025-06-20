import express from "express";
import { getAttendance, getAttendanceByUser, markAttendance } from "../controllers/TeacherattendanceController.js";


const attendanceRoute = express.Router();

// POST http://localhost:8000/api/attendance/
attendanceRoute.post("/add", markAttendance);
attendanceRoute.get("/:userId", getAttendanceByUser);
attendanceRoute.get("/", getAttendance);


export default attendanceRoute;
