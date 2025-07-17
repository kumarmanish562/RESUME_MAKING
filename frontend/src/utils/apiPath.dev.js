/**
 * Development API Configuration
 * 
 * This file contains API endpoint definitions for local development.
 * Use this when running the backend locally during development.
 */

// Base URL for local development backend
export const BASE_URL = 'http://localhost:5000/';

// Same API paths as production but with local base URL
export const API_PATHS = {
  // Authentication related endpoints
  AUTH: {
    REGISTER: '/api/auth/register',        // POST - Create new user account
    LOGIN: '/api/auth/login',              // POST - User login authentication
    GET_PROFILE: '/api/auth/profile',      // GET - Retrieve current user profile
  },

  // Resume management endpoints
  RESUME: {
    CREATE: '/api/resume',                           // POST - Create new resume
    GET_ALL: '/api/resume',                          // GET - Fetch all user's resumes
    GET_BY_ID: (id) => `/api/resume/${id}`,          // GET - Fetch specific resume by ID
    UPDATE: (id) => `/api/resume/${id}`,             // PUT/PATCH - Update resume data
    DELETE: (id) => `/api/resume/${id}`,             // DELETE - Remove resume
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-image`, // POST - Upload resume images
  },

  // Image upload endpoints
  IMAGES: {
    UPLOAD_IMAGE: '/api/auth/upload-images'          // POST - Upload general user images
  }
}
