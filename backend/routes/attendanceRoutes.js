import express from "express";
import { getAttendanceByUser, markAttendance } from "../controllers/TeacherattendanceController.js";


const attendanceRoute = express.Router();

// POST /api/attendance
attendanceRoute.post("/add", markAttendance);
attendanceRoute.get("/:userId", getAttendanceByUser);

export default attendanceRoute;
