import express from "express";
import { applyLeave, deleteLeave, getAllLeaves, updateLeaveStatus } from "../controllers/leaveController.js";

const router = express.Router();

// Authenticated users
// /api/v2/employees/leave/apply
router.post("/apply", applyLeave);
router.get("/all", getAllLeaves);

// Admin
router.get("/my/:id", getAllLeaves);

router.put("/status/:id", updateLeaveStatus);
// /api/v2/employees/leave/apply/delete/
router.delete("/delete/:id", deleteLeave);

export default router;
