// controllers/studentMarkController.js
import StudentMark from "../models/StudentMark.js";

// 1. Create student marks
export const createStudentMark = async (req, res) => {
  try {
    const {
      studentId,
      examName,
      classId,
      marks,
      fullMarks
    } = req.body;

    console.log(req.body);

    if (!Array.isArray(marks)) {
      return res.status(400).json({
        success: false,
        message: "`marks` must be an array of subject marks",
      });
    }

    const existing = await StudentMark.findOne({ studentId, examName });

    if (existing) {
      const existingSubjectIds = new Set(existing.marks.map(m => m.subjectId.toString()));

      // Only add marks that are not already in the record
      const newMarksToAdd = marks.filter(
        m => !existingSubjectIds.has(m.subjectId.toString())
      );

      if (newMarksToAdd.length === 0) {
        return res.status(409).json({
          success: false,
          message: "All submitted subject marks already exist.",
        });
      }

      existing.marks = [...existing.marks, ...newMarksToAdd];
      existing.fullMarks = fullMarks;
      existing.classId = classId;

      const updated = await existing.save();

      return res.status(200).json({
        success: true,
        message: "Marks updated successfully",
        data: updated,
      });
    } else {
      const newMark = new StudentMark({
        studentId,
        examName,
        classId,
        marks,
        fullMarks,
      });

      await newMark.save();

      return res.status(201).json({
        success: true,
        message: "Marks added successfully",
        data: newMark,
      });
    }
  } catch (error) {
    console.error("Error saving marks:", error);
    res.status(500).json({
      success: false,
      message: "Error saving marks",
      error: error.message || error,
    });
  }
};




// 2. Get all marks
export const getAllMarks = async (req, res) => {
  try {
    const marks = await StudentMark.find()
      .populate("studentId", "name rollNo")
      .populate("classId", "name")
      .populate("marks.subjectId", "subjectName");
    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching marks", error });
  }
};

// 3. Get marks by student ID
export const getMarksByStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const marks = await StudentMark.find({ studentId: id })
      .populate({
        path: "studentId",
        populate: {
          path: "userId"
        }
      })
      .populate("classId")
      .populate("marks.subjectId")
    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching student marks", error });
  }
};

// 4. Update a mark entry
export const updateStudentMark = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await StudentMark.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Marks updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error });
  }
};

// 5. Delete a mark entry
export const deleteStudentMark = async (req, res) => {
  try {
    const { id } = req.params;
    await StudentMark.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Mark entry deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed", error });
  }
};
