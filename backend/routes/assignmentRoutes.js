// routes/assignmentRoutes.js
import express from "express";
import multer from "multer";
import { createAssignment, GetAllAssignment, getAssignmentsByClass } from "../controllers/assignmentController.js";

const Assignmentrouter = express.Router();
const upload = multer({ dest: "uploads/assignments" });
// 8000/api/v9/assignments/create
// Create assignment (protected route)
Assignmentrouter.post("/create", upload.single("file"), createAssignment);
// 8000/api/v9/assignments/get/:teacherId
// Get assignments by class for current academic year only
Assignmentrouter.get("/get/:teacherId", getAssignmentsByClass);
//8000/api/v9/assignments/getAll
Assignmentrouter.get('/getAll', GetAllAssignment)

export default Assignmentrouter;
