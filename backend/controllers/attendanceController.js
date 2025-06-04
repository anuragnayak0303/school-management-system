import Attendance from "../models/attendance.js";


// Create new attendance record
export const createAttendance = async (req, res) => {
  try {
    console.log(req.body)
    const { teacherId, classId, subjects, attendance, date } = req.body;

    const newAttendance = new Attendance({
      teacherId,
      classId,
      subjects,
      attendance,
      date,
    });

    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance', error });
    console.log(error)
  }
};

// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate('teacherId')
      .populate('classId')
      .populate('subjects')
      .populate('attendance.studentId');

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
};

// Get attendance by ID
export const getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id)
      .populate('teacherId')
      .populate('classId')
      .populate('subjects')
      .populate('attendance.studentId');

    if (!record) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error });
  }
};

// Get attendance by teacher/class/date
export const getAttendanceByQuery = async (req, res) => {
  try {
    const { teacherId, classId, date } = req.query;
    const query = {};

    if (teacherId) query.teacherId = teacherId;
    if (classId) query.classId = classId;
    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      query.date = { $gte: selectedDate, $lt: nextDay };
    }

    const records = await Attendance.find(query)
      .populate('teacherId')
      .populate('classId')
      .populate('subjects')
      .populate('attendance.studentId');

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error querying attendance', error });
  }
};

// Optional: Delete attendance
export const deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Attendance deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance', error });
  }
};

// Optional: Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance', error });
  }
};

export const getTodayAttendanceByClassAndSubject = async (req, res) => {
  try {
    const { classId, subjectId } = req.query;

    if (!classId || !subjectId) {
      return res.status(400).json({ error: 'classId and subjectId are required.' });
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const attendanceRecord = await Attendance.findOne({
      classId,
      subjects: subjectId, // subject should be in the subjects array
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate({
        path: 'attendance.studentId',
        populate: {
          path: 'userId',
          select: 'name',
          options: { strictPopulate: false },
        },
      })
      .populate('subjects', 'subjectName');

    if (!attendanceRecord) {
      return res.status(404).json({ message: 'No attendance found for given class and subject today.' });
    }

    res.status(200).json(attendanceRecord);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      error: 'Failed to fetch attendance',
      message: error.message,
    });
  }
};

