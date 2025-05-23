import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {  type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, requred: true },
    role: { type: String, enum: ["Admin", "Teacher" ,"Student"], required: true },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const  userModel = mongoose.model('User', userSchema)
export default userModel;