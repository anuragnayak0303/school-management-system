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
import LoadingScreen from "./components/LoadingScreen";
import TeacherProtected from "./Teacher/routes/TeacherProtected";
import TeacheDashbaord from "./Teacher/TeacherDashbaord";
import ViewDetails from "./Teacher/ViewDetails";
import StudentAttendenc from "./Teacher/StudentAttendenc";
import EditTeacher from "./Admin/EditTeacher";
import CreateStaff from "./Admin/CreateStaff";
import AllUsers from "./Admin/AllUsers";
import NoticeBoard from "./Admin/NoticeBoard";
import TimeTable from "./Admin/TimeTable";
import LeaveApplication from "./Teacher/LeaveApplication";
import LeavRequesr from "./Admin/LeaveRequest";
import TeacherStudentLIst from "./Teacher/StudentAll";
import AllSyllabus from "./Teacher/AllSyllabus";
import AttendencAllList from "./Teacher/AttendencAllList";
import Assignment from "./Teacher/Assignment";
import StudentProtected from "./Student/Routes/StudentProtected";
import StudentDashBoard from "./Student/StudentDashBoard";
import StudentLeave from "./Student/STUDENTLEAVE";
import StudentLeaveforAdmin from "./Admin/StudentLeave";
import TeacherAttendance from "./Admin/TeacherAttendance";
import StudentAttendanceByAdmin from "./Admin/StudentAttendanceByAdmin";
import Attendance from "./Student/Atendance";
import StudentDetails from "./Student/StudentDetails";
import AssignMentStudent from "./Student/AssignMentStudent";
import MarkResult from "./Teacher/MarkResult";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <LoadingScreen />
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

          {/* Admin Protected Route */}
          <Route path="/school/admin/" element={<AdminProtected />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="academy/subject" element={<CourseManagement />} />
            <Route path="academy/all_classess" element={<AllClassess />} />
            <Route path="vister_admission_list" element={<VisterAdmission />} />
            <Route path="ert-list" element={<ERTlist />} />
            <Route path="admission_from" element={<StudentAdmissionList />} />
            <Route path="time-table" element={<TimeTable />} />

            <Route path="all_student" element={<AllStudent />} />
            <Route path="all_teacher" element={<AllTeacherList />} />
            <Route path="add_teacher" element={<AddTeacher />} />
            <Route path="edit_teacher/:id" element={<EditTeacher />} />
            <Route path="view_teacher/:id" element={<ViewTeacher />} />
            <Route path="all_users" element={<AllUsers />} />
            <Route path="teacher-leave-request" element={<LeavRequesr />} />
            <Route path="attendance/student" element={<StudentAttendanceByAdmin />} />
            <Route path="student-leave-request" element={<StudentLeaveforAdmin />} />
            <Route path="create_staff" element={<CreateStaff />} />
            <Route path="notice-board" element={<NoticeBoard />} />
            <Route path="admin/setting" element={<Setting />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="LogoEdit" element={<Website />} />
            </Route>
          </Route>
          {/*End Admin Protected Route */}



          {/* Teacher Protected */}
          <Route path="/school/teacher/" element={<TeacherProtected />}>
            <Route path="dashboard" element={<TeacheDashbaord />} />
            <Route path="student_attendance" element={<StudentAttendenc />} />
            <Route path="all_attendance" element={<AttendencAllList />} />
            <Route path="view_details" element={<ViewDetails />} />
            <Route path="Syllabus" element={<AllSyllabus />} />
            <Route path="students" element={<TeacherStudentLIst />} />
            <Route path="assignments" element={<Assignment />} />
            <Route path="notice-board" element={<NoticeBoard />} />
            <Route path="add-result" element={<MarkResult />} />
            <Route path="leave_application" element={<LeaveApplication />} />
            <Route path="setting" element={<Setting />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              {/* <Route path="LogoEdit" element={<Website />} /> */}
            </Route>
          </Route>



          {/* Student Protected */}
          <Route path="/school/student/" element={<StudentProtected />}>
            <Route path="dashboard" element={<StudentDashBoard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave-request" element={<StudentLeave />} />
            <Route path="details" element={<StudentDetails />} />
            <Route path="notice-board" element={<NoticeBoard />} />
            <Route path="assignments" element={<AssignMentStudent />} />
            <Route path="setting" element={<Setting />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
            </Route>
          </Route>

        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
