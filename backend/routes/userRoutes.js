/**
 * @fileoverview User Authentication API Routes
 * Defines Express router for user authentication and profile management endpoints.
 * Provides user registration, login, and protected profile access functionality.
 * Implements JWT-based authentication for secure user management.
 * 
 * @requires express - Express.js web framework
 * @requires userController - User authentication and profile controllers
 * @requires authMiddleware - JWT authentication protection middleware
 */

import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

/**
 * Express Router for User Authentication Endpoints
 * 
 * Configured router handling user account operations including registration,
 * authentication, and profile management with appropriate security measures.
 */
const userRoutes = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user account
 * @access Public (no authentication required)
 * @controller registerUser
 * 
 * Creates new user account with email validation, password hashing,
 * and automatic JWT token generation for immediate authentication.
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
 *   "user": {
 *     "id": "64a7b8c9d1e2f3a4b5c6d7e8",
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 * }
 */
userRoutes.post('/register', registerUser);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user login credentials
 * @access Public (no authentication required)
 * @controller loginUser
 * 
 * Validates user email and password, compares hashed passwords,
 * and returns JWT token for successful authentication sessions.
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
 *   "user": {
 *     "id": "64a7b8c9d1e2f3a4b5c6d7e8",
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   }
 * }
 */
userRoutes.post('/login', loginUser);

/**
 * @route GET /api/auth/profile
 * @desc Get authenticated user's profile information
 * @access Private (requires valid JWT token)
 * @middleware protect - JWT authentication middleware
 * @controller getUserProfile
 * 
 * Retrieves user profile data excluding sensitive information like passwords.
 * Requires valid JWT token in Authorization header for access.
 * 
 * @example
 * GET /api/auth/profile
 * Headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
 * Response: {
 *   "success": true,
 *   "user": {
 *     "id": "64a7b8c9d1e2f3a4b5c6d7e8",
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "createdAt": "2023-07-07T10:30:00.000Z",
 *     "updatedAt": "2023-07-07T10:30:00.000Z"
 *   }
 * }
 */
// Protect route as JWT token will be required for profile access
userRoutes.get('/profile', protect, getUserProfile);

/**
 * User Routes Export
 * 
 * Configured Express router with authentication endpoints ready for mounting.
 * Handles complete user lifecycle from registration to profile management.
 * 
 * @example
 * // In main app.js
 * import userRoutes from './routes/userRoutes.js';
 * app.use('/api/auth', userRoutes);
 * 
 * // Available endpoints:
 * // POST /api/auth/register - User registration
 * // POST /api/auth/login - User authentication
 * // GET /api/auth/profile - Protected profile access
 */
export default userRoutes;