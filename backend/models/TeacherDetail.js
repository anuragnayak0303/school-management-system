import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teacherId: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  dateOfBirth: { type: Date },
  dateOfJoining: { type: Date },
  maritalStatus: { type: String },
  bloodGroup: { type: String },
  qualification: { type: String },
  workExperience: { type: String },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
  status: { type: String, enum: ["Active", "Inactive"] },
  Class: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }], // Consider linking to Class model if needed
  subject: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], // Same here
  fatherName: { type: String },
  motherName: { type: String },
  panOrIdNumber: { type: String },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String,
    branchName: String
  },
  salary: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const TeacherDetail = mongoose.model("TeacherDetail", teacherSchema);
export default TeacherDetail;
