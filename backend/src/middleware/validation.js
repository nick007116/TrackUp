const validateTeacherRegistration = (req, res, next) => {
  const { tid, name, password, profile } = req.body;

  if (!tid || !name || !password || !profile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};

const validateTeacherLogin = (req, res, next) => {
  const { tid, password } = req.body;

  if (!tid || !password) {
    return res.status(400).json({ message: 'Teacher ID and password are required' });
  }

  next();
};

module.exports = {
  validateTeacherRegistration,
  validateTeacherLogin,
};