import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  occupation: String,
  relation: String,
  photo: String
}, { _id: false });

const studentAdmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', require: true },
  admissionNumber: String,
  rollNumber: String,
  primaryContact: String,
  admissionDate: Date,
  dateOfBirth: Date,
  academicYear: String,
  class: {type: mongoose.Schema.Types.ObjectId, ref:'Department', require: true},
  status: String,
  gender: String,
  bloodGroup: String,
  religion: String,
  category: String,
  father: parentSchema,
  mother: parentSchema,
  guardian: parentSchema,
}, { timestamps: true });

const StudentAdmission = mongoose.model('StudentAdmission', studentAdmissionSchema);
export default StudentAdmission;
