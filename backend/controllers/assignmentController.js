import AssignmentModel from "../models/AssignmentModel.js";

// controllers/assignmentController.js
export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, class: classId, dueDate, academicYear, teacherId } = req.body;
    const file = req.file?.path || "";

    const assignment = new AssignmentModel({
      title,
      description,
      subject,
      class: classId,
      dueDate,
      academicYear,
      teacher: teacherId,
      file,
    });

    await assignment.save();
    res.status(201).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAssignmentsByClass = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const currentYear = new Date().getFullYear().toString();

    const assignments = await AssignmentModel.find({
      teacher: teacherId,
      academicYear: currentYear,
    }).populate("subject").populate("teacher");

    res.status(200).json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const GetAllAssignment = async (req, res) => {
  try {
    const assignments = await AssignmentModel.find()
    res.status(200).json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
