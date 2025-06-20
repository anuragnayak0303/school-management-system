// models/LeaveRequestModel.js
import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentAdmission",
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    decisionAt: Date,
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.model("LeaveRequest", leaveRequestSchema);
