const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'This email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err); 
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };