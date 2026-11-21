const fs = require('fs');
const path = require('path');
const Photo = require('../models/Photo');
const User = require('../models/User');
const Comment = require('../models/Comment');

// delete an image file from the uploads folder
const removeFile = (fileName) => {
  fs.unlink(path.join(__dirname, '..', 'uploads', fileName), () => {});
};

// GET /api/photos - all photos, newest first
const getAll = async (req, res, next) => {
  try {
    const photos = await Photo.find()
      .populate('userId', 'firstName lastName')
      .sort({ dateTime: -1 });
    res.json(photos);
  } catch (err) {
    next(err);
  }
};

// GET /api/photos/:id - one photo
const getOne = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id).populate('userId', 'firstName lastName');
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    res.json(photo);
  } catch (err) {
    next(err);
  }
};

// POST /api/photos - upload a photo (req.userId comes from the token)
const create = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Photo file is required' });
    }

    // the token is valid, but make sure the user still exists
    const user = await User.findById(req.userId);
    if (!user) {
      removeFile(req.file.filename);
      return res.status(401).json({ message: 'Please login first' });
    }

    const photo = await Photo.create({
      userId: user._id,
      fileName: req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });

    await photo.populate('userId', 'firstName lastName');
    res.status(201).json(photo);
  } catch (err) {
    if (req.file) removeFile(req.file.filename);
    next(err);
  }
};

// DELETE /api/photos/:id - only the owner can delete
const remove = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // ownership check: the id comes from the token, so it cannot be faked
    if (photo.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only delete your own photos' });
    }

    await photo.deleteOne();
    await Comment.deleteMany({ photoId: photo._id });
    removeFile(photo.fileName);

    res.json({ message: 'Photo deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, remove };