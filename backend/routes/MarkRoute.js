// routes/studentMarkRoutes.js
import express from "express";
import { createStudentMark, deleteStudentMark, getAllMarks,getMarksByClass, getMarksByStudent, updateStudentMark } from "../controllers/studentMarkController.js";


const Markrouter = express.Router();
// http://localhost:8000/api/v11/exam/add
// http://localhost:8000/api/v11/exam/clasId/
//http://localhost:8000/api/v11/exam/all
Markrouter.post("/add", createStudentMark);
Markrouter.get("/all", getAllMarks);
Markrouter.get("/student/:id", getMarksByStudent);
Markrouter.get("/classId/:id", getMarksByClass);
Markrouter.put("/update/:id", updateStudentMark);
Markrouter.delete("/delete/:id", deleteStudentMark);

export default Markrouter;
