import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    dept_name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const departmentModel = mongoose.model('Department', departmentSchema)
export default departmentModel;