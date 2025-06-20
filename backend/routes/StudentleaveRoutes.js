import express from "express";

import { deleteLeaveRequest, createLeaveRequest, getAllLeaveRequests, getLeaveRequestById, updateLeaveStatus } from "../controllers/leaveRequestController.js";
const StuLeaverouter = express.Router();


// /api/v10/student-leave/
StuLeaverouter.post("/", createLeaveRequest);
StuLeaverouter.get("/", getAllLeaveRequests);
StuLeaverouter.get("/:id", getLeaveRequestById);
StuLeaverouter.put("/:id/status", updateLeaveStatus);
StuLeaverouter.delete("/:id", deleteLeaveRequest);

export default StuLeaverouter;
