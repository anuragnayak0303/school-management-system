
import employeeModel from "../models/employeeModel.js"
import leaveModel from "../models/leaveModel.js"


export const addLeaveController = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body
        // console.log(req.body)
        const leave = new leaveModel({
            employeeId: userId, leaveType,startDate, endDate, reason
        })

        const newLeave = await leave.save()
        // console.log(newLeave)
        res.status(201).json({
            success: true,
            newLeave
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while applying leave...",
            error
        })
    }
}

export const getLeavesController = async (req, res) => {
    try {
        const employee = await employeeModel.findOne({ userId: req.params._id })
        console.log(employee)
        const leaves = await leaveModel.find({ employeeId: employee.userId })
        return res.status(200).json({
            success: true,
            leaves
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting leaves...",
            error
        })
    }
}

export const getEmployeesLeaves = async (req, res) => {
    try {
        
        const leaves = await leaveModel.find()
        .populate("employeeId","-password")
       
        return res.status(200).json({
            success: true,
            leaves
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error whille getting all leaves.."
        })
    }
}

export const leaveDetailController= async (req,res)=>{
   try {
        const leave = await leaveModel.findOne({_id:req?.params?._id})
        .populate("employeeId","-password")
        return res.status(200).json({
            success:true, 
            leave
        })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:"Error while in leave detial... ",
        error
    })
   }
} 