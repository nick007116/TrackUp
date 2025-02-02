const mongoose = require('mongoose');

const dataUploadSchema = new mongoose.Schema({
  year: { type: String, required: true },
  department: { type: String, required: true },
  category: { type: String, required: true }, // Add category field
  data: { type: Array, required: true },
  uploadedAt: { type: Date, default: Date.now },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('DataUpload', dataUploadSchema);