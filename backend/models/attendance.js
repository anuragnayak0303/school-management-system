import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherDetail',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
  ],
  attendance: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentAdmission',
        required: true,
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Attendance = mongoose.model('StudentAttendance', attendanceSchema);
export default Attendance;
