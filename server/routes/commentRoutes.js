const express = require('express');
const { validate, commentSchema } = require('../middleware/validation');
const commentController = require('../controllers/commentController');

const router = express.Router();

// mounted on /api in server.js
router.get('/photos/:photoId/comments', commentController.getByPhoto);
router.post('/photos/:photoId/comments', validate(commentSchema), commentController.create);
router.delete('/comments/:id', commentController.remove);

module.exports = router;