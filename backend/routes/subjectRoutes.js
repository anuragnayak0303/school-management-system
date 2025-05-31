import express from "express";
import { addSubject, AddSyllabusPersent, ClassSubject, deleteMultipleSubjects, getAllSubjects, updateSubject } from "../controllers/subjectController.js";


const subjectRoutes = express.Router();

subjectRoutes.post("/add", addSubject);
subjectRoutes.get('/all', getAllSubjects);
subjectRoutes.get('/ClassId/:id', ClassSubject);
subjectRoutes.put("/update/:id", updateSubject);
subjectRoutes.put("/updatasyllabus/:id", AddSyllabusPersent);
subjectRoutes.delete("/delete-multiple/:id", deleteMultipleSubjects);

export default subjectRoutes;
