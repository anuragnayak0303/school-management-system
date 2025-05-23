import express from "express";
import { GetDataAll, StudentUpload, submitAdmission } from "../controllers/studentAdmissionController.js";
const studentRoutes = express.Router();

// http:localhost:8000/api/v3/student/add
studentRoutes.post("/add", StudentUpload.single('photo'), submitAdmission);
studentRoutes.get('/get', GetDataAll)


export default studentRoutes;
