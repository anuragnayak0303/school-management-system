import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    address: { type: String },
    joiningDate: { type: Date },
    gender: { type: String },
    qualification: { type: String },
    Designation: { type: String },
    salary: { type: Number }
}, { timestamps: true });

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
