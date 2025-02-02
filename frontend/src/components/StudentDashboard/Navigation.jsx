import React from 'react';
import { Menu, LogOut, X, GraduationCap } from 'lucide-react';

const NavBar = ({ setMenuOpen, handleLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 lg:p-3 rounded-lg hover:bg-blue-100 transition-all duration-200"
          style={{ marginLeft: 0 }}
        >
          <Menu size={24} className="text-blue-600" />
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
  );
};

const SideIcons = ({ NavItems, activeSection, setActiveSection }) => {
  return (
    <div className="fixed top-16 lg:top-18 left-0 bottom-0 w-16 lg:w-18 bg-white/80 backdrop-blur-md shadow-lg z-30 hidden md:block">
      <div className="flex flex-col items-center justify-start h-full pt-6 space-y-3">
        {NavItems.map((item) => (
          <button
            key={item.section}
            onClick={() => setActiveSection(item.section)}
            className={`
              w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-xl
              group transition-all duration-200 relative
              ${activeSection === item.section
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-blue-50'}
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
              <div className="absolute inset-y-0 left-0 w-1 bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 rounded-r-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const OverlayMenu = ({ menuOpen, setMenuOpen, NavItems, activeSection, setActiveSection }) => {
  return (
    <>
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
                  <GraduationCap size={32} className="text-blue-600 lg:w-8 lg:h-8" />
                  <span className="text-xl lg:text-2xl font-bold text-blue-800">Menu</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 lg:p-3 rounded-lg hover:bg-blue-100 transition-all duration-200"
                >
                  <X size={24} className="text-blue-600" />
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
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-blue-50'}
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
    </>
  );
};

const Navigation = ({ setMenuOpen, handleLogout, NavItems, activeSection, setActiveSection, menuOpen }) => {
  return (
    <>
      <NavBar setMenuOpen={setMenuOpen} handleLogout={handleLogout} />
      <SideIcons NavItems={NavItems} activeSection={activeSection} setActiveSection={setActiveSection} />
      <OverlayMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} NavItems={NavItems} activeSection={activeSection} setActiveSection={setActiveSection} />
    </>
  );
};

export default Navigation;