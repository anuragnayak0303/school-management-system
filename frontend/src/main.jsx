import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth.jsx";
import { LoadingProvider } from "./context/LoadingProvider .jsx";
import StudentAuth from "./context/StudentAuth.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <StudentAuth>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </StudentAuth>
    </AuthProvider>

  </StrictMode>
);
