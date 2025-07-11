import express from "express";
import "dotenv/config";
import chalk from "chalk";
import connectDB from "./db/config.js";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoute.js";
import ClassRoutes from "./routes/ClassRoutes.js";
import employeeRoutes from "./routes/employeeRoute.js";
import leaveRoutes from "./routes/leaveRoute.js";
import salaryRoutes from "./routes/salaryRoute.js";
import Addressrouter from "./routes/addressRoutes.js";
import Admissionrouter from "./routes/admissionRoutes.routes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/StudentRout.js";
import ertRoutes from "./routes/ertRoutes.js";
import MarqueeRoute from "./routes/MarqueeRoute.js";
import attendanceRoute from "./routes/attendanceRoutes.js";
import studentAttendencrouter from "./routes/studentattendanceRoutes.js";
import Eventrouter from "./routes/eventRoutes.js";
import Assignmentrouter from "./routes/assignmentRoutes.js";
import StuLeaverouter from "./routes/StudentleaveRoutes.js";
import Markrouter from "./routes/MarkRoute.js";
import WebSiterouter from "./routes/WebsiteRoutes.js";

// INSTANCE OF EXPRESS
const app = express();

// PORT
const port = process.env.PORT || 8000;

// DB CONNECTION
connectDB();

// MIDDLEWARES
app.use(cors({
  origin: 'https://school-management-system-3-id3q.onrender.com/',
  credentials: true
}));

app.use(express.json());
app.use(express.static("public/uploads"));

// API ROUTES
app.use("/api/v2/user/", userRoutes);                 // User routes
app.use("/api/v2/class/", ClassRoutes);              // Class routes
app.use("/api/v2/employees/", employeeRoutes);       // Employee routes
app.use("/api/v2/employees/salary/", salaryRoutes);  // Salary routes
app.use("/api/v2/employees/leave", leaveRoutes);    // Leave routes
app.use("/api/v2/admission", Admissionrouter);       // Admission routes
app.use("/api/v2/subject", subjectRoutes);           // Subject routes
app.use("/api/teachers", teacherRoutes);             // Teacher routes
app.use("/api/v3/student", studentRoutes);           // Student routes
app.use("/api/ert", ertRoutes);                      // ERT routes
app.use("/api/marquee", MarqueeRoute);               // Marquee routes
app.use("/api/v2", Addressrouter);
app.use("/api/attendance", attendanceRoute);                // Address routes
app.use("/api/v8/student/attendance", studentAttendencrouter) //Attendance Routes
app.use("/api/v8/event", Eventrouter)
app.use("/api/v9/assignments", Assignmentrouter)
app.use("/api/v10/student-leave", StuLeaverouter)
app.use("/api/v11/exam", Markrouter) 
app.use('/api/website', WebSiterouter);       

// NEW ROUTE: Get Client's Public IP
app.get("/api/get-ip", (req, res) => {
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",").shift() ||
    req.socket?.remoteAddress ||
    null;
  res.json({ ip });
});

// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to the School Management Backend API 🎓");
});

// START SERVER
app.listen(port, () => {
  console.log(chalk.magenta(`Server running at http://localhost:${port}`));
});
