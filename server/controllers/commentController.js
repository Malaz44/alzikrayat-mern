const Photo = require('../models/Photo');
const User = require('../models/User');
const Comment = require('../models/Comment');

// GET /api/photos/:photoId/comments - comments of one photo, oldest first
const getByPhoto = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    const comments = await Comment.find({ photoId: photo._id })
      .populate('userId', 'firstName lastName')
      .sort({ dateTime: 1 });

    res.json(comments);
  } catch (err) {
    next(err);
  }
};

// POST /api/photos/:photoId/comments - add a comment (logged-in users only)
const create = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // only existing users can comment
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(401).json({ message: 'Please login first' });
    }

    const comment = await Comment.create({
      photoId: photo._id,
      userId: user._id,
      comment: req.body.comment,
    });

    await comment.populate('userId', 'firstName lastName');
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/comments/:id - only the comment author can delete it
const remove = async (req, res, next) => {
  try {
    const userId = req.body?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Please login first' });
    }

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // ownership check
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getByPhoto, create, remove };