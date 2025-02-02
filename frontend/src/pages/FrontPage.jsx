import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  UserRound, 
  ShieldCheck, 
  ArrowRight, 
  Network 
} from 'lucide-react';

const FrontPage = () => {
  const navigate = useNavigate();

  const LoginCard = ({ 
    icon: Icon, 
    title, 
    description, 
    route, 
    bgGradient, 
    hoverGradient 
  }) => (
    <div 
      onClick={() => navigate(route)}
      className={`
        group cursor-pointer p-6 rounded-3xl 
        ${bgGradient}
        hover:${hoverGradient}
        transition-all duration-500 ease-in-out
        transform hover:-translate-y-2 hover:scale-105
        shadow-xl hover:shadow-2xl
        flex flex-col items-center justify-center
        relative overflow-hidden
        w-64 h-64
      `}
    >
      <div className="z-10 flex flex-col items-center space-y-3">
        <Icon 
          className="w-16 h-16 text-white drop-shadow-lg" 
          strokeWidth={1.5} 
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-white/80 text-sm mt-1">{description}</p>
        </div>
      </div>
      <ArrowRight 
        className="
          w-12 h-12 text-white opacity-0 
          group-hover:opacity-100 
          transition-opacity duration-300
        " 
      />
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Network 
            className="mx-auto w-24 h-24 text-blue-600 mb-4" 
            strokeWidth={1.5} 
          />
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
          TrackUp
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Secure, Intelligent, Connected Learning Environment
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <LoginCard 
            icon={GraduationCap}
            title="Student Access" 
            description="Your academic journey starts here"
            route="/student-login" // Updated route
            bgGradient="bg-gradient-to-r from-blue-500 to-blue-700"
            hoverGradient="bg-gradient-to-r from-blue-600 to-blue-800"
          />
          
          <LoginCard 
            icon={UserRound}
            title="Teacher Portal" 
            description="Empowering educators, inspiring minds"
            route="/teacher-login"
            bgGradient="bg-gradient-to-r from-green-500 to-green-700"
            hoverGradient="bg-gradient-to-r from-green-600 to-green-800"
          />
          
          <LoginCard 
            icon={ShieldCheck}
            title="Admin Dashboard" 
            description="Secure management and oversight"
            route="/admin-login"
            bgGradient="bg-gradient-to-r from-purple-500 to-purple-700"
            hoverGradient="bg-gradient-to-r from-purple-600 to-purple-800"
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;