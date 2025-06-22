// controllers/teacherController.js

import multer from "multer";
import path from "path";
import Addressmodel from "../models/adressmodel.js";
import TeacherDetail from "../models/TeacherDetail.js";
import userModel from "../models/userModel.js";
import { hashedPassword } from "../utils/utils.js";

// Multer storage for photo upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const Teacherupload = multer({ storage });
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
            fatherName,
            motherName,
            panOrIdNumber,
            accountName,
            accountNumber,
            salary,
            bankName,
            ifscCode,
            branchName,
        } = req.body;
        // console.log(req.body)
        const fullAddress = req.body.address;

        // Handle classes input (classId + subjects[])
        let Class = [];
        let subject = [];

        if (req.body.classes) {
            const parsed = typeof req.body.classes === "string"
                ? JSON.parse(req.body.classes)
                : req.body.classes;

            parsed.forEach((item) => {
                if (item.classId) {
                    Class.push(item.classId);
                }
                if (Array.isArray(item.subjects)) {
                    subject.push(...item.subjects);
                }
            });
        }

        console.log("Parsed Class IDs:", Class);
        console.log("Parsed Subject IDs:", subject);

        // Check if email or teacher ID exists
        const existingUser = await userModel.findOne({ email });
        const existingTeacherId = await TeacherDetail.findOne({ teacherId });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        if (existingTeacherId) {
            return res.status(400).json({ success: false, message: "Teacher ID already exists" });
        }

        // Create User
        const user = new userModel({
            name: `${firstName} ${lastName}`,
            email,
            password: await hashedPassword(primaryContact),
            role: "Teacher",
            profileImage: req.file ? req.file.filename : "",
        });
        await user.save();

        // Create Address
        const addressDoc = new Addressmodel({
            userId: user._id,
            address: fullAddress,
            phone: primaryContact,
        });
        await addressDoc.save();

        // Create Teacher
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
            Class,
            subject,
            fatherName,
            motherName,
            panOrIdNumber,
            address: addressDoc._id,
            bankDetails: {
                accountName,
                accountNumber,
                bankName,
                ifscCode,
                branchName,
            },
        });
        await teacher.save();

        res.status(201).json({ success: true, message: "Teacher added successfully" });
    } catch (err) {
        console.error("Add Teacher Error:", err);
        res.status(500).json({ success: false, message: "Failed to add teacher" });
    }
};


// Get All Teachers
export const GetAllTeacher = async (req, res) => {
    try {
        const data = await TeacherDetail.find()
            .populate("userId")
            .populate("address")
            .populate("Class")
            .populate("subject");
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch teachers");
    }
};

// Get Single Teacher by ID
export const GetSigleData = async (req, res) => {
    try {
        const data = await TeacherDetail.findById(req.params.id)
            .populate("userId")
            .populate("address")
            .populate("Class")
            .populate("subject");
        // console.log(data)
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch teacher");
    }
};

// Delete Teacher by ID
export const GetSingledelet = async (req, res) => {
    try {
        const data = await TeacherDetail.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        await userModel.findByIdAndDelete(data.userId);
        await Addressmodel.findByIdAndDelete(data.address);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error while deleting teacher:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Teacher by User ID
export const GetTearcherdatabyusingUserId = async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await TeacherDetail.findOne({ userId: req.params.id })
            .populate("userId")
            .populate("address")
            .populate("Class")
            .populate({
                path: "subject",
                populate: {
                    path: "classId",
                    model: "Department" // replace with your actual class model name if different
                }
            });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch teacher by userId");
    }
};

export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        // Destructure all fields from req.body (note: multer parses multipart/form-data)
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
            fatherName,
            motherName,
            panOrIdNumber,
            salary,
            accountName,
            accountNumber,
            bankName,
            ifscCode,
            branchName,
            address // address as string
        } = req.body;
        console.log(req.body)
        // Parse classes JSON string (sent from frontend)
        let Class = [];
        let subject = [];
        if (req.body.classes) {
            const parsedClasses = typeof req.body.classes === "string"
                ? JSON.parse(req.body.classes)
                : req.body.classes;

            parsedClasses.forEach(item => {
                if (item.classId) Class.push(item.classId);
                if (Array.isArray(item.subjects)) subject.push(...item.subjects);
            });
        }

        // Find teacher
        const teacher = await TeacherDetail.findById(id).populate("userId address");
        if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

        // Update user model
        const user = await userModel.findById(teacher.userId._id);
        if (user) {
            user.name = `${firstName} ${lastName}`;
            user.email = email;
            if (req.file) {
                user.profileImage = req.file.filename; // multer uploaded file
            }
            await user.save();
        }

        // Update address model
        const addressModel = await Addressmodel.findById(teacher.address._id);
        if (addressModel) {
            addressModel.address = address;
            addressModel.phone = primaryContact;
            await addressModel.save();
        }

        // Update teacher details
        teacher.teacherId = teacherId;
        teacher.gender = gender;
        teacher.dateOfBirth = dateOfBirth;
        teacher.dateOfJoining = dateOfJoining;
        teacher.maritalStatus = maritalStatus;
        teacher.bloodGroup = bloodGroup;
        teacher.qualification = qualification;
        teacher.workExperience = workExperience;
        teacher.status = status;
        teacher.salary = salary;
        teacher.Class = Class;
        teacher.subject = subject;
        teacher.fatherName = fatherName;
        teacher.motherName = motherName;
        teacher.panOrIdNumber = panOrIdNumber;
        teacher.bankDetails = {
            accountName,
            accountNumber,
            bankName,
            ifscCode,
            branchName,
        };

        await teacher.save();

        return res.status(200).json({ success: true, message: "Teacher updated successfully" });
    } catch (err) {
        console.error("Update Teacher Error:", err);
        return res.status(500).json({ success: false, message: "Failed to update teacher" });
    }
};

