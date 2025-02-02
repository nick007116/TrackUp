import React, { useState, useEffect } from 'react';
import { Download, Trash2, FileSpreadsheet } from 'lucide-react';
import { getUploadedFiles, deleteFile } from '../../services/api';
import { saveAs } from 'file-saver';

const Files = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Marks');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await getUploadedFiles();
        setFiles(data);
        setFilteredFiles(data.filter(file => file.category === 'Marks'));
      } catch (error) {
        setError(error.message || 'Failed to fetch uploaded files');
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    setFilteredFiles(files.filter(file => file.category === selectedCategory));
  }, [selectedCategory, files]);

  const handleDownload = (file) => {
    const blob = new Blob([JSON.stringify(file.data, null, 2)], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${file.year}_${file.department}.csv`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFile(id);
      const updatedFiles = files.filter(file => file._id !== id);
      setFiles(updatedFiles);
      setFilteredFiles(updatedFiles.filter(file => file.category === selectedCategory));
      setSuccessMessage('File deleted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setError(error.message || 'Error deleting file');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FileSpreadsheet className="mr-3 text-blue-600" size={32} />
          Uploaded Files
        </h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
        >
          <option value="Marks">Marks</option>
          <option value="Attendance">Attendance</option>
          <option value="Achievements">Achievements</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        {successMessage && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {successMessage}
          </div>
        )}
        {filteredFiles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileSpreadsheet size={48} className="mx-auto mb-4 text-blue-300" />
            <p>No files uploaded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b">
                <tr>
                  {['Year', 'Department', 'Uploaded At', 'Actions'].map((header) => (
                    <th key={header} className="text-left p-4 text-gray-600 font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file._id} className="hover:bg-blue-50 transition border-b last:border-b-0">
                    <td className="p-4">{file.year}</td>
                    <td className="p-4">{file.department}</td>
                    <td className="p-4">{new Date(file.uploadedAt).toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownload(file)}
                          className="group flex items-center bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
                        >
                          <Download className="mr-2 group-hover:scale-110 transition" size={16} />
                          Download
                        </button>
                        <button
                          onClick={() => handleDelete(file._id)}
                          className="group flex items-center bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                        >
                          <Trash2 className="mr-2 group-hover:scale-110 transition" size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Files;