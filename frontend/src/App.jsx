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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/dash" element={<Dashboard />} />

          <Route path="/school/" element={<AdminProtected />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="academy/course" element={<CourseManagement />} />
            <Route path="admin/setting" element={<Setting />}>
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="security" element={<SecuritySettings />} />
              <Route path="LogoEdit" element={<Website />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
