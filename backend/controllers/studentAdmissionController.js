import multer from 'multer';
import Addressmodel from '../models/adressmodel.js';
import StudentAdmission from '../models/StudentAdmission.js';
import userModel from '../models/userModel.js';
import { hashedPassword } from '../utils/utils.js';
import path from 'path'
import ClassModel from '../models/Class.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const StudentUpload = multer({ storage: storage });
export { StudentUpload };
export const submitAdmission = async (req, res) => {
    try {
        const {
            admissionNumber,
            rollNumber,
            firstName,
            lastName,
            primaryContact,
            email,
            admissionDate,
            dateOfBirth,
            academicYear,
            class: className,
            status,
            gender,
            bloodGroup,
            religion,
            category,
            fatherName = '',
            fatherEmail = '',
            fatherPhone = '',
            fatherOccupation = '',
            motherName = '',
            motherEmail = '',
            motherPhone = '',
            motherOccupation = '',
            guardianName = '',
            guardianEmail = '',
            guardianPhone = '',
            guardianRelation = '',
            fullAddress = ''
        } = req.body;
        console.log(req.file)
        // console.log(req.body)
        // Check required fields
        if (!admissionNumber || !rollNumber || !firstName || !lastName || !email || !className) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Handle photo uploads
        // const getFilePath = (field) => ;

        const user = new userModel({
            name: `${firstName} ${lastName}`,
            email,
            password: await hashedPassword(rollNumber),
            role: "Student",
            profileImage: req.file?.filename || "" // ensure front-end uses name="photo"
        });
        await user.save();

        const addressDoc = new Addressmodel({
            userId: user._id,
            address: fullAddress,
            phone: primaryContact
        });
        await addressDoc.save();

        const newAdmission = new StudentAdmission({
            userId: user._id,
            admissionNumber,
            rollNumber,
            primaryContact,
            admissionDate,
            dateOfBirth,
            academicYear,
            class: className,
            status,
            gender,
            bloodGroup,
            religion,
            category,
            father: {
                name: fatherName,
                email: fatherEmail,
                phone: fatherPhone,
                occupation: fatherOccupation,
            },
            mother: {
                name: motherName,
                email: motherEmail,
                phone: motherPhone,
                occupation: motherOccupation,
            },
        });

        await newAdmission.save();

        const ClassStuden = await ClassModel.findById({ _id: className });

        const Class = await ClassModel.findByIdAndUpdate({ _id: className }, {
            Student_Of_no: ClassStuden?.Student_Of_no + 1
        })

        res.status(201).json({ success: true, message: "Admission submitted successfully", data: newAdmission });

    } catch (error) {
        console.error("Error in submitAdmission:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


export const GetDataAll = async (req, res) => {
    try {
        const data = await StudentAdmission.find().populate("userId").populate("class")
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

export const GetDataById = async (req, res) => {
    try {
        const data = await StudentAdmission.findOne({ userId: req.user }).populate("userId").populate("class")
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}
export const GetDataByIdforAdmin = async (req, res) => {
    try {
        const data = await StudentAdmission.findOne({ _id: req.params.id }).populate("userId").populate("class")
        res.send(data)
        console.log(req.params.id)
    } catch (error) {
        console.log(error)
    }
}

export const GetStudentByClassID = async (req, res) => {

    try {
        console.log(req.params.id)
        const data = await StudentAdmission.find({ class: req.params.id }).populate('userId')
        // console.log(data)
        res.send(data)

    } catch (error) {
        console.log(error)
    }
}
// POST /api/v3/student/students/by-class-list
export const GetStudentsByClassList = async (req, res) => {
    try {
        const { classIds } = req.body;
        if (!Array.isArray(classIds) || classIds.length === 0) {
            return res.status(400).json({ success: false, message: "classIds must be a non-empty array" });
        }

        const students = await StudentAdmission.find({ class: { $in: classIds } })
            .populate('userId')
            .populate('class');

        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


export const updateAdmission = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            admissionNumber,
            rollNumber,
            firstName,
            lastName,
            primaryContact,
            email,
            admissionDate,
            dateOfBirth,
            academicYear,
            class: className,
            status,
            gender,
            bloodGroup,
            religion,
            category,
            fatherName = '',
            fatherEmail = '',
            fatherPhone = '',
            fatherOccupation = '',
            motherName = '',
            motherEmail = '',
            motherPhone = '',
            motherOccupation = '',
            guardianName = '',
            guardianEmail = '',
            guardianPhone = '',
            guardianRelation = '',
            fullAddress = ''
        } = req.body;
        const admissionDoc = await StudentAdmission.findById(id).populate("userId");
        if (!admissionDoc) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const userId = admissionDoc.userId._id;

        // Update user info
        await userModel.findByIdAndUpdate(userId, {
            name: `${firstName} ${lastName}`,
            email,
            profileImage: req.file?.filename || admissionDoc.userId.profileImage,
        });

        // Update address
        await Addressmodel.findOneAndUpdate({ userId }, {
            address: fullAddress,
            phone: primaryContact
        });

        // Handle class change: decrease old class, increase new class count
    
        // Update admission details
        await StudentAdmission.findByIdAndUpdate(id, {
            admissionNumber,
            rollNumber,
            primaryContact,
            admissionDate,
            dateOfBirth,
            academicYear,
            class: className,
            status,
            gender,
            bloodGroup,
            religion,
            category,
            father: {
                name: fatherName,
                email: fatherEmail,
                phone: fatherPhone,
                occupation: fatherOccupation,
            },
            mother: {
                name: motherName,
                email: motherEmail,
                phone: motherPhone,
                occupation: motherOccupation,
            },
            guardian: {
                name: guardianName,
                email: guardianEmail,
                phone: guardianPhone,
                relation: guardianRelation,
            },
        });

        res.status(200).json({ success: true, message: "Student updated successfully" });

    } catch (error) {
        console.error("Error in updateAdmission:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


