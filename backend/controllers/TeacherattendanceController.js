import TeacherAttendance from "../models/TeacherAttendance.js";



export const markAttendance = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Optional: check if already punched in today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const alreadyPunched = await TeacherAttendance.findOne({
      userId,
      punchInTime: { $gte: startOfDay },
    });

    if (alreadyPunched) {
      return res.status(409).json({ message: "Already punched in today." });
    }

    const attendance = await TeacherAttendance.create({ userId });

    res.status(201).json({
      message: "Punch-in recorded successfully.",
      punchInTime: attendance.punchInTime,
    });
  } catch (error) {
    console.error("Punch-in error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAttendanceByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const records = await TeacherAttendance.find({ userId }).sort({ punchInTime: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};