/**
 * @fileoverview User Controller Module
 * Handles user authentication, registration, and profile management operations.
 * Provides JWT token-based authentication with password hashing and validation.
 * 
 * @requires User - User model for database operations
 * @requires bcrypt - Password hashing and comparison utilities
 * @requires jsonwebtoken - JWT token generation and verification
 */

import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Generates JWT authentication token for user
 * 
 * Creates a signed JWT token with user ID payload and 7-day expiration.
 * Uses JWT_SECRET from environment variables for token signing.
 * 
 * @function generateToken
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {string} Signed JWT token with 7-day expiration
 * 
 * @example
 * const token = generateToken("64a7b8c9d1e2f3a4b5c6d7e8");
 * // Returns: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};



/**
 * Registers a new user account
 * 
 * Creates a new user with email validation, password hashing, and automatic login.
 * Validates email uniqueness, password strength, and returns JWT token for immediate authentication.
 * 
 * @async
 * @function registerUser
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing user registration data
 * @param {string} req.body.name - User's full name
 * @param {string} req.body.email - User's email address (must be unique)
 * @param {string} req.body.password - User's password (minimum 8 characters)
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with user data and JWT token or error
 * 
 * @example
 * POST /api/auth/register
 * Body: {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "securepassword123"
 * }
 * Response: {
 *   "success": true,
 *   "message": "User registered successfully",
 *   "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "token": "..." }
 * }
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists with the provided email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Validate password strength (minimum 8 characters)
    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }
    
    // Hash password using bcrypt with salt rounds of 10
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user in database with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token for immediate authentication
    const token = generateToken(user._id);

    // Return success response with user data and token
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
    // Handle registration errors
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

/**
 * Authenticates user login credentials
 * 
 * Validates user email and password, compares hashed password,
 * and returns JWT token for successful authentication.
 * 
 * @async
 * @function loginUser
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing login credentials
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's plain text password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with user data and JWT token or error
 * 
 * @example
 * POST /api/auth/login
 * Body: {
 *   "email": "john@example.com",
 *   "password": "securepassword123"
 * }
 * Response: {
 *   "success": true,
 *   "message": "User logged in successfully",
 *   "user": { "id": "...", "name": "John Doe", "email": "john@example.com", "token": "..." }
 * }
 */
//Login Function 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists with provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token for authenticated session
    const token = generateToken(user._id);

    // Return success response with user data and token
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
    // Handle login errors
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

/**
 * Retrieves authenticated user's profile information
 * 
 * Fetches user profile data excluding password field.
 * Requires valid JWT token and authentication middleware.
 * 
 * @async
 * @function getUserProfile
 * @param {Object} req - Express request object
 * @param {Object} req.user - User object from authentication middleware
 * @param {string} req.user.id - User's MongoDB ObjectId from JWT payload
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with user profile data or error
 * 
 * @example
 * GET /api/auth/profile
 * Headers: { "Authorization": "Bearer <jwt_token>" }
 * Response: {
 *   "success": true,
 *   "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
 * }
 */
//Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    // Find user by ID from JWT payload, excluding password field
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Return user profile data
    return res.status(200).json({ success: true, user });
  } catch (error) {
    // Handle profile retrieval errors
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}