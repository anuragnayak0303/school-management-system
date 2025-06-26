import ClassModel from "../models/Class.js";
import Subject from "../models/Subject.js";


// controllers/subjectController.js

export const addSubjects = async (req, res) => {
    try {
        const subjects = req.body.subjects;

        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: "Subjects array is required" });
        }

        const createdSubjects = [];

        for (const subj of subjects) {
            const { subjectName, subjectType, classId, subjectCode } = subj;

            if (!subjectName || !subjectType || !classId) {
                return res.status(400).json({ message: "Required fields missing in one or more subjects" });
            }

            const Class = await ClassModel.findById(classId);
            if (!Class) {
                return res.status(404).json({ message: `Class not found for ID: ${classId}` });
            }

            const newSubject = new Subject({
                subjectName,
                subjectType,
                classId,
                subjectCode: "#00" + subjectCode,
            });

            const savedSubject = await newSubject.save();

            Class.Subjects.push(savedSubject._id);
            await Class.save();

            createdSubjects.push(savedSubject);
        }

        res.status(201).json(createdSubjects);
    } catch (error) {
        console.error("Error adding subjects:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate("classId")
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch subjects' });
    }
};

export const updateSubject = async (req, res) => {
    try {
        const { subjects } = req.body;

        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: "Subjects array is required" });
        }

        const updatedSubjects = [];

        for (const subj of subjects) {
            const { subjectId, subjectName, subjectType, classId, subjectCode } = subj;

            if (!subjectId || !subjectName || !subjectType || !classId || !subjectCode) {
                return res.status(400).json({ message: "Missing required fields in one or more subjects" });
            }

            const existingSubject = await Subject.findById(subjectId);
            console.log(existingSubject?.classId)
            console.log(classId)
            if (!existingSubject) {
                return res.status(404).json({ message: `Subject not found: ${subjectId}` });
            }

            if (existingSubject.classId.toString() !== classId) {
                console.log("ok Class Update")
                const oldClass = await ClassModel.findById(existingSubject.classId);
                const newClass = await ClassModel.findById(classId);
                console.log(" old", oldClass)
                console.log(" new", newClass)
                if (!oldClass || !newClass) {
                    return res.status(404).json({ message: "One or both class references not found" });
                }

                // Remove from old, add to new
                oldClass.Subjects = oldClass.Subjects.filter(id => id.toString() !== subjectId);
                newClass.Subjects.push(subjectId);

                await Promise.all([oldClass.save(), newClass.save()]);
            }

            const updated = await Subject.findByIdAndUpdate(
                subjectId,
                { subjectName, subjectType, subjectCode, classId },
                { new: true }
            );

            updatedSubjects.push(updated);
        }

        res.status(200).json({
            message: "Subjects updated successfully",
            updatedSubjects,
        });
    } catch (error) {
        console.error("Error updating subjects:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const deleteMultipleSubjects = async (req, res) => {
  try {
    // Check if any teacher is assigned to the subject
    const teacherUsingSubject = await TeacherDetail.findOne({ subject: req.params.id });

    if (teacherUsingSubject) {
      return res.status(400).json({
        success: false,
        message: "This subject is currently assigned to a teacher and cannot be deleted.",
      });
    }

    // Delete subject if not assigned
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

    if (!deletedSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting subject:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting subject.",
    });
  }
};

export const ClassSubject = async (req, res) => {
    try {

        const subjects = await Subject.find({ classId: req.params.id })
        res.status(200).json(subjects);
    } catch (error) {
        console.log(error)
        // console.log(error)
    }
}

export const AddSyllabusPersent = async (req, res) => {
    try {
        const { id } = req.params;
        const { completion } = req.body;

        // Validation (basic check)
        if (!completion) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            {
                completion
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
}

// controllers/teacher/getTeachersBySubjects.js
import TeacherDetail from "../models/TeacherDetail.js"
export const getTeachersBySubjects = async (req, res) => {
    try {
        const { subjectIds } = req.body; // array of subject ObjectIds

        if (!subjectIds || !Array.isArray(subjectIds) || subjectIds.length === 0) {
            return res.status(400).json({ message: "Subject IDs array is required." });
        }

        // Find all teachers who have at least one matching subject
        const teachers = await TeacherDetail.find({ subject: { $in: subjectIds } })
            .populate("userId")
            .populate("Class", "name")
            .populate("subject", "name code")
            .populate("address")
            .exec();

        if (!teachers || teachers.length === 0) {
            return res.status(404).json({ message: "No teachers found for the given subjects." });
        }

        res.status(200).json(teachers);

    } catch (error) {
        console.error("Error fetching teachers by subject list:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

