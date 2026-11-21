const express = require('express');
const auth = require('../middleware/auth');
const { validate, commentSchema } = require('../middleware/validation');
const commentController = require('../controllers/commentController');

const router = express.Router();

// mounted on /api in server.js
router.get('/photos/:photoId/comments', commentController.getByPhoto);
router.post('/photos/:photoId/comments', auth, validate(commentSchema), commentController.create);
router.delete('/comments/:id', auth, commentController.remove);

module.exports = router;