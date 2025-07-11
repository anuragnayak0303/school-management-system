import express from "express"
import { 
    addEmployeeController, 
    upload,
    getEmployeesController,
    singleEmployeeController,
    updateEmployeeController,
    getEmployeeByDeptId,
 } 
from "../controllers/employeeController.js";
import { isSignIn } from "../middlewares/authMiddeware.js";
import { getEmployeeSalaryController } from "../controllers/salaryController.js";

//instance 
const router = express.Router()
// API
// localhost:8000/api/v2/employees/add
router.post("/add",isSignIn,upload.single("image"),addEmployeeController);
// get
// localhost:8000/api/v2/employees/all
router.get("/all",isSignIn,getEmployeesController);
// https://school-management-system-1-jprf.onrender.com/api/v2/employees/single
router.get("/single/:_id",isSignIn,singleEmployeeController);
// https://school-management-system-1-jprf.onrender.com/api/v2/employees/single
router.put("/update/:_id",isSignIn,updateEmployeeController);
// https://school-management-system-1-jprf.onrender.com/api/v2/employees/department/:_id
router.get("/department/:_id",isSignIn,getEmployeeByDeptId);
// https://school-management-system-1-jprf.onrender.com/api/v2/employees/salary
router.get("/salary/:_id",getEmployeeSalaryController)


export default router;