import LeaveApplication from "../models/LeaveApplication.js";


// ⛳ Submit new leave request
export const applyLeave = async (req, res) => {
  try {
    const { reason, fromDate, toDate, userId } = req.body;
    // Assume user is authenticated
    console.log(userId)
    if (!reason || !fromDate || !toDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const leave = new LeaveApplication({
      reason,
      fromDate,
      toDate,
      userId,
    });

    await leave.save();
    res.status(201).json({ message: "Leave application submitted", leave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📄 Get all leaves (admin)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find()
      .populate({
        path: 'userId',
        populate: {
          path: 'userId', // Nested field inside user
          model: 'User'   // Or replace with correct model name like 'Department' or 'Role'
        }
      });

    res.status(200).json(leaves);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllLeavesforAdmin = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find().populate("userId", "name email");
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 👤 Get my leave applications
export const getAllLeave = async (req, res) => {
  try {
    console.log("Ok ")
    const leaves = await LeaveApplication.find({userId:req.params.id})
    console.log(leaves)
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update status: Approve or Reject
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await LeaveApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!leave) return res.status(404).json({ message: "Leave not found" });

    res.status(200).json({ message: "Status updated", leave });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ❌ Delete leave
export const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveApplication.findByIdAndDelete(id);

    if (!leave) return res.status(404).json({ message: "Leave not found" });

    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
