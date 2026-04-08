const User = require('../models/User');
const { Op } = require('sequelize');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  try {
    const { name, email, password, studentId, major, year } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { studentId }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or student ID already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      studentId,
      major,
      year
    });

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        major: user.major,
        year: user.year
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        major: user.major,
        year: user.year
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  getMe
};