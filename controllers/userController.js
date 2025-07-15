import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie('jwt', token, {
    httpOnly: true,
   
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'strict'
  });
};

// Register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password });
    generateToken(res, user._id);

    res.status(201).json({ message: "User registered", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

// Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    generateToken(res, user._id);

    res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

// Get Profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.status(200).json(user);
};
