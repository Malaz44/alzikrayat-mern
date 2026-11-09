const path = require('path');
const multer = require('multer');

// save files in server/uploads with a unique name
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// accept images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    const err = new Error('Only image files are allowed');
    err.status = 400;
    cb(err);
  }
};

// max size 5MB
module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });