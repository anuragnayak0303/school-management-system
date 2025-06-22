import express from "express";

import { deleteLeaveRequest, createLeaveRequest, getAllLeaveRequests, getLeaveRequestById, updateLeaveStatus, getLeaveByStudent } from "../controllers/leaveRequestController.js";
const StuLeaverouter = express.Router();


// /api/v10/student-leave/:id/status

StuLeaverouter.post("/", createLeaveRequest);
StuLeaverouter.get("/", getAllLeaveRequests);
StuLeaverouter.get("/:id", getLeaveByStudent);
StuLeaverouter.get("/:id", getLeaveRequestById);
StuLeaverouter.put("/:id/status", updateLeaveStatus);
StuLeaverouter.delete("/:id", deleteLeaveRequest);

export default StuLeaverouter;
