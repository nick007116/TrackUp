import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FileText } from 'lucide-react';
import { getAttendanceStats } from '../../services/api';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState('1st Semester');
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Science');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendanceStats();
        setAttendanceData(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch attendance statistics');
      }
    };

    fetchAttendance();
  }, []);

  const filteredData = attendanceData
    .filter((record) => selectedYear === 'All' || record.year === selectedYear)
    .filter((record) => selectedDepartment === 'All' || record.department === selectedDepartment)
    .flatMap((record) => record.students);

  const formattedData = filteredData.map(student => ({
    ...student,
    attendancePercentage: student.attendancePercentage.toFixed(2)
  }));

  return (
    <div className="min-h-screen p-3">
      <div className="max-w-6xl mx-auto rounded-[1.5rem] shadow-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-center gap-2 rounded-t-[1.5rem]">
          <FileText className="text-white" />
          <h2 className="text-2xl text-white tracking-tight">Student Attendance Statistics</h2>
        </div>

        {error && (
          <div className="text-center p-4 text-red-500">{error}</div>
        )}

        <div className="p-6">
          <div className="flex justify-between mb-4">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Bio Technology">Bio Technology</option>
              <option value="Arts">Arts</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Business Administration">Business Administration</option>
            </select>
          </div>

          <div className="border border-gray-200 rounded-2xl shadow-md p-6 bg-transparent">
            <h3 className="text-xl text-gray-800 mb-4 flex items-center">
              <FileText className="mr-2 text-blue-600" />
              Attendance Statistics
            </h3>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="studentName" axisLine={false} tickLine={false} tick={false} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="attendancePercentage" barSize={40}>
                    {formattedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3B82F6" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;