import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Award, Users } from 'lucide-react';

const StudentPerformanceDashboard = ({ studentData }) => {
  const [selectedSemester, setSelectedSemester] = useState('1st Semester');
  const [chartData, setChartData] = useState([]);
  const [semesterData, setSemesterData] = useState(null);
  const [semesterAnalysis, setSemesterAnalysis] = useState(null);

  const colorPalette = useMemo(() => ({
    excellent: '#10B981',
    good: '#3B82F6',
    warning: '#F59E0B',
    critical: '#EF4444'
  }), []);

  const generateSubjectColors = useCallback((subjectScores) => {
    return subjectScores.reduce((colors, { subject, averageScore }) => {
      colors[subject] =
        averageScore >= 80
          ? colorPalette.excellent
          : averageScore >= 70
          ? colorPalette.good
          : averageScore >= 60
          ? colorPalette.warning
          : colorPalette.critical;
      return colors;
    }, {});
  }, [colorPalette]);

  const calculateSemesterAnalysis = useCallback((data) => {
    if (!data || data.length === 0) return null;

    const columnNames = Object.keys(data[0] || {}).filter(
      (key) => !['Name', 'Roll Number'].includes(key)
    );

    const subjectScores = columnNames.map((subject) => {
      const scores = data.map((student) => Number(student[subject] || 0));
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

      return {
        subject,
        averageScore,
        scores,
        performanceCategory:
          averageScore >= 80
            ? 'Excellent'
            : averageScore >= 70
            ? 'Good'
            : averageScore >= 60
            ? 'Average'
            : 'Needs Improvement'
      };
    });

    const sortedSubjects = [...subjectScores].sort((a, b) => a.averageScore - b.averageScore);

    return {
      subjectScores,
      lowestPerformingSubjects: sortedSubjects.slice(0, 2),
      overallPerformance: {
        averageScore:
          subjectScores.reduce((sum, subj) => sum + subj.averageScore, 0) / subjectScores.length,
        totalSubjects: subjectScores.length,
        performanceCategory:
          subjectScores.reduce((sum, subj) => sum + subj.averageScore, 0) / subjectScores.length >=
          70
            ? 'Good'
            : 'Needs Improvement'
      }
    };
  }, []);

  const calculateOverallPerformance = useCallback((studentData) => {
    if (!studentData || !Array.isArray(studentData)) return null;

    const marksData = studentData.filter(sem => sem.category === 'Marks');
    const allSemestersData = marksData.map(sem => {
      const analysis = calculateSemesterAnalysis(sem.data);
      return {
        semester: sem.year,
        averageScore: analysis.overallPerformance.averageScore
      };
    });

    const overallAverage = allSemestersData.reduce((sum, sem) => sum + sem.averageScore, 0) / allSemestersData.length;

    return {
      subjectScores: allSemestersData,
      overallPerformance: {
        averageScore: overallAverage,
        totalSubjects: allSemestersData.length,
        performanceCategory: overallAverage >= 70 ? 'Good' : 'Needs Improvement'
      }
    };
  }, [calculateSemesterAnalysis]);

  useEffect(() => {
    if (!studentData || !Array.isArray(studentData)) return;

    if (selectedSemester === 'Overall') {
      const analysis = calculateOverallPerformance(studentData);
      setSemesterAnalysis(analysis);

      const performanceData = analysis.subjectScores.map((semData) => ({
        subject: semData.semester,
        score: semData.averageScore,
        color: semData.averageScore >= 80 
          ? colorPalette.excellent 
          : semData.averageScore >= 70 
          ? colorPalette.good 
          : semData.averageScore >= 60 
          ? colorPalette.warning 
          : colorPalette.critical,
        performanceCategory: semData.averageScore >= 80 
          ? 'Excellent' 
          : semData.averageScore >= 70 
          ? 'Good' 
          : semData.averageScore >= 60 
          ? 'Average' 
          : 'Needs Improvement'
      }));

      setChartData(performanceData);
      setSemesterData(true); // Just to show the content
    } else {
      const filteredData = studentData.find(
        (semester) => semester.year === selectedSemester && semester.category === 'Marks'
      );

      if (filteredData && filteredData.data.length > 0) {
        const analysis = calculateSemesterAnalysis(filteredData.data);
        setSemesterAnalysis(analysis);

        const subjectColors = generateSubjectColors(analysis.subjectScores);
        const performanceData = analysis.subjectScores.map((subjectData) => ({
          subject: subjectData.subject,
          score: subjectData.averageScore,
          color: subjectColors[subjectData.subject],
          performanceCategory: subjectData.performanceCategory
        }));

        setChartData(performanceData);
        setSemesterData(filteredData.data);
      } else {
        setSemesterAnalysis(null);
        setSemesterData(null);
      }
    }
  }, [studentData, selectedSemester, calculateOverallPerformance, calculateSemesterAnalysis, generateSubjectColors, colorPalette]);

  return (
    <div className="min-h-screen p-3">
      <div className="max-w-6xl mx-auto rounded-[1.5rem] shadow-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-center gap-2 rounded-t-[1.5rem]">
          <Award className="text-white" />
          <h2 className="text-2xl text-white tracking-tight">Exam marks</h2>
        </div>

        <div className="p-4 bg-gray-100 border-b border-gray-200 flex justify-center gap-4">
          <button
            onClick={() => setSelectedSemester('Overall')}
            className={`
              px-6 py-2 text-sm rounded-xl transition-all duration-300
              ${selectedSemester === 'Overall' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-200 border'}
            `}
          >
            Overall
          </button>
          {['1st', '2nd', '3rd', '4th', '5th', '6th'].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(`${sem} Semester`)}
              className={`
                px-6 py-2 text-sm rounded-xl transition-all duration-300
                ${selectedSemester === `${sem} Semester` ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-200 border'}
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
                <h3 className="text-xl text-gray-800 mb-4 flex items-center">
                  <Award className="mr-2 text-blue-600" />
                  Subject Performance
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {chartData.map((data) => (
                    <div
                      key={data.subject}
                      className={`
                        rounded-xl p-4 transition-all duration-300 border hover:shadow-md
                        ${data.performanceCategory === 'Excellent' ? 'bg-green-50 border-green-200' : data.performanceCategory === 'Good' ? 'bg-blue-50 border-blue-200' : data.performanceCategory === 'Average' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}
                      `}
                    >
                      <h4 className="font-semibold text-gray-700 mb-2">{data.subject}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold" style={{ color: data.color }}>
                          {data.score.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                <div className="border border-gray-200 rounded-2xl shadow-md p-6 bg-transparent">
                  <h3 className="text-xl text-gray-800 mb-10 flex items-center">
                    <Users className="mr-2 text-blue-600" />
                    Semester Overview
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600">Total Semesters</p>
                      <p className="text-2xl text-blue-600">
                        {semesterAnalysis.overallPerformance.totalSubjects}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Average Score</p>
                      <p className={`text-2xl ${semesterAnalysis.overallPerformance.performanceCategory === 'Good' ? 'text-green-600' : 'text-red-600'}`}>
                        {semesterAnalysis.overallPerformance.averageScore.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedSemester !== 'Overall' && semesterAnalysis.lowestPerformingSubjects?.length > 0 && (
                  <div className="border border-gray-200 rounded-2xl shadow-md p-8 bg-transparent">
                    <h4 className="text-xl text-red-700 font-bold mb-4">
                      Subjects Needing Attention
                    </h4>
                    {semesterAnalysis.lowestPerformingSubjects.map((subject) => (
                      <div
                        key={subject.subject}
                        className="flex justify-between items-center mb-2 pb-2 border-b border-red-100 last:border-b-0"
                      >
                        <span className="text-red-600 font-semibold">{subject.subject}</span>
                        <span className="text-red-800 font-bold">
                          {subject.averageScore.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl shadow-md p-6 bg-transparent mt-10">
              <h3 className="text-xl text-gray-800 mb-4">Performance Breakdown</h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="subject" axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar dataKey="score" barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-12 text-gray-500">no yet uploaded</div>
        )}
      </div>
    </div>
  );
};

export default StudentPerformanceDashboard;