import express from "express";
import {
  EmailVerification,
  forgetpassowrd,
  getroleWiseData,
  getSigngleUser,
  loginController,
  passwordmatch,
  registerController,
} from "../controllers/userContoller.js";
import { isAdmin, isSignIn, IsStudent, isTeacher } from "../middlewares/authMiddeware.js";

const router = express.Router();

// https://school-management-system-1-jprf.onrender.com/api/v2/user/register
router.post("/register", registerController);

//  https://school-management-system-1-jprf.onrender.com/api/v2/user/login
router.post("/login", loginController);

// https://school-management-system-1-jprf.onrender.com/api/v2/user/emailVerified
router.post("/emailVerified", isSignIn, EmailVerification);

//https://school-management-system-1-jprf.onrender.com/api/v2/user/passwordmatch
router.post('/passwordmatch', isSignIn, passwordmatch)
router.post('/ForgetPass', isSignIn, forgetpassowrd)
router.get('/getsingle', isSignIn, getSigngleUser)
// https://school-management-system-1-jprf.onrender.com/api/v2/user/getAll
router.get('/getAll', getroleWiseData)


//PROTECTD ROUTES
// localhost:8000/api/v2/user/admin-protected
router.get("/admin-protected", isSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});
//https://school-management-system-1-jprf.onrender.com/api/v2/user/teacher-protected
router.get("/teacher-protected", isSignIn, isTeacher, (req, res) => {
  res.status(200).json({ ok: true });
});

router.get("/user-protected", isSignIn, IsStudent, (req, res) => {
  res.status(200).json({ ok: true });
});




export default router;
