// routes/studentMarkRoutes.js
import express from "express";
import { createStudentMark, deleteStudentMark, getAllMarks,getMarksByClass, getMarksByStudent, updateStudentMark } from "../controllers/studentMarkController.js";


const Markrouter = express.Router();
// https://school-management-system-1-jprf.onrender.com/api/v11/exam/add
// https://school-management-system-1-jprf.onrender.com/api/v11/exam/clasId/
//https://school-management-system-1-jprf.onrender.com/api/v11/exam/all
Markrouter.post("/add", createStudentMark);
Markrouter.get("/all", getAllMarks);
Markrouter.get("/student/:id", getMarksByStudent);
Markrouter.get("/classId/:id", getMarksByClass);
Markrouter.put("/update/:id", updateStudentMark);
Markrouter.delete("/delete/:id", deleteStudentMark);

export default Markrouter;
