import mongoose from "mongoose";
const marqueeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, require: true },
    updatedAt: { type: Date, default: Date.now },
})

const Marqueemodel = mongoose.model('Marrque', marqueeSchema)
export default Marqueemodel;