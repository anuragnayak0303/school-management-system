// routes/assignmentRoutes.js
import express from "express";
import multer from "multer";
import { createAssignment, getAssignmentsByClass } from "../controllers/assignmentController.js";

const Assignmentrouter = express.Router();
const upload = multer({ dest: "uploads/assignments" });
// 8000/api/v9/assignments/create
// Create assignment (protected route)
Assignmentrouter.post("/create", upload.single("file"), createAssignment);

// Get assignments by class for current academic year only
Assignmentrouter.get("/class/:classId", getAssignmentsByClass);

export default Assignmentrouter;
