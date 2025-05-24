import ClassModel from "../models/Class.js"


export const addClassController = async (req, res) => {
    try {
        const { Classname, status } = req.body
        if (!Classname) {
            return res.status(404).json({ message: "Classname Name is required!" })
        }
        else if (!status) {
            return res.status(404).json({ message: "Statu is required!" })
        }

        else {
            const Class = new ClassModel(req.body)
            await Class.save()
            res.status(201).json({
                success: true,
                message: 'New Department Added!',
                Class
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
export const getAllClassController = async (req, res) => {
    try {
        const Classes = await ClassModel.find();
        res.status(200).json(Classes
        )
    } catch (error) {
        req.status(500).json({
            success: false,
            message: "error while getting departments...",
            error
        })
    }
}

export const updateClassCotroller = async (req, res) => {
    try {

        const Class = await ClassModel.findByIdAndUpdate(

            { _id: req.params.id },
            {
                $set: {
                    Classname: req.body.Classname,
                    Student_Of_no: req.body.Student_Of_no,
                    status: req.body.status
                }
            }, {
            new: true
        })
        res.status(201).json({
            success: true,
            message: "Department Updated!",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error in upate department...",
            error
        })
    }
}

// deleteDepartmentController
export const DeleteClassCotroller = async (req, res) => {
    try {
        await ClassModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            success: true,
            message: "Class deleted!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting department...",
            error
        })
    }
}