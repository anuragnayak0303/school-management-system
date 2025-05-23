import multer from "multer";
import Addressmodel from "../models/adressmodel.js";
import TeacherDetail from "../models/TeacherDetail.js";
import userModel from "../models/userModel.js";
import { hashedPassword } from "../utils/utils.js";
import path from 'path';

// Set up multer storage for photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const Teacherupload = multer({ storage: storage });
export { Teacherupload };

// Add Teacher Controller
export const addTeacher = async (req, res) => {
    try {
        const {
            teacherId,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            dateOfJoining,
            maritalStatus,
            email,
            primaryContact,
            bloodGroup,
            qualification,
            workExperience,
            status,
            classId,
            fatherName,
            motherName,
            panOrIdNumber,
            accountName,
            accountNumber,
            salary,
            bankName,
            ifscCode,
            branchName
        } = req.body;
        console.log(req.body)

        const fullAddress = req.body.address; // get address separately to avoid variable name conflict

        // Extract subjects array (from checkboxes)
        const subjectArray = [];
        Object.keys(req.body).forEach(key => {
            if (key.startsWith("subjects")) {
                subjectArray.push(req.body[key]);
            }
        });

        // Check if email or teacherId already exists
        const existingUser = await userModel.findOne({ email });
        const existingTeacherId = await TeacherDetail.findOne({ teacherId });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        if (existingTeacherId) {
            return res.status(400).json({ success: false, message: "Teacher ID already exists" });
        }

        // Create user login
        const user = new userModel({
            name: `${firstName} ${lastName}`,
            email,
            password: await hashedPassword(primaryContact),
            role: "Teacher",
            profileImage: req.file ? req.file.filename : ""
        });
        await user.save();

        // Create address document
        const addressDoc = new Addressmodel({
            userId: user._id,
            address: fullAddress,
            phone: primaryContact
        });
        await addressDoc.save();

        // Create teacher profile
        const teacher = new TeacherDetail({
            userId: user._id,
            teacherId: "DSP" + teacherId,
            gender,
            dateOfBirth,
            dateOfJoining,
            maritalStatus,
            bloodGroup,
            qualification,
            workExperience,
            status,
            salary,
            Class: [classId],
            subject: subjectArray,
            fatherName,
            motherName,
            panOrIdNumber,
            address: addressDoc._id,
            bankDetails: {
                accountName,
                accountNumber,
                bankName,
                ifscCode,
                branchName
            }
        });
        await teacher.save();

        // Success response
        res.status(201).json({ success: true, message: "Teacher added successfully" });

    } catch (err) {
        console.error("Add Teacher Error:", err);
        res.status(500).json({ success: false, message: "Failed to add teacher" });
    }
};

export const GetAllTeacher = async (req, res) => {
    try {
        const data = await TeacherDetail.find().populate("userId").populate('Class').populate("address").populate("subject")
        return res.send(data)
    } catch (error) {
        console.log(error)
    }
}

export const GetSigleData = async (req, res) => {
    try {
        console.log(req?.params.id)
        const data = await TeacherDetail.findById(req?.params?.id).populate("userId").populate('Class').populate("address").populate("subject")
        return res.send(data)
    } catch (error) {
        console.log(error)
    }
}

export const GetSingledelet = async (req, res) => {
    try {
        const data = await TeacherDetail.findByIdAndDelete(req.params.id)
        if (data) {
            const user = await userModel.findByIdAndDelete(data?.userId)
            const adress = await Addressmodel.findByIdAndDelete(data?.address)
            return res.send("Delete Successfully")
        }
    } catch (error) {
        console.log(error)
    }
}
