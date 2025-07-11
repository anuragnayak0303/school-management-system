import express from "express"
import { addClassController, DeleteClassCotroller, getAllClassController, GetNo_0f_Student, updateClassCotroller } from "../controllers/ClassController.js"
const router = express.Router()
//ROUTES
// POST API
// https://school-management-system-1-jprf.onrender.com/api/v2/class/add
router.post('/add', addClassController)
// https://school-management-system-1-jprf.onrender.com/api/v2/class/all
router.get('/all', getAllClassController)
// https://school-management-system-1-jprf.onrender.com/api/v2/class/update
router.put('/update/:id', updateClassCotroller)
// https://school-management-system-1-jprf.onrender.com/api/v2/class/student_no
router.get('/student_no/:id', GetNo_0f_Student)
// https://school-management-system-1-jprf.onrender.com/api/v2/class/delete
router.delete('/delete/:id', DeleteClassCotroller)
// // https://school-management-system-1-jprf.onrender.com/api/v2/class/get/
// router.get('/get/:_id',isSignIn,getSingleDepartmentCotroller)


export default router;