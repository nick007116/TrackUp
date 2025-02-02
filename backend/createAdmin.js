require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

const createAdminUser = async () => {
  try {
    await connectDB();

    const adminUser = await User.findOne({ username: 'admin' });

    if (adminUser) {
      process.exit(0);
    }

    const newAdmin = new User({
      username: 'admin',
      password: 'admin123', // This will be hashed automatically by the User model
      role: 'admin',
      tid: 'admin',
      name: 'Admin',
      profile: 'admin_profile_url',
    });

    await newAdmin.save();
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.connection.close();
  }
};

createAdminUser();