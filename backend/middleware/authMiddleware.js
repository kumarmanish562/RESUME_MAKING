/**
 * @fileoverview Authentication Middleware
 * Provides JWT token-based authentication middleware for protecting routes.
 * Validates Bearer tokens, verifies JWT signatures, and attaches user data to requests.
 * 
 * @requires User - User model for database operations
 * @requires jsonwebtoken - JWT token verification utilities
 */

import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

/**
 * Authentication middleware to protect routes
 * 
 * Validates JWT tokens from Authorization header, verifies token signature,
 * and attaches authenticated user data to the request object. Blocks access
 * for invalid or missing tokens.
 * 
 * @async
 * @function protect
 * @param {Object} req - Express request object
 * @param {Object} req.headers - Request headers
 * @param {string} req.headers.authorization - Authorization header with Bearer token
 * @param {Object} req.user - User object attached after successful authentication
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Calls next() for valid tokens or returns 401 error
 * 
 * @example
 * // Usage in route protection
 * router.get('/protected-route', protect, (req, res) => {
 *   // req.user is available here after successful authentication
 *   res.json({ user: req.user });
 * });
 * 
 * // Request headers should include:
 * // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
export const protect = async (req, res, next) => {
  try {
    // Extract authorization header from request
    let token = req.headers.authorization;
    
    // Check if token exists and follows Bearer format
    if (token && token.startsWith('Bearer')) {
      // Extract token from "Bearer <token>" format
      token = token.split(' ')[1];
      
      // Verify JWT token signature and decode payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user from database using decoded user ID, excluding password
      req.user = await User.findById(decoded.id).select('-password');
      
      // Continue to next middleware/route handler
      next();
    } else {
      // Return unauthorized error if no token or invalid format
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    // Handle JWT verification errors (expired, invalid signature, etc.)
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

    