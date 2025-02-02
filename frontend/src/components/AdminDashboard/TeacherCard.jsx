import React from 'react';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={teacher.profile} 
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{teacher.name}</h3>
            <p className="text-sm text-gray-500">ID: {teacher.tid}</p>
            <p className="text-sm text-gray-500">Role: {teacher.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;