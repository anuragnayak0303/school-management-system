import express from "express";
import { addTeacher, GetAllTeacher, GetSigleData, GetSingledelet, GetTearcherdatabyusingUserId, Teacherupload, updateTeacher } from "../controllers/teacherController.js";

const teacherRoutes = express.Router();

teacherRoutes.post("/add", Teacherupload.single('photo'), addTeacher);
teacherRoutes.get("/get", GetAllTeacher)
teacherRoutes.get('/getSingle/:id', GetSigleData)
teacherRoutes.get('/TeacherData/:id', GetTearcherdatabyusingUserId)
teacherRoutes.put('/edit/:id',Teacherupload.single('photo'), updateTeacher)


teacherRoutes.delete('/delet/:id', GetSingledelet)


export default teacherRoutes;
