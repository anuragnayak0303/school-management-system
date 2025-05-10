import mongoose, { Schema } from "mongoose";
const leaveSchema = new mongoose.Schema({
   employeeId: { type: Schema.Types.ObjectId, ref: "User", 
      required: true },
     leaveType:{
        type:String,
        enum:["Seek Leave","Casual Leave","Annual Leave"],
        required:true
     },
     startDate:{type:Date,required:true},
     endDate:{type:Date,required:true},
     reason:{type:String,required:true},
     status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
     },
     appliedAt:{type:Date,default:Date.now},
     updatedAt:{type:Date,default:Date.now}
})

const leaveModel =  mongoose.model("Leave",leaveSchema)
export default leaveModel