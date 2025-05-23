import express from "express";
import { addTeacher, GetAllTeacher, GetSigleData, GetSingledelet, Teacherupload } from "../controllers/teacherController.js";

const teacherRoutes = express.Router();

teacherRoutes.post("/add", Teacherupload.single('photo'), addTeacher);
teacherRoutes.get("/get", GetAllTeacher)
teacherRoutes.get('/getSingle/:id', GetSigleData)
teacherRoutes.delete('/delet/:id', GetSingledelet)


export default teacherRoutes;
