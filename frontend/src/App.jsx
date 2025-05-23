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
import ViewTeacher from "./Admin/ViewTeacher";
import StudentAdmissionList from "./Admin/StudentAdmissionFrom";
import ContactPage from "./page/ContactPage";
import Campus from "./page/Campus";
import AllStudent from "./Admin/AllStudent";
import ERT from "./page/ERT";
import ERTlist from "./Admin/ERTlist";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/mission-and-vision" element={<Mission />} />
          <Route path="/principal-message" element={<PrincipleMessage />} />
          <Route path="/admissions-enquiry" element={<Admission />} />
          <Route path="/registration-for-ert" element={<ERT />} />
          <Route path="/campus-infrastructure" element={<Campus />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/dash" element={<Dashboard />} />

          <Route path="/school/" element={<AdminProtected />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="academy/subject" element={<CourseManagement />} />
            <Route path="academy/all_classess" element={<AllClassess />} />
            <Route path="vister_admission_list" element={<VisterAdmission />} />
            <Route path="ert-list" element={<ERTlist />} />
            <Route path="admission_from" element={<StudentAdmissionList />} />
            <Route path="all_student" element={<AllStudent />} />
            <Route path="all_teacher" element={<AllTeacherList />} />
            <Route path="add_teacher" element={<AddTeacher />} />
            <Route path="view_teacher/:id" element={<ViewTeacher />} />
            <Route path="admin/setting" element={<Setting />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="LogoEdit" element={<Website />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
