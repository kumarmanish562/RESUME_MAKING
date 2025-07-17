/**
 * API Configuration and Endpoints
 * 
 * This file centralizes all API endpoint definitions for the Resume Maker application.
 * It provides a single source of truth for all backend API routes used by the frontend.
 * 
 * Benefits:
 * - Easy maintenance when API routes change
 * - Prevents typos in endpoint URLs
 * - Clear organization of API endpoints by feature
 * - Type safety and autocomplete support
 */

// Base URL for the backend API server
export const BASE_URL = 'https://resume-making-backend.onrender.com/';

// Centralized API endpoint definitions organized by feature
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

/**
 * Usage Examples:
 * 
 * // Basic endpoint
 * const loginUrl = API_PATHS.AUTH.LOGIN;
 * 
 * // Dynamic endpoint with ID
 * const resumeUrl = API_PATHS.RESUME.GET_BY_ID('123');
 * 
 * // Full URL construction
 * const fullUrl = BASE_URL + API_PATHS.AUTH.REGISTER;
 */
