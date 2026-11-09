const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body || {}, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
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

module.exports = { validate, registerSchema, loginSchema };