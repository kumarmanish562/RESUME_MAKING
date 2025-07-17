/**
 * @fileoverview Express Server Configuration
 * Main server file for the Resume Builder API application.
 * Configures Express server with middleware, database connection, routes,
 * static file serving, and CORS for frontend integration.
 * 
 * @requires express - Express.js web framework
 * @requires cors - Cross-Origin Resource Sharing middleware
 * @requires dotenv - Environment variable configuration
 * @requires connectDB - MongoDB connection utility
 * @requires userRoutes - User authentication API routes
 * @requires resumeRoutes - Resume management API routes
 * @requires path - Node.js path utilities
 * @requires url - URL utilities for ES modules
 */

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

/**
 * ES Module __dirname equivalent
 * 
 * Creates __dirname equivalent for ES modules since it's not available by default.
 * Required for serving static files and path resolution in ES module environment.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Express Application Instance
 * 
 * Main Express application configured with middleware, routes, and database connection.
 */
const app = express();

/**
 * Server Port Configuration
 * 
 * Uses environment variable PORT if available, defaults to 5000 for development.
 * Allows for flexible deployment across different environments.
 */
const PORT = process.env.PORT || 5000;

/**
 * CORS Middleware
 * 
 * Enables Cross-Origin Resource Sharing for frontend-backend communication.
 * Allows requests from frontend applications running on different origins.
 * Configured to allow both local development and production frontend URLs.
 */
// Temporary permissive CORS for debugging
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

/**
 * Database Connection
 * 
 * Establishes connection to MongoDB using configuration from environment variables.
 * Connects to database before starting the server to ensure data availability.
 */
// Connect to MongoDB
connectDB();

/**
 * JSON Parsing Middleware
 * 
 * Enables Express to parse JSON request bodies for API endpoints.
 * Required for handling POST/PUT requests with JSON payloads.
 */
// Middleware to parse JSON bodies
app.use(express.json());

/**
 * API Route Mounting
 * 
 * Mounts authentication and resume management routes with appropriate prefixes.
 * Organizes API endpoints under logical namespaces for better structure.
 */
// Mount user authentication routes under /api/auth
app.use('/api/auth', userRoutes);

// Mount resume management routes under /api/resume
app.use('/api/resume', resumeRoutes);

/**
 * Static File Serving for Uploads
 * 
 * Serves uploaded files (images, thumbnails) with CORS headers for frontend access.
 * Enables direct file access via HTTP URLs for resume images and profile pictures.
 * 
 * @example
 * // Accessible URLs:
 * // http://localhost:5000/uploads/thumbnail-123456789.png
 * // http://localhost:5000/uploads/profile-987654321.jpg
 */
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    // Set CORS headers for file access from multiple frontend origins
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  }
}));

/**
 * Health Check Route
 * 
 * Basic endpoint to verify server is running and responding.
 * Useful for health checks, monitoring, and development verification.
 * 
 * @route GET /
 * @desc Server health check and welcome message
 * @access Public
 * 
 * @example
 * GET http://localhost:5000/
 * Response: "Welcome to the backend server!"
 */
// Root health check route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Test route for debugging uploads
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

/**
 * Server Startup
 * 
 * Starts the Express server on the configured port and logs startup message.
 * Provides confirmation that server is ready to accept requests.
 * 
 * @example
 * // Console output:
 * // "Server is running at http://localhost:5000"
 */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

