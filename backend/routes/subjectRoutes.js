import express from "express";
import { addSubject, AddSyllabusPersent, ClassSubject, deleteMultipleSubjects, getAllSubjects, getTeachersBySubjects, updateSubject } from "../controllers/subjectController.js";


const subjectRoutes = express.Router();
// /api/v2/subject/ClassId/
subjectRoutes.post("/add", addSubject);
subjectRoutes.get('/all', getAllSubjects);
subjectRoutes.get('/ClassId/:id', ClassSubject);
subjectRoutes.post("/by-subjects", getTeachersBySubjects)
subjectRoutes.put("/update/:id", updateSubject);
subjectRoutes.put("/updatasyllabus/:id", AddSyllabusPersent);
subjectRoutes.delete("/delete-multiple/:id", deleteMultipleSubjects);

export default subjectRoutes;
