// controllers/leaveRequestController.js

import LeaveRequestModel from '../models/LeaveRequestModel.js';
/* ------------------------------------------------------------------
   1.  Create a leave request   POST /api/leaves
-------------------------------------------------------------------*/
export const createLeaveRequest = async (req, res) => {
  try {
    const { from, to, reason ,student } = req.body;

    // Basic validation
    if (!from || !to || !reason)
      return res.status(400).json({ message: "All fields are required." });

    const leave = await LeaveRequestModel.create({
      student, // assumes auth middleware sets req.user
      from,
      to,
      reason,
    });

    res.status(201).json(leave);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to create leave request" });
  }
};

/* ------------------------------------------------------------------
   2.  Get all leave requests   GET /api/leaves
-------------------------------------------------------------------*/
export const getAllLeaveRequests = async (_req, res) => {
  try {
    const leaves = await LeaveRequestModel.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to fetch leave requests" });
  }
};

/* ------------------------------------------------------------------
   3.  Get one leave request   GET /api/leaves/:id
-------------------------------------------------------------------*/
export const getLeaveRequestById = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leave request" });
  }
};

/* ------------------------------------------------------------------
   4.  Update status (approve / reject)   PUT /api/leaves/:id/status
-------------------------------------------------------------------*/
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body; // "approved" | "rejected"

    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status value" });

    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status, decisionAt: new Date() },
      { new: true }
    );

    if (!leave) return res.status(404).json({ message: "Leave not found" });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: "Failed to update leave status" });
  }
};

/* ------------------------------------------------------------------
   5.  Delete a leave request   DELETE /api/leaves/:id
-------------------------------------------------------------------*/
export const deleteLeaveRequest = async (req, res) => {
  try {
    const deleted = await LeaveRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Leave not found" });
    res.json({ message: "Leave request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete leave request" });
  }
};
