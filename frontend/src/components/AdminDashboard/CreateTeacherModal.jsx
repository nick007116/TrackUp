import React, { useState, useRef } from 'react';
import { Upload, Crop, CheckCircle2, XCircle } from 'lucide-react';
import Cropper from 'react-easy-crop';

const CreateTeacherModal = ({ isOpen, onClose, onSave }) => {
  const [teacherDetails, setTeacherDetails] = useState({
    id: '',
    name: '',
    password: '',
  });

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleSaveCroppedImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const { width, height } = croppedArea;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(
        img,
        croppedArea.x,
        croppedArea.y,
        width,
        height,
        0,
        0,
        width,
        height
      );
      const croppedImg = canvas.toDataURL('image/jpeg');
      setCroppedImage(croppedImg);
      setImage(null);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacherData = {
      ...teacherDetails,
      profileImage: croppedImage,
    };
    onSave(teacherData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Profile Preview */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-4 border-blue-500">
              {croppedImage ? (
                <img src={croppedImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-blue-600">
                  {teacherDetails.name ? teacherDetails.name[0] : 'T'}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {teacherDetails.name || 'New Teacher'}
              </h3>
              <p className="text-gray-500">{teacherDetails.id || 'ID: N/A'}</p>
            </div>
          </div>

          {/* Image Upload & Crop */}
          {image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <button
                onClick={handleSaveCroppedImage}
                className="absolute bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <Crop size={24} />
              </button>
            </div>
          )}

          {!image && (
            <button 
              onClick={() => fileInputRef.current.click()}
              className="w-full flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition"
            >
              <Upload size={24} className="mr-2 text-blue-600" />
              <span className="text-blue-600 font-semibold">
                Upload Profile Image
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </button>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher ID
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={teacherDetails.id}
                onChange={(e) =>
                  setTeacherDetails({ ...teacherDetails, id: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={teacherDetails.name}
                onChange={(e) =>
                  setTeacherDetails({ ...teacherDetails, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={teacherDetails.password}
                onChange={(e) =>
                  setTeacherDetails({
                    ...teacherDetails,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <XCircle size={20} className="mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <CheckCircle2 size={20} className="mr-2" />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacherModal;