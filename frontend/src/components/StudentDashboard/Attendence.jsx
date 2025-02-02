import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Attendance = ({ studentData }) => {
  const [selectedSemester, setSelectedSemester] = useState('1st Semester');
  const [attendanceData, setAttendanceData] = useState([]);
  const [semesterData, setSemesterData] = useState(null);

  const COLORS = ['#0088FE', '#FF6B6B'];

  useEffect(() => {
    if (!studentData || !Array.isArray(studentData)) return;

    // Filter data for the selected semester and category "Attendance"
    const filteredData = studentData.find(
      (semester) => semester.year === selectedSemester && semester.category === 'Attendance'
    );

    if (filteredData && filteredData.data.length > 0) {
      setSemesterData(filteredData);

      // Create chart data for the first student in the semester
      const firstStudent = filteredData.data[0];
      const subjectsExcluded = ['Name', 'Roll Number'];
      
      const attendance = Object.keys(firstStudent)
        .filter(key => !subjectsExcluded.includes(key))
        .map(subject => {
          const attendancePercentage = Number(firstStudent[subject] || 0);
          return [
            {
              name: `${subject} (Present)`,
              value: attendancePercentage,
            },
            {
              name: `${subject} (Absent)`,
              value: 100 - attendancePercentage,
            }
          ];
        })
        .flat();

      setAttendanceData(attendance);
    } else {
      setSemesterData(null);
      setAttendanceData([]);
    }
  }, [studentData, selectedSemester]);

  return (
    <div className="min-h-screen p-3">
      <div className="max-w-6xl mx-auto rounded-[1.5rem] shadow-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-center gap-2 rounded-t-[1.5rem]">
          <h2 className="text-2xl text-white tracking-tight">Attendance</h2>
        </div>

        <div className="p-4 bg-gray-100 border-b border-gray-200 flex justify-center gap-4">
          {['1st', '2nd', '3rd', '4th', '5th', '6th'].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(`${sem} Semester`)}
              className={`
                px-6 py-2 text-sm rounded-xl transition-all duration-300
                ${
                  selectedSemester === `${sem} Semester`
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-200 border'
                }
              `}
            >
              {sem} Semester
            </button>
          ))}
        </div>

        {semesterData ? (
          <div className="p-6">
            <div className="grid md:grid-cols-[1.4fr,1fr] gap-10">
              <div className="border border-gray-200 rounded-2xl shadow-md p-6 bg-transparent">
                <h3 className="text-xl text-gray-800 mb-4">Attendance Overview</h3>
                <div className="w-full h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-10">
                <div className="border border-gray-200 rounded-2xl shadow-md p-6 bg-transparent">
                  <h3 className="text-xl text-gray-800 mb-4">Attendance Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {attendanceData.filter((_, index) => index % 2 === 0).map((data, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-6 rounded-xl bg-blue-50 border-blue-200 space-x-4 transition-all duration-300 border hover:shadow-md`}
                      >
                        <div>
                          <p className="text-sm font-semibold uppercase">{data.name.split(' ')[0]}</p>
                          <p className="text-xl font-bold">{data.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-12 text-gray-500">
            Data for {selectedSemester} is not yet uploaded.
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;