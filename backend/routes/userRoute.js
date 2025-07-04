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

// http://localhost:8000/api/v2/user/register
router.post("/register", registerController);

//  http://localhost:8000/api/v2/user/login
router.post("/login", loginController);

// http://localhost:8000/api/v2/user/emailVerified
router.post("/emailVerified", isSignIn, EmailVerification);

//http://localhost:8000/api/v2/user/passwordmatch
router.post('/passwordmatch', isSignIn, passwordmatch)
router.post('/ForgetPass', isSignIn, forgetpassowrd)
router.get('/getsingle', isSignIn, getSigngleUser)
// http://localhost:8000/api/v2/user/getAll
router.get('/getAll', getroleWiseData)


//PROTECTD ROUTES
// localhost:8000/api/v2/user/admin-protected
router.get("/admin-protected", isSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});
//http://localhost:8000/api/v2/user/teacher-protected
router.get("/teacher-protected", isSignIn, isTeacher, (req, res) => {
  res.status(200).json({ ok: true });
});

router.get("/user-protected", isSignIn, IsStudent, (req, res) => {
  res.status(200).json({ ok: true });
});




export default router;
