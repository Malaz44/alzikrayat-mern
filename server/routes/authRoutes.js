const express = require('express');
const { validate, registerSchema, loginSchema } = require('../middleware/validation');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;