const express = require('express');
const router = express.Router();
const { validateTeacherLogin, validateTeacherRegistration } = require('../middleware/validation');
const authenticate = require('../middleware/auth');
const {
  login,
  registerTeacher,
  getAllTeachers,
  teacherLogin,
  getTeacherDetails,
  registerStudent,
  studentLogin,
  getStudentDetails,
  uploadData,
  getUploadedFiles,
  deleteFile,
  getStudentData,
  getUploadedMarksStats,
  getAttendanceStats,
} = require('../controllers/authController');

// Login route for both admin and teacher
router.post('/login', login);

// Teacher registration route
router.post('/register/teacher', validateTeacherRegistration, registerTeacher);

// Get all teachers route
router.get('/teachers', getAllTeachers);

// Teacher login route
router.post('/teacher/login', validateTeacherLogin, teacherLogin);

// Get teacher details route
router.get('/teacher/:id', getTeacherDetails);

// Student registration route
router.post('/register/student', registerStudent);

// Student login route
router.post('/student/login', studentLogin);

// Get student details route
router.get('/student/:id', getStudentDetails);

// Data upload route (protected)
router.post('/upload-data', authenticate, uploadData);

// Get uploaded files route (protected)
router.get('/uploaded-files', authenticate, getUploadedFiles);

// Delete file route (protected)
router.delete('/uploaded-files/:id', authenticate, deleteFile);

// Get student data route (protected)
router.get('/student-data/:id', authenticate, getStudentData);

// Get uploaded marks statistics route (protected)
router.get('/uploaded-marks-stats', authenticate, getUploadedMarksStats);

// Add the new route for fetching attendance statistics (protected)
router.get('/attendance-stats', authenticate, getAttendanceStats);

module.exports = router;