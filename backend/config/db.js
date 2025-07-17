/**
 * @fileoverview Database Configuration Module
 * Handles MongoDB connection setup and configuration for the resume builder application.
 * Uses Mongoose ODM for MongoDB interactions with connection error handling.
 * 
 * @requires mongoose - MongoDB object modeling library for Node.js
 */

import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB database
 * 
 * Connects to MongoDB using the connection string from environment variables.
 * Provides connection success confirmation and error handling with process exit.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Promise that resolves when connection is established
 * @throws {Error} Logs error and exits process if connection fails
 * 
 * @example
 * ```javascript
 * import connectDB from './config/db.js';
 * 
 * // Connect to database on server startup
 * await connectDB();
 * ```
 */
const connectDB = async () => {
  try {
    // Establish connection to MongoDB using environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log successful connection with host information
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log connection error details
    console.error(`Error: ${error.message}`);
    
    // Exit process with failure code (1) if connection fails
    process.exit(1);
  }
};

export default connectDB;
