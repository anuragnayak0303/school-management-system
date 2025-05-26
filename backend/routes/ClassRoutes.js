import express from "express"
import { addClassController, DeleteClassCotroller, getAllClassController, updateClassCotroller } from "../controllers/ClassController.js"
const router = express.Router()
//ROUTES
// POST API
// http://localhost:8000/api/v2/class/add
router.post('/add', addClassController)
// http://localhost:8000/api/v2/class/all
router.get('/all', getAllClassController)
// http://localhost:8000/api/v2/class/update
router.put('/update/:id', updateClassCotroller)
// http://localhost:8000/api/v2/class/delete
router.delete('/delete/:id', DeleteClassCotroller)
// // http://localhost:8000/api/v2/class/get/
// router.get('/get/:_id',isSignIn,getSingleDepartmentCotroller)


export default router;