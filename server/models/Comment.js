const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
    required: [true, 'Photo is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment author is required'],
  },
  comment: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
  },
  dateTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);