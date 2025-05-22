import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  teacherId: String,
  firstName: String,
  lastName: String,
  class: String,
  subject: String,
  gender: String,
  primaryContact: String,
  email: String,
  bloodGroup: String,
  dateOfJoining: Date,
  fatherName: String,
  motherName: String,
  dateOfBirth: Date,
  maritalStatus: String,
  languagesKnown: [String],
  qualification: String,
  workExperience: String,
  previousSchool: String,
  previousSchoolAddress: String,
  previousSchoolPhone: String,
  address: String,
  permanentAddress: String,
  panOrIdNumber: String,
  status: String,
  notes: String,
  photo: String // You can store file URL or path
}, {
  timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
