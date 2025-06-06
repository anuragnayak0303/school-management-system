import express from "express";
import { GetDataAll, GetStudentByClassID, StudentUpload, submitAdmission } from "../controllers/studentAdmissionController.js";
const studentRoutes = express.Router();

// http:localhost:8000/api/v3/student/add
studentRoutes.post("/add", StudentUpload.single('photo'), submitAdmission);
studentRoutes.get('/get', GetDataAll)
studentRoutes.get('/byClass/:id', GetStudentByClassID)



export default studentRoutes;
