import express from "express";
import {
  getAddress,
  saveAddress,
  upload,
} from "../controllers/AdressController.js";
import { isSignIn } from "../middlewares/authMiddeware.js";

const Addressrouter = express.Router();

// http://localhost:8000/api/v2/address
Addressrouter.post("/address", isSignIn, upload.single("image"), saveAddress);

// http://localhost:8000/api/v2/get
Addressrouter.get("/get", isSignIn, getAddress);

// // http://localhost:8000/api/v2/employees/salary/view
// router.get("/view", viewSalaryController);

export default Addressrouter;
