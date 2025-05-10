import express from "express"
import { 
    addDepartmentController,
    getAllDepartmentsController, 
    updateDepartmentCotroller,
    DeleteDepartmentCotroller,
    getSingleDepartmentCotroller
} from 
"../controllers/departmentController.js";
import { isSignIn } from "../middlewares/authMiddeware.js";

const router = express.Router()
//ROUTES
// POST API
// http://localhost:8000/api/v2/department/add
router.post('/add',isSignIn,addDepartmentController)
// http://localhost:8000/api/v2/department/all
router.get('/all',isSignIn,getAllDepartmentsController)
// http://localhost:8000/api/v2/department/update
router.put('/update/:dept_id',isSignIn,updateDepartmentCotroller)
// http://localhost:8000/api/v2/department/delete
router.delete('/delete/:dept_id',isSignIn,DeleteDepartmentCotroller)
// http://localhost:8000/api/v2/department/get/
router.get('/get/:_id',isSignIn,getSingleDepartmentCotroller)


export default router;