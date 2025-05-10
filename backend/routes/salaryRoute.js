import express from "express"
import { addSalaryController,viewSalaryController } 
from "../controllers/salaryController.js";
const router =  express.Router()
//API
//POST
// http://localhost:8000/api/v2/employees/salary/add
router.post("/add",addSalaryController);

// http://localhost:8000/api/v2/employees/salary/view
router.get("/view",viewSalaryController);



export default router