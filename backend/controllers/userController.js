import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};



export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

//Login Function 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ success: false, message: 'Invalid email or password' });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

//Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}