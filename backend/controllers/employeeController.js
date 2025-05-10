import employeeModel from "../models/employeeModel.js"
import userModel from "../models/userModel.js"
import { hashedPassword } from "../utils/utils.js"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
export { upload }

// addEmployeeController
export const addEmployeeController = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      designation,
      department,
      salary,
      password,
      role
    } = req.body

    const user = await userModel.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "user already registered!" })
    }

    const newUser = new userModel({
      name,
      email,
      password: await hashedPassword(password),
      role,
      profileImage: req.file ? req.file.filename : ""

    })

    //  console.log(req.file)
    const savedUser = await newUser.save()
    // console.log(savedUser._id)

    console.log(req.body.employeeId)


    const employee = new employeeModel({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      designation,
      department,
      salary
    })

    // console.log(employee)
    await employee.save();

    res.status(201).json({
      success: true,
      message: 'New employee added!',
      employee
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while adding employee...",
      error
    })
  }
}

// getEmployeesController
export const getEmployeesController = async (req, res) => {
  try {
    const employees = await employeeModel
      .find()
      .populate("userId", { password: 0 })
      .populate("department")

    res.status(200).json({
      success: true,
      employees
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while getting employees...",
      error
    })
  }
}

// singleEmployeeController
export const singleEmployeeController = async (req, res) => {
  try {
       let employee;
       employee = await employeeModel
      .findOne({ _id: req.params._id })
      .populate("userId",{password:0})
      .populate("department")
      if(!employee)
      {
        employee= await employeeModel.findOne(
          {userId:req.params._id})
         .populate("userId",{password:0})
         .populate("department")
      }
    res.status(200).json({
      success: true,
      employee
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'error while getting single employee',
      error
    })
  }
}

//updateEmployeeController
export const updateEmployeeController = async (req, res) => {
  try {
    const { name, designation, department, salary } = req.body
    const employee = await employeeModel.findById({ _id: req.params._id })
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found!"
      })
    }
    const user = await userModel.findById({ _id: employee?.userId })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      })
    }

    const updatedUser = await userModel.findByIdAndUpdate({ _id: employee.userId }, { name });
    const updateEmployee = await employeeModel.findByIdAndUpdate(
      { _id: req.params._id },
      {
        designation,
        department,
        salary
      }
    )

    if (!updatedUser || !updateEmployee) {
      return res.status(404).json({
        success: false,
        message: "Document not found!"
      })
    }
    res.status(201).json({
      success: true,
      message: "Employee updated!"
    })



  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'error while upading employee...',
      error
    })
  }
}

//getEmployeeByDeptId
export const getEmployeeByDeptId = async (req, res) => {
  try {
    const { _id } = req.params;
    const employees = await employeeModel.find({ department: _id })
    .populate("userId")
    return res.status(200).json({
      success: true,
      employees
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting employee by dept_id..."
    })
  }
}