/**
 * Axios HTTP Client Configuration
 * 
 * This file creates a pre-configured Axios instance for making HTTP requests
 * to the Resume Maker backend API. It includes:
 * 
 * Features:
 * - Automatic base URL configuration
 * - Request/response interceptors for authentication
 * - Global error handling
 * - Automatic token attachment
 * - Timeout configuration
 * 
 * Benefits:
 * - Centralized HTTP configuration
 * - Automatic authentication handling
 * - Consistent error handling across the app
 * - Easy to maintain and modify
 */

// HTTP client library for making API requests
import axios from 'axios';
// Base URL configuration from API paths
import { BASE_URL } from './apiPath';

/**
 * Create Axios Instance with Default Configuration
 * 
 * This instance is pre-configured with:
 * - Base URL pointing to our backend server
 * - 10-second timeout for all requests
 * - JSON content type headers
 * - Accept header for JSON responses
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,                    // Backend server URL (http://localhost:5000/)
  timeout: 10000,                       // 10 seconds timeout to prevent hanging requests
  headers: {
    'Content-Type': 'application/json', // Send JSON data by default
    'Accept': 'application/json',       // Expect JSON responses from server
  },
});

/**
 * Request Interceptor
 * 
 * Automatically runs before every HTTP request is sent.
 * Purpose: Attach authentication token to requests
 * 
 * Flow:
 * 1. Check if user has a stored authentication token
 * 2. If token exists, add it to Authorization header
 * 3. Send the modified request to server
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve authentication token from browser storage
    const accessToken = localStorage.getItem('token');
    
    // Attach token to request headers if available
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    return config; // Send the modified request configuration
  },
  (error) => {
    // Handle any errors that occur during request setup
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * 
 * Automatically runs when receiving responses from the server.
 * Purpose: Handle common HTTP errors globally
 * 
 * Error Handling:
 * - 401 Unauthorized: Redirect to login page
 * - 500 Server Error: Log error details
 * - Timeout: Log timeout message
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // For successful responses (2xx), return as-is
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with an error status code
      
      if (error.response.status === 401) {
        // Unauthorized - user needs to login again
        // Clear invalid token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/';
        console.warn('Session expired. Redirecting to login...');
        
      } else if (error.response.status === 500) {
        // Internal server error - log for debugging
        console.error('Server error:', error.response.data);
        
      } else if (error.response.status === 403) {
        // Forbidden - user doesn't have permission
        console.error('Access forbidden:', error.response.data);
        
      } else if (error.response.status === 404) {
        // Not found - resource doesn't exist
        console.error('Resource not found:', error.response.data);
      }
      
    } else if (error.code === 'ECONNABORTED') {
      // Request timeout - server didn't respond in time
      console.error('Request timed out:', error.message);
      
    } else if (error.request) {
      // Network error - request was made but no response received
      console.error('Network error - no response received:', error.request);
      
    } else {
      // Something else went wrong during request setup
      console.error('Request setup error:', error.message);
    }

    // Always reject the promise so calling code can handle the error
    return Promise.reject(error);
  }
);

/**
 * Export the configured Axios instance
 * 
 * Usage in components:
 * import axiosInstance from '../utils/axiosInstance';
 * 
 * // Making requests
 * const response = await axiosInstance.get('/api/resume');
 * const result = await axiosInstance.post('/api/auth/login', userData);
 */
export default axiosInstance;
