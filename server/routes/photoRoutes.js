const express = require('express');
const upload = require('../middleware/upload');
const { validate, photoSchema } = require('../middleware/validation');
const photoController = require('../controllers/photoController');

const router = express.Router();

router.get('/', photoController.getAll);
router.get('/:id', photoController.getOne);
router.post('/', upload.single('photo'), validate(photoSchema), photoController.create);
router.delete('/:id', photoController.remove);

module.exports = router;