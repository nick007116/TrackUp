import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  GraduationCap,
  FileSpreadsheet,
  Menu,
  LogOut,
  X,
  FileText,
  BarChart2,
  Calendar
} from 'lucide-react';
import Papa from 'papaparse';
import { getTeacherDetails, uploadData } from '../../services/api';
import Profile from './Profile';
import DataUpload from './DataUpload';
import Files from './Files';
import Stats from './Stats';
import Attendance from './Attendance';

const TeacherDashboard = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const years = ['1st Semester', '2nd Semester', '3rd Semester' ,'4th Semester','5th Semester','6th Semester'];
  const departments = [  'Computer Science', 
    'Commerce', 
    'Bio Technology', 
    'Arts',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Business Administration'];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);

    Papa.parse(file, {
      complete: (results) => {
        setParsedData(results.data);
      },
      header: true,
    });
  };

  const handleSubmit = async (category) => { // Accept category as a parameter
    if (uploadedFile && selectedYear && selectedDepartment && category) {
      try {
        await uploadData({
          year: selectedYear,
          department: selectedDepartment,
          category, // Include category
          data: parsedData,
        });
        setUploadedFile(null);
        setSelectedYear('');
        setSelectedDepartment('');
        setParsedData(null);
        setError(''); // Clear any previous errors
      } catch (error) {
        setError(error.message || 'Error uploading data');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacherId');
    navigate('/login');
  };

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId');
        if (!teacherId) {
          throw new Error('Teacher not found');
        }
        const details = await getTeacherDetails(teacherId);
        setTeacherDetails(details);
      } catch (error) {
        setError(error.message || 'Failed to fetch teacher details');
      }
    };

    if (activeSection === 'profile') {
      fetchTeacherDetails();
    }
  }, [activeSection]);

  const NavItems = [
    { icon: User, label: 'Profile', section: 'profile', color: 'text-green-600' },
    { icon: FileSpreadsheet, label: 'Data Upload', section: 'upload', color: 'text-purple-600' },
    { icon: FileText, label: 'Uploaded Files', section: 'files', color: 'text-blue-600' },
    { icon: BarChart2, label: 'Stats', section: 'stats', color: 'text-orange-600' },
    { icon: Calendar, label: 'Attendance', section: 'attendance', color: 'text-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 lg:p-3 rounded-lg hover:bg-green-100 transition-all duration-200"
            style={{ marginLeft: 0 }}
          >
            <Menu size={24} className="text-green-600" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 lg:px-5 lg:py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
          >
            <LogOut size={18} className="lg:w-5 lg:h-5" />
            <span className="font-medium lg:text-md">Logout</span>
          </button>
        </div>
      </nav>

      {/* Side Icons */}
      <div className="fixed top-16 lg:top-18 left-0 bottom-0 w-16 lg:w-18 bg-white/80 backdrop-blur-md shadow-lg z-30 hidden md:block">
        <div className="flex flex-col items-center justify-start h-full pt-6 space-y-6">
          {NavItems.map((item) => (
            <button
              key={item.section}
              onClick={() => setActiveSection(item.section)}
              className={`
                w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl
                group transition-all duration-200 relative
                ${activeSection === item.section
                  ? 'bg-green-600 text-white shadow-md'
                  : 'hover:bg-green-50'}
              `}
            >
              <item.icon
                size={24}
                className={`
                  transition-all duration-200
                  ${activeSection === item.section
                    ? 'text-white'
                    : `${item.color} group-hover:scale-110`}
              `}
              />
              {activeSection !== item.section && (
                <div className="absolute inset-y-0 left-0 w-1 bg-green-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 rounded-r-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 lg:w-80 bg-white/90 backdrop-blur-md shadow-2xl z-50 transform transition-all duration-300">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <GraduationCap size={32} className="text-green-600 lg:w-8 lg:h-8" />
                  <span className="text-xl lg:text-2xl font-bold text-green-800">Menu</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 lg:p-3 rounded-lg hover:bg-green-100 transition-all duration-200"
                >
                  <X size={24} className="text-green-600" />
                </button>
              </div>
            </div>
            <nav className="p-4 lg:p-6 space-y-2">
              {NavItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    setActiveSection(item.section);
                    setMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center p-4 lg:p-5 rounded-xl group
                    transition-all duration-200
                    ${activeSection === item.section
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-green-50'}
                  `}
                >
                  <item.icon
                    size={24}
                    className={
                      activeSection === item.section
                        ? 'text-white'
                        : item.color
                    }
                  />
                  <span className="ml-3 font-medium lg:text-lg">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pt-20 md:pl-20 lg:pl-24 p-6">
        {activeSection === 'profile' && teacherDetails && (
          <Profile teacherDetails={teacherDetails} />
        )}

        {activeSection === 'upload' && (
          <DataUpload
            uploadedFile={uploadedFile}
            handleFileUpload={handleFileUpload}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            handleSubmit={handleSubmit}
            years={years}
            departments={departments}
          />
        )}

        {activeSection === 'files' && (
          <Files />
        )}

        {activeSection === 'stats' && (
          <Stats />
        )}

        {activeSection === 'attendance' && (
          <Attendance />
        )}

        {error && (
          <div className="fixed bottom-[20px] right-[20px] bg-red-500 text-white p-[10px] rounded-lg shadow-lg z-[1000]">
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;