import React, { useState, useRef } from 'react';
import { Upload, Check } from 'lucide-react';

const DataUpload = ({ 
  uploadedFile, 
  handleFileUpload, 
  selectedYear, 
  setSelectedYear, 
  selectedDepartment, 
  setSelectedDepartment, 
  handleSubmit, 
  years, 
  departments 
}) => {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const fileInputRef = useRef(null);

  const handleSubmitWithToast = async () => {
    await handleSubmit(selectedCategory); // Pass selectedCategory to handleSubmit
    setShowSuccessToast(true);
    
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);

    // Reset form fields
    setSelectedYear('');
    setSelectedDepartment('');
    setSelectedCategory('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="p-6 relative">
      <h2 className="text-xl font-bold mb-4">Data Upload</h2>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Upload CSV File</h2>
        {showSuccessToast && (
          <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white px-4 py-2 rounded-t-lg shadow-lg z-50 flex items-center justify-center mx-auto w-max">
            <Check className="mr-2" size={24} />
            <span className="font-medium">Data uploaded successfully!</span>
          </div>
        )}
        <label className="flex flex-col items-center w-full p-6 border-dashed border border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50 transition">
          <Upload className="text-purple-600 mb-4" size={48} />
          <span>{uploadedFile ? uploadedFile.name : 'Upload CSV File'}</span>
          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" ref={fileInputRef} />
        </label>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500"
          >
            <option value="">Select Category</option>
            <option value="Marks">Marks</option>
            <option value="Attendance">Attendance</option>
            <option value="Achievements">Achievements</option>

          </select>
        </div>

        <button 
          onClick={handleSubmitWithToast} 
          disabled={!uploadedFile || !selectedYear || !selectedDepartment || !selectedCategory} 
          className="w-full mt-4 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit Data
        </button>
      </div>
    </section>
  );
};

export default DataUpload;