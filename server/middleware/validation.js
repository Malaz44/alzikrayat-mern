const fs = require('fs');
const Joi = require('joi');

// checks req.body against a Joi schema before the controller runs
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body || {}, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    // if a photo was already saved, delete it
    if (req.file) fs.unlink(req.file.path, () => {});

    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  req.body = value;
  next();
};

const registerSchema = Joi.object({
  firstName: Joi.string().trim().pattern(/^[A-Za-z]+$/).required()
    .messages({ 'string.pattern.base': 'First name must contain letters only' }),
  lastName: Joi.string().trim().pattern(/^[A-Za-z]+$/).required()
    .messages({ 'string.pattern.base': 'Last name must contain letters only' }),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required(),
  location: Joi.string().allow('').optional(),
  description: Joi.string().allow('').optional(),
  occupation: Joi.string().allow('').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});

const photoSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  title: Joi.string().trim().max(100).required(),
  description: Joi.string().allow('').optional(),
});

module.exports = { validate, registerSchema, loginSchema, photoSchema };