import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TeacherDetail',
      required: true,
    },
    punchInTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const TeacherAttendance = mongoose.model("Attendance", attendanceSchema);
export default TeacherAttendance;
