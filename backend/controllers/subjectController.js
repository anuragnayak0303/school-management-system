import ClassModel from "../models/Class.js";
import Subject from "../models/Subject.js";


export const addSubject = async (req, res) => {
    try {
        const { subjectName, subjectType, classId, subjectCode } = req.body;

        if (!subjectName || !subjectType || !classId) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        const Class = await ClassModel.findById(classId)
        const newSubject = new Subject({
            subjectName,
            subjectType,
            classId,
            subjectCode: "#00" + subjectCode,
        });
        Class.Subjects.push(classId)

        const savedSubject = await newSubject.save();
        await Class.save

        res.status(201).json(savedSubject);
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('classId', 'Classname');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch subjects' });
    }
};

export const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { subjectName, subjectType, classId, subjectCode } = req.body;

        // Validation (basic check)
        if (!subjectName || !subjectType || !classId) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            {
                subjectName,
                subjectType,
                classId,
                subjectCode,
            },
            { new: true } // return the updated document
        );

        if (!updatedSubject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.status(200).json({
            message: "Subject updated successfully",
            subject: updatedSubject,
        });
    } catch (error) {
        console.error("Error updating subject:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteMultipleSubjects = async (req, res) => {
    try {

        const data = await Subject.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: ` subject(s) deleted successfully.`,
        });
    } catch (error) {
        console.error("Error deleting multiple subjects:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const ClassSubject = async (req, res) => {
    try {
        const subjects = await Subject.find({classId:req.params.id})
        res.status(200).json(subjects);
    } catch (error) {

    }
}