// routes/studentMarkRoutes.js
import express from "express";
import { createStudentMark, deleteStudentMark, getAllMarks, getMarksByStudent, updateStudentMark } from "../controllers/studentMarkController.js";


const Markrouter = express.Router();
// http://localhost:8000/api/v11/exam/add
// http://localhost:8000/api/v11/exam/student
//http://localhost:8000/api/v11/exam/all
Markrouter.post("/add", createStudentMark);
Markrouter.get("/all", getAllMarks);
Markrouter.get("/student/:id", getMarksByStudent);
Markrouter.put("/update/:id", updateStudentMark);
Markrouter.delete("/delete/:id", deleteStudentMark);

export default Markrouter;
