import express from "express";
import { GetDataAll, GetDataById, GetDataByIdforAdmin, GetStudentByClassID, GetStudentsByClassList, StudentUpload, submitAdmission, updateAdmission } from "../controllers/studentAdmissionController.js";
import { isSignIn } from "../middlewares/authMiddeware.js";
const studentRoutes = express.Router();
// http:localhost:8000/api/v3/student/add
// https://school-management-system-1-jprf.onrender.com/api/v3/student/getById
studentRoutes.post("/add", StudentUpload.single('photo'), submitAdmission);
studentRoutes.post('/students/by-class-list', GetStudentsByClassList);
studentRoutes.get('/get', GetDataAll)
studentRoutes.get('/getById', isSignIn, GetDataById)
studentRoutes.put('/update/:id', StudentUpload.single('photo'), updateAdmission)
studentRoutes.get('/getById/:id', GetDataByIdforAdmin)
studentRoutes.get('/byClass/:id', GetStudentByClassID)



export default studentRoutes;
