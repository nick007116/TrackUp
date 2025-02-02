import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import TeacherLoginPage from "./pages/TeacherLoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"; // Corrected path
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard"; // Corrected path
import StudentRegister from "./pages/StudentRegister";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard"; // Corrected path

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/teacher-login" element={<TeacherLoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-login" element={<StudentLogin />} />

        {/* Private Routes */}
        <Route 
          path="/teacher-dashboard" 
          element={
            <PrivateRoute>
              <TeacherDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/student-dashboard" 
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;