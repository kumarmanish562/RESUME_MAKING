/**
 * @fileoverview User Database Model
 * Defines the MongoDB schema for user accounts using Mongoose ODM.
 * Handles user authentication data including credentials and profile information
 * with automatic timestamp tracking and email uniqueness constraints.
 * 
 * @requires mongoose - MongoDB object modeling library
 */

import mongoose from 'mongoose';

/**
 * User MongoDB Schema Definition
 * 
 * Schema for storing user account information including authentication credentials
 * and basic profile data. Enforces email uniqueness and required field validation
 * with automatic timestamp management for account tracking.
 * 
 * @typedef {Object} UserSchema
 * @property {string} name - User's full name for display and identification
 * @property {string} email - Unique email address for authentication and contact
 * @property {string} password - Hashed password for secure authentication
 * @property {Date} createdAt - Account creation timestamp (auto-generated)
 * @property {Date} updatedAt - Last account modification timestamp (auto-generated)
 */
const userSchema = new mongoose.Schema({
  /**
   * User's full name
   * Required field for user identification and display purposes
   */
  name: {
    type: String,
    required: true,
  },
  
  /**
   * User's email address
   * Required and unique field for authentication and account identification
   * Serves as the primary login credential
   */
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures no duplicate email addresses in the database
  },
  
  /**
   * User's password (hashed)
   * Required field storing bcrypt-hashed password for secure authentication
   * Should never be stored in plain text
   */
  password: {
    type: String,
    required: true,
  },
},
  {
    /**
     * Schema options with automatic timestamp management
     * Enables automatic creation and update timestamp tracking
     */
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * User Mongoose Model
 * 
 * Exported model for performing database operations on user documents.
 * Provides methods for user account CRUD operations, authentication queries,
 * and user management functionality.
 * 
 * @example
 * // Create new user
 * const user = new User({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   password: "hashedPasswordString"
 * });
 * 
 * // Save to database
 * await user.save();
 * 
 * // Find user by email
 * const existingUser = await User.findOne({ email: "john@example.com" });
 * 
 * // Find user by ID and exclude password
 * const userProfile = await User.findById(userId).select('-password');
 */
export default mongoose.model('User', userSchema);