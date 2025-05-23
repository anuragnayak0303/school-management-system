// models/ERTForm.js
import mongoose from 'mongoose';

const ERTFormSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String, required: true },
    dob: { type: Date, required: true },
    schoolName: { type: String, required: true },
    currentClass: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
}, { timestamps: true });

const ERTForm = mongoose.models.ERTForm || mongoose.model('ERTForm', ERTFormSchema);
export default ERTForm;
