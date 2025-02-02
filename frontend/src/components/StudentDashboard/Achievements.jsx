import React, { useState, useEffect } from 'react';
import { Trophy, Briefcase, Code, Users, Award } from 'lucide-react';
import { getStudentData } from '../../services/api';

const Achievements = ({ studentId }) => {
  const [achievementsData, setAchievementsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievementsData = async () => {
      try {
        const data = await getStudentData(studentId);
        const achievements = data.filter(item => item.category === 'Achievements');
        setAchievementsData(achievements);
      } catch (error) {
        setError(error.message || 'Failed to fetch achievements');
      }
    };

    fetchAchievementsData();
  }, [studentId]);

  const renderAchievementCard = (achievement) => {
    const cardData = [
      { icon: Briefcase, label: 'Internships', value: achievement.data[0].Internships, color: 'bg-blue-50 border-blue-200' },
      { icon: Code, label: 'Projects', value: achievement.data[0].Projects, color: 'bg-green-50 border-green-200' },
      { icon: Users, label: 'Clubs', value: achievement.data[0].Clubs, color: 'bg-purple-50 border-purple-200' },
      { icon: Award, label: 'Sports', value: achievement.data[0].Sports, color: 'bg-red-50 border-red-200' }
    ];

    return (
      <div key={achievement.id} className="border border-gray-200 rounded-2xl shadow-md p-6 bg-transparent mt-4">

        <div className="grid grid-cols-2 gap-4">
          {cardData.map(({ icon: Icon, label, value, color }, index) => (
            <div key={index} className={`flex items-center p-6 rounded-xl ${color} space-x-4 transition-all duration-300 border hover:shadow-md`}>
              <div className="p-3 rounded-full shadow-md bg-gradient-to-br from-white to-gray-200">
                <Icon className="w-8 h-8" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (achievementsData.length === 0) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-3">
      <div className="max-w-6xl mx-auto rounded-[1.5rem] shadow-2xl overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-center gap-2 rounded-t-[1.5rem]">
          <Trophy className="text-white" />
          <h2 className="text-2xl text-white tracking-tight">Achievements</h2>
        </div>
        <div className="p-6">
          {achievementsData.map(renderAchievementCard)}
        </div>
      </div>
    </div>
  );
};

export default Achievements;