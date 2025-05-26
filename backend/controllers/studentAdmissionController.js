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
        const getFilePath = (field) => req.files?.[field]?.[0]?.filename || "";

        const user = new userModel({
            name: `${firstName} ${lastName}`,
            email,
            password: await hashedPassword(rollNumber),
            role: "Student",
            profileImage: getFilePath("photo") // ensure front-end uses name="photo"
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
                photo: getFilePath("fatherPhoto")
            },
            mother: {
                name: motherName,
                email: motherEmail,
                phone: motherPhone,
                occupation: motherOccupation,
                photo: getFilePath("motherPhoto")
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