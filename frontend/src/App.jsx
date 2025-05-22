import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./page/Homepage";
import Dashboard from "./Admin/Dashboard";
import CourseManagement from "./Admin/CourseManagement ";
import Setting from "./Admin/Setting";
import ProfileSettings from "./Admin/setting/ProfileSettings";
import Login from "./Auth/Login";
import AdminProtected from "./Admin/Routes/AdminProtected";
import SecuritySettings from "./Admin/setting/SecuritySettings ";
import Website from "./Admin/setting/Website";
import Mission from "./page/Mission";
import PrincipleMessage from "./page/PrincipleMessage";
import Admission from "./page/Amission";
import AllClassess from "./Admin/AllClassess";
import VisterAdmission from "./Admin/VisterAdmission";
import { Toaster } from "react-hot-toast";
import AllTeacherList from "./Admin/AllTeacherList";
import AddTeacher from "./Admin/AddTeacher";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/mission-and-vision" element={<Mission />} />
          <Route path="/Principal-Message" element={<PrincipleMessage />} />
          <Route path="/Admissions-Enquiry" element={<Admission />} />
          <Route path="/dash" element={<Dashboard />} />

          <Route path="/school/" element={<AdminProtected />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="academy/subject" element={<CourseManagement />} />
            <Route path="academy/all_classess" element={<AllClassess />} />
            <Route path="vister_admission_list" element={<VisterAdmission />} />
            <Route path="all_teacher" element={<AllTeacherList />} />
            <Route path="add_teacher" element={<AddTeacher/>} />
            <Route path="admin/setting" element={<Setting />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="LogoEdit" element={<Website />} />
            </Route>
          </Route>
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </>
  );
}

export default App;
