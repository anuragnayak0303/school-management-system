import ClassModel from "../models/Class.js"
import StudentAdmission from "../models/StudentAdmission.js"
import Subject from "../models/Subject.js"
import TeacherDetail from "../models/TeacherDetail.js"


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

export const GetNo_0f_Student = async (req, res) => {
    try {
        const Class =await ClassModel.findById(req.params.id)
        res.send(Class)
    } catch (error) {
        console.log(error)
    }
}

//  getAllDepartmentsController
export const getAllClassController = async (req, res) => {
    try {
        const Classes = await ClassModel.find().populate("")
        res.status(200).json(Classes
        )
    } catch (error) {
        res.status(500).json({
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
        const classId = req.params.id;

        const [subjectLinked, studentLinked, teacherLinked] = await Promise.all([
            Subject.findOne({ classId }),
            StudentAdmission.findOne({ class: classId }),
            TeacherDetail.findOne({ Class: classId }),
        ]);

        if (subjectLinked || studentLinked || teacherLinked) {
            return res.status(400).json({
                success: false,
                message:
                    "Cannot delete this class because it is currently linked with subjects, students, or teachers. Please remove all associations before deletion.",
            });
        }

        await ClassModel.findByIdAndDelete(classId);

        res.status(200).json({
            success: true,
            message: "The class has been successfully deleted.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the class.",
            error,
        });
    }
};