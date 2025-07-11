import express from "express";
import { addTeacher, GetAllTeacher, GetSigleData, GetSigleData2, GetSingledelet, GetTearcherdatabyusingUserId, Teacherupload, updateTeacher } from "../controllers/teacherController.js";

const teacherRoutes = express.Router();
// https://school-management-system-1-jprf.onrender.com/api/teachers/getSingle/
teacherRoutes.post("/add", Teacherupload.single('photo'), addTeacher);
teacherRoutes.get("/get", GetAllTeacher)
teacherRoutes.get('/getSingle/:id', GetSigleData)
teacherRoutes.get('/getSingle2/:id', GetSigleData2)
teacherRoutes.get('/TeacherData/:id', GetTearcherdatabyusingUserId)
teacherRoutes.put('/edit/:id',Teacherupload.single('photo'), updateTeacher)


teacherRoutes.delete('/delet/:id', GetSingledelet)


export default teacherRoutes;
