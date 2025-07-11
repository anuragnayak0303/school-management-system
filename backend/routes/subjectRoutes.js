import express from "express";
import {  addSubjects, AddSyllabusPersent, ClassSubject, deleteMultipleSubjects, getAllSubjects, getTeachersBySubjects, updateSubject } from "../controllers/subjectController.js";


const subjectRoutes = express.Router();
// https://school-management-system-1-jprf.onrender.com/api/v2/subject/add
subjectRoutes.post("/add", addSubjects);
subjectRoutes.get('/all', getAllSubjects);
subjectRoutes.get('/ClassId/:id', ClassSubject);
subjectRoutes.post("/by-subjects", getTeachersBySubjects)
subjectRoutes.put("/update/:id", updateSubject);
subjectRoutes.put("/updatasyllabus/:id", AddSyllabusPersent);
subjectRoutes.delete("/delete-multiple/:id", deleteMultipleSubjects);

export default subjectRoutes;
