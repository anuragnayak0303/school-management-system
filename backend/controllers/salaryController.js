import employeeModel from "../models/employeeModel.js"
import salaryModel from "../models/salaryModel.js"

// addsalarycontroller
export const addSalaryController = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body
        const totalSalary = parseInt(basicSalary) + parseInt(allowances)
            - parseInt(deductions)
        const newSalary = new salaryModel({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        })
        const salary = await newSalary.save()
        res.status(201).json({
            success: true,
            message: "Salary added successfuly!",
            salary
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while adding salary...",
            error
        })
    }
}

//viewSalaryController
export const viewSalaryController = async (req, res) => {
    try {
        const salary = await salaryModel.find().populate("employeeId");
        res.status(200).json({
            success: true,
            salary
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while getting salary...",
            error
        })
    }
}

// getEmployeeSalaryController
export const getEmployeeSalaryController = async (req, res) => {
    try {
        let salary;
        salary = await salaryModel.findOne({ employeeId: req?.params?._id })
            .populate("employeeId")
            
        if (!salary) {
          const employee = await employeeModel.findOne({ userId: req?.params?._id })
          salary = await salaryModel.findOne({ employeeId: employee?._id })
                .populate("employeeId")
        }
        res.status(200).json({
            success: true,
            salary
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while showing Details..",
            error
        })
    }
}