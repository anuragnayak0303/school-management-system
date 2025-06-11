// models/AssignmentModel.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeacherDetail",
    required: true,
  },
  file: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Assignment", assignmentSchema);
