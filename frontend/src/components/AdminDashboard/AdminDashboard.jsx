import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogOut, Search, RefreshCw } from 'lucide-react';
import CreateTeacherModal from './CreateTeacherModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/teachers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }

      const data = await response.json();
      setTeachers(data);
      setFilteredTeachers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [searchTerm, teachers]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveTeacher = (teacherData) => {
    setTeachers([...teachers, teacherData]);
    setFilteredTeachers([...teachers, teacherData]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Teacher Management</h1>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={fetchTeachers}
              className="text-gray-600 transition-colors p-2 rounded-full"
            >
              <RefreshCw size={20} />
            </button>
            
            <button 
              onClick={toggleModal}
              className="flex items-center justify-center 
                         bg-blue-600 text-white 
                         px-4 py-2 rounded-full 
                         transition-all 
                         shadow-md 
                         group"
            >
              <UserPlus size={20} className="mr-2" />
              Add Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 my-6">
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-full"
          />
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map(teacher => (
                <div 
                  key={teacher._id} 
                  className="bg-gray-100 rounded-xl p-5 flex items-center space-x-4 shadow-md transition"
                >
                  <img 
                    src={teacher.profile} 
                    alt={teacher.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{teacher.name}</h3>
                    <p className="text-gray-500">{teacher.tid}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center 
                     bg-red-500 text-white 
                     w-14 h-14 rounded-full 
                     hover:bg-red-600 
                     shadow-xl hover:shadow-2xl 
                     transition-all 
                     group"
        >
          <LogOut size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Create Teacher Modal */}
      <CreateTeacherModal 
        isOpen={isModalOpen} 
        onClose={toggleModal} 
        onSave={handleSaveTeacher} 
      />
    </div>
  );
};

export default Dashboard;