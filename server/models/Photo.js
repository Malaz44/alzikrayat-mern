const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Photo owner is required'],
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title must be 100 characters or less'],
  },
  description: { type: String, trim: true },
  dateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Photo', photoSchema);