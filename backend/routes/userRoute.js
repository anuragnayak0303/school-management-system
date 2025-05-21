import express from "express";
import {
  EmailVerification,
  forgetpassowrd,
  getSigngleUser,
  loginController,
  passwordmatch,
  registerController,
} from "../controllers/userContoller.js";
import { isAdmin, isSignIn } from "../middlewares/authMiddeware.js";
// ROUTER INSTANCE
const router = express.Router();
//API ROUTES
// REGISTER
// http://localhost:8000/api/v2/emp/register
router.post("/register", registerController);
// LOGIN
//  http://localhost:8000/api/v2/emp/login
router.post("/login", loginController);

//PROTECTD ROUTES
// localhost:8000/api/v2/emp/admin-protected
router.get("/admin-protected", isSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});
// http://localhost:8000/api/v2/emp/emailVerified
router.post("/emailVerified", isSignIn, EmailVerification);

//http://localhost:8000/api/v2/emp/user-protected
router.get("/user-protected", isSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//http://localhost:8000/api/v2/emp/passwordmatch
router.post('/passwordmatch',isSignIn ,passwordmatch)
router.post('/ForgetPass',isSignIn ,forgetpassowrd)
router.get('/getsingle',isSignIn ,getSigngleUser)


export default router;
