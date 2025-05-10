import departmentModel from "../models/departmentModel.js"

export const addDepartmentController = async (req, res) => {
    try {
        const { dept_name, description } = req.body
        if (!dept_name) {
            return res.status(404).json({ message: "Departent Name is required!" })
        }
        else if (!description) {
            return res.status(404).json({ message: "Description is required!" })
        }

        else {
            const department = new departmentModel({
                dept_name,
                description
            })
            await department.save()
            res.status(201).json({
                success: true,
                message: 'New Department Added!',
                department
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while adding department...",
            error
        })
    }
}

//  getAllDepartmentsController
export const getAllDepartmentsController = async (req, res) => {
    try {
        const departments = await departmentModel.find();
        res.status(200).json({
            success: true,
            departments
        })
    } catch (error) {
        req.status(500).json({
            success: false,
            message: "error while getting departments...",
            error
        })
    }
}

// updateDepartmentCotroller
export const updateDepartmentCotroller = async (req, res) => {
    try {
        console.log(req.params.dept_id)
        console.log(req.body.dept_name)
        console.log( req.body.description)

        const department = await departmentModel.findByIdAndUpdate(
          
            { _id: req.params.dept_id },
            {
                $set: {
                    dept_name: req.body.dept_name,
                    description: req.body.description
                }
            }, {
            new: true
        })
        res.status(201).json({
            success: true,
            message: "Department Updated!",
            department
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error in upate department...",
            error
        })
    }
}

// deleteDepartmentController
export const DeleteDepartmentCotroller = async (req, res) => {
    try {
        await departmentModel.findByIdAndDelete({ _id: req.params.dept_id })
        res.status(200).json({
            success: true,
            message: "Department deleted!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting department...",
            error
        })
    }
}

// getSingleDepartmentCotroller
export const getSingleDepartmentCotroller = async (req, res) => {
    try {
        const department = await departmentModel.findById({ _id: req.params._id });
        res.status(200).json({
            success: true,
            department
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while getting dept...",
            error
        })
    }
}