// frontend/src/components/StudentDashboard/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, BookOpen, Award, PieChart } from 'lucide-react';
import { getStudentDetails, getStudentData } from '../../services/api';
import Navigation from './Navigation';
import Profile from './Profile';
import StudentData from './StudentData';
import Achievements from './Achievements';
import Attendance from './Attendence';

const StudentDashboard = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        if (!studentId) throw new Error('No student ID found');
        const details = await getStudentDetails(studentId);
        setStudentDetails(details);
        const data = await getStudentData(studentId);
        setStudentData(data);
      } catch (error) {
        console.error('Failed to fetch student details:', error);
        setError(error.message || 'Failed to fetch student details');
      }
    };

    fetchStudentDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('studentId');
    navigate('/student-login');
  };

  const NavItems = [
    { icon: Home, label: 'Dashboard', section: 'profile', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Academics', section: 'academics', color: 'text-green-600' },
    { icon: Award, label: 'Achievements', section: 'achievements', color: 'text-purple-600' },
    { icon: PieChart, label: 'Attendance', section: 'attendance', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navigation
        setMenuOpen={setMenuOpen}
        handleLogout={handleLogout}
        NavItems={NavItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        menuOpen={menuOpen}
      />

      <main className="pt-16 lg:pt-20 md:pl-20 lg:pl-24 p-6">
        {error && <div className="error">{error}</div>}
        {activeSection === 'profile' && studentDetails && (
          <Profile studentDetails={studentDetails} />
        )}
        {activeSection === 'academics' && studentData.length > 0 && (
          <StudentData studentData={studentData} />
        )}
        {activeSection === 'achievements' && studentData.length > 0 && (
          <Achievements studentId={localStorage.getItem('studentId')} />
        )}
        {activeSection === 'attendance' && studentData.length > 0 && (
          <Attendance studentData={studentData} />
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;