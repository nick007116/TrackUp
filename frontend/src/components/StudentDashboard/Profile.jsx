import React from 'react';
import { User, GraduationCap, QrCode } from 'lucide-react';

const Profile = ({ studentDetails }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-start justify-center p-8 pt-4">
      <div className="w-full max-w-xl mt-4">
        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative flex justify-center items-center">
            {/* Profile Picture */}
            <div className="w-32 h-32 bg-white p-1.5 rounded-full shadow-lg absolute -bottom-16">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={56} />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-8 text-center relative mt-20">
            {/* Student Details */}
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
              {studentDetails.studentName}
            </h2>
            <div className="mt-4 space-y-3">
              <p className="text-lg text-gray-600 flex items-center justify-center gap-3">
                <GraduationCap className="text-blue-500" size={24} />
                <span>{studentDetails.department}</span>
              </p>
              <p className="text-lg text-gray-600 flex items-center justify-center gap-3">
                <QrCode className="text-indigo-500" size={24} />
                <span>ID: {studentDetails.studentId}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;