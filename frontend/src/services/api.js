const API_URL = 'http://localhost:5000/api/auth';

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: credentials.id,
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid credentials');
  }

  return response.json();
};

export const teacherLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/teacher/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tid: credentials.id,
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid credentials');
  }

  return response.json();
};

export const getTeacherDetails = async (id) => {
  if (!id) {
    throw new Error('Teacher not found');
  }

  const response = await fetch(`${API_URL}/teacher/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch teacher details');
  }

  return response.json();
};

export const registerStudent = async (studentData) => {
  const response = await fetch(`${API_URL}/register/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error registering student');
  }

  return response.json();
};

export const studentLogin = async (credentials) => {
  const response = await fetch(`${API_URL}/student/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      studentId: credentials.studentId,
      password: credentials.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Invalid credentials');
  }

  return response.json();
};
export const getStudentDetails = async (id) => {
  if (!id) {
    throw new Error('Student not found');
  }

  const response = await fetch(`${API_URL}/student/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch student details');
  }

  return response.json();
};

export const uploadData = async (data) => {
  const response = await fetch(`${API_URL}/upload-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error uploading data');
  }

  return response.json();
};
export const getUploadedFiles = async () => {
  const response = await fetch(`${API_URL}/uploaded-files`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error fetching uploaded files');
  }

  return response.json();
};

export const deleteFile = async (id) => {
  const response = await fetch(`${API_URL}/uploaded-files/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error deleting file');
  }

  return response.json();
};

export const getStudentData = async (studentId) => {
  const response = await fetch(`${API_URL}/student-data/${studentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error fetching student data');
  }

  return response.json();
};
// Add the missing getUploadedMarksStats function
export const getUploadedMarksStats = async () => {
  const response = await fetch(`${API_URL}/uploaded-marks-stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error fetching uploaded marks statistics');
  }

  return response.json();
};

export const getAttendanceStats = async () => {
  const response = await fetch(`${API_URL}/attendance-stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error fetching attendance statistics');
  }

  return response.json();
};