import React, { useState, useEffect } from 'react';
import { getUploadedFiles } from '../../services/api';

const Profile = ({ teacherDetails }) => {
  const [fileCount, setFileCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFileCount = async () => {
      try {
        const data = await getUploadedFiles();
        setFileCount(data.length);
      } catch (error) {
        setError(error.message || 'Failed to fetch file count');
      }
    };

    fetchFileCount();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 lg:p-8 max-w-5xl mx-auto mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
        <div className="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
          <img src={teacherDetails.profile} alt="Profile" className="rounded-full w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
            {teacherDetails.name}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 mt-2">{teacherDetails.department}</p>
          <p className="text-base lg:text-lg text-gray-600 mt-2">ID: {teacherDetails.tid}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 lg:p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-sm text-gray-500 mb-1">Teacher ID</p>
          <p className="text-lg lg:text-xl font-bold text-green-800">{teacherDetails.tid}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 lg:p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          <p className="text-sm text-gray-500 mb-1">Files Uploaded</p>
          <p className="text-lg lg:text-xl font-bold text-green-800">{fileCount}</p>
        </div>
      </div>
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default Profile;