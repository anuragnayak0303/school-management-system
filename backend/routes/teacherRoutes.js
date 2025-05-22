import express from "express";
import { addTeacher, GetAllTeacher, Teacherupload } from "../controllers/teacherController.js";

const teacherRoutes = express.Router();

teacherRoutes.post("/add", Teacherupload.single('photo'), addTeacher);
teacherRoutes.get("/get", GetAllTeacher)


export default teacherRoutes;
