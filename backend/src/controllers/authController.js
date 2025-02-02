const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const DataUpload = require('../models/DataUpload');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const registerTeacher = async (req, res) => {
  try {
    const { tid, name, password, profile } = req.body;

    const existingTeacher = await User.findOne({ tid });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher ID already exists' });
    }

    const newTeacher = new User({
      username: tid,
      password,
      role: 'teacher',
      tid,
      name,
      profile,
    });

    await newTeacher.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering teacher' });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teachers' });
  }
};

const teacherLogin = async (req, res) => {
  try {
    const { tid, password } = req.body;
    const teacher = await User.findOne({ tid, role: 'teacher' });

    if (!teacher) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: teacher._id, role: 'teacher' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      teacher: {
        id: teacher.tid,
        name: teacher.name,
        role: teacher.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getTeacherDetails = async (req, res) => {
  try {
    const teacher = await User.findOne({ tid: req.params.id, role: 'teacher' }).select('-password');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher details' });
  }
};
const registerStudent = async (req, res) => {
  try {
    const { studentId, studentName, department, year, password } = req.body;

    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID already exists' });
    }

    const newStudent = new Student({
      studentId,
      studentName,
      department,
      year,
      password,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student' });
  }
};

const studentLogin = async (req, res) => {
  try {
    const { studentId, password } = req.body;
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: student._id, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      student: {
        id: student.studentId,
        name: student.studentName,
        role: 'student',
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id }).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student details' });
  }
};

const uploadData = async (req, res) => {
  try {
    const { year, department, category, data } = req.body;
    const teacherId = req.user.userId; // Assuming the user ID is stored in req.user

    if (!year || !department || !category || !data || !teacherId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newDataUpload = new DataUpload({
      year,
      department,
      category, // Include category
      data,
      teacherId,
    });

    await newDataUpload.save();
    res.status(201).json({ message: 'Data uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading data' });
  }
};

const getUploadedFiles = async (req, res) => {
  try {
    const teacherId = req.user.userId; // Assuming the user ID is stored in req.user
    const files = await DataUpload.find({ teacherId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching uploaded files' });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    await DataUpload.findByIdAndDelete(id);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file' });
  }
};

const getStudentData = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await DataUpload.find({ 'data.Roll Number': studentId });

    if (!studentData || studentData.length === 0) {
      return res.status(404).json({ message: 'Student data not found' });
    }

    const studentDetails = studentData.map(upload => ({
      year: upload.year,
      department: upload.department,
      category: upload.category,
      data: upload.data.filter(student => student['Roll Number'] === studentId)
    }));

    res.json(studentDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student data' });
  }
};

const getUploadedMarksStats = async (req, res) => {
  try {
    const teacherId = req.user.userId; // Get the teacher's ID from the authenticated user
    const marksData = await DataUpload.find({ category: 'Marks', teacherId });

    const studentStats = marksData.map((record) => {
      const subjects = Object.keys(record.data[0]).filter(
        (key) => !['Name', 'Roll Number'].includes(key)
      );

      const studentAverages = record.data.map((student) => {
        const totalMarks = subjects.reduce((sum, subject) => sum + Number(student[subject] || 0), 0);
        const averageMarks = totalMarks / subjects.length;

        return {
          studentName: student.Name,
          rollNumber: student['Roll Number'],
          averageMarks,
        };
      });

      return {
        year: record.year,
        department: record.department,
        students: studentAverages,
      };
    });

    res.status(200).json(studentStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching uploaded marks statistics', error });
  }
};

const getAttendanceStats = async (req, res) => {
  try {
    const teacherId = req.user.userId; // Get the teacher's ID from the authenticated user
    const attendanceData = await DataUpload.find({ category: 'Attendance', teacherId });

    const attendanceStats = attendanceData.map((record) => {
      const subjects = Object.keys(record.data[0]).filter(
        (key) => !['Name', 'Roll Number'].includes(key)
      );

      const studentAttendance = record.data.map((student) => {
        const totalAttendance = subjects.reduce((sum, subject) => sum + Number(student[subject] || 0), 0);
        const attendancePercentage = totalAttendance / subjects.length;

        return {
          studentName: student.Name,
          rollNumber: student['Roll Number'],
          attendancePercentage,
        };
      });

      return {
        year: record.year,
        department: record.department,
        students: studentAttendance,
      };
    });

    res.status(200).json(attendanceStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance statistics', error });
  }
};

module.exports = {
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
};