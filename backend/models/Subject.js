import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectType: {
    type: String,
    required: true,
    enum: ["Theory", "Practical", "Other"],
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  subjectCode: {
    type: String,
    required: false,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Subject", subjectSchema);
