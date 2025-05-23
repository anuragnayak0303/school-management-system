import express from "express";
import "dotenv/config";
import chalk from "chalk";
import connectDB from "./db/config.js";
import cors from "cors";
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
// INSTANCE OF EXPRESS
const app = express();
// PORT
const port = process.env.PORT;
// DB CONNECTION
connectDB();
//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.static("public/uploads"));
//Routes
// http://localhost:8000/api/v2/emp/
app.use("/api/v2/emp/", userRoutes);
// localhost:8000/api/v2/department
app.use("/api/v2/class/", ClassRoutes);
// localhost:8000/api/v2/employees
app.use("/api/v2/employees/", employeeRoutes);
// http://localhost:8000/api/v2/employees/salary
app.use("/api/v2/employees/salary/", salaryRoutes);
// http://localhost:8000/api/v2/employees/leave
app.use("/api/v2/employees/leave/", leaveRoutes);
app.use("/api/v2/admission", Admissionrouter);
app.use("/api/v2/subject", subjectRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/v3/student",studentRoutes)
app.use('/api/ert', ertRoutes);


app.use("/api/v2", Addressrouter);

app.listen(port, () => {
  console.log(chalk.magenta(`Server running at http://localhost:${port}`));
});
