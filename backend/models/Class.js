import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
    Classname: { type: String, required: true },
    Student_Of_no: { type: Number },
    status: { type: String, enum: ["Active", "Inactive"], required: true },
    Subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    createdAt: { type: Date, default: Date.now },

})

const ClassModel = mongoose.model('Department', ClassSchema)
export default ClassModel;