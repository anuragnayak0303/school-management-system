import mongoose from "mongoose";

const AdmissionListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: Number,
    required: true,
    unique: true,
    match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
  },
  description: { type: String, required: true },
  Data: { type: Date, default: Date.now }
});

const AdmissionEnquiryModel = mongoose.model("Admission", AdmissionListSchema);
export default AdmissionEnquiryModel;
