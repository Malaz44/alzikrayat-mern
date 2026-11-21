const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validate, photoSchema } = require('../middleware/validation');
const photoController = require('../controllers/photoController');

const router = express.Router();

// reading is public
router.get('/', photoController.getAll);
router.get('/:id', photoController.getOne);

// writing needs a valid token (auth runs first so nothing is uploaded without it)
router.post('/', auth, upload.single('photo'), validate(photoSchema), photoController.create);
router.delete('/:id', auth, photoController.remove);

module.exports = router;