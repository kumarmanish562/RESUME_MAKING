/**
 * User Context Provider
 * 
 * This file provides a React Context for managing user authentication state
 * throughout the Resume Maker application. It handles user login, logout,
 * token management, and automatic authentication restoration on app reload.
 * 
 * Key Features:
 * - Centralized authentication state management
 * - Automatic token validation and user profile fetching
 * - Persistent authentication across browser sessions
 * - Loading states for smooth user experience
 * - Token cleanup on logout or authentication errors
 * 
 * Context Values Provided:
 * - user: Current user object (null if not authenticated)
 * - loading: Boolean indicating if authentication check is in progress
 * - updateUser: Function to set user data and token after login
 * - clearUser: Function to logout user and clear stored data
 * 
 * Usage:
 * - Wrap your app with UserProvider at the root level
 * - Use useContext(UserContext) in components to access auth state
 * - Call updateUser() after successful login
 * - Call clearUser() for logout functionality
 * 
 * Dependencies:
 * - React Context API: For state management across components
 * - axiosInstance: For authenticated API calls
 * - localStorage: For persistent token storage
 * 
 * @fileoverview User authentication context provider for Resume Maker
 * @version 1.0.0
 */

import React, { createContext, useEffect, useState } from 'react';
import { API_PATHS } from '../utils/apiPath'; // API endpoint constants
import axiosInstance from '../utils/axiosInstance'; // Configured axios client with interceptors

/**
 * User Context
 * 
 * React Context that provides authentication state and methods
 * throughout the application component tree.
 * 
 * @type {React.Context}
 */
export const UserContext = createContext();

/**
 * User Provider Component
 * 
 * Context provider that manages user authentication state and provides
 * authentication-related functions to child components.
 * 
 * Features:
 * - Automatic authentication restoration on app load
 * - Token validation with server
 * - Loading state management
 * - Error handling for invalid tokens
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to provide context to
 * @returns {JSX.Element} Context provider wrapper
 */
const UserProvider = ({ children }) => {
  // State Management
  const [user, setUser] = useState(null); // Current user object (null = not authenticated)
  const [loading, setLoading] = useState(true); // Loading state for authentication checks

  /**
   * Authentication Effect Hook
   * 
   * Automatically runs on component mount to check if user is already
   * authenticated by validating stored token and fetching user profile.
   * 
   * Process:
   * 1. Check if user is already loaded (avoid unnecessary API calls)
   * 2. Look for stored authentication token in localStorage
   * 3. If token exists, validate it with server and fetch user profile
   * 4. Handle authentication errors by clearing invalid tokens
   * 5. Update loading state when process completes
   * 
   * Dependencies: [user] - Re-run if user state changes
   */
  useEffect(() => {
    // If user is already loaded, don't make unnecessary API calls
    if (user) return;
    
    // Check for stored authentication token
    const accessToken = localStorage.getItem('token');
    
    // If no token exists, user is not authenticated
    if (!accessToken) {
      setLoading(false);
      return;
    }
    
    /**
     * Fetch User Profile
     * 
     * Validates the stored token by making an authenticated API call
     * to fetch the user's profile information.
     * 
     * @async
     * @function fetchUser
     */
    const fetchUser = async () => {
      try {
        // Make authenticated API call to get user profile
        // The token is automatically included by axiosInstance interceptors
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        
        // Set user data if token is valid
        setUser(response.data);
        
      } catch (error) {
        // Token is invalid or server error occurred
        console.error('User not authenticated:', error);
        
        // Clear invalid token and user data
        clearUser();
        
      } finally {
        // Always stop loading when authentication check completes
        setLoading(false);
      }
    };
    
    // Execute the authentication check
    fetchUser();
  }, [user]); // Dependency: re-run if user state changes

  /**
   * Update User Function
   * 
   * Sets user data and stores authentication token after successful login.
   * This function is typically called from login components after
   * successful authentication with the server.
   * 
   * @param {Object} userData - User data object from login response
   * @param {string} userData.token - JWT authentication token
   * @param {string} userData.email - User's email address
   * @param {string} userData.name - User's display name
   * @param {string} userData.id - User's unique identifier
   * 
   * Process:
   * 1. Store user data in component state
   * 2. Save authentication token to localStorage for persistence
   * 3. Stop loading state
   * 
   * @example
   * // After successful login API call
   * const loginResponse = await api.login(credentials);
   * updateUser(loginResponse.data);
   */
  const updateUser = (userData) => {
    setUser(userData); // Set user data in state
    localStorage.setItem('token', userData.token); // Persist token for future sessions
    setLoading(false); // Authentication process complete
  };

  /**
   * Clear User Function
   * 
   * Logs out the user by clearing all authentication data from both
   * component state and persistent storage. This function is called
   * on explicit logout or when token validation fails.
   * 
   * Process:
   * 1. Clear user data from component state
   * 2. Remove authentication token from localStorage
   * 3. Stop loading state
   * 
   * Use Cases:
   * - User clicks logout button
   * - Token expires or becomes invalid
   * - Server returns authentication error
   * - User manually clears session
   * 
   * @example
   * // Logout button handler
   * const handleLogout = () => {
   *   clearUser();
   *   navigate('/');
   * };
   */
  const clearUser = () => {
    setUser(null); // Remove user data from state
    localStorage.removeItem('token'); // Remove persistent token
    setLoading(false); // Stop any loading states
  };

  /**
   * Context Value Object
   * 
   * Defines what data and functions are available to child components
   * through the UserContext.
   * 
   * Available Properties:
   * - user: Current user object or null
   * - loading: Boolean indicating authentication check status
   * - updateUser: Function to set user data after login
   * - clearUser: Function to logout and clear data
   */
  const contextValue = {
    user,        // Current authenticated user data
    loading,     // Loading state for auth operations
    updateUser,  // Function to login/set user
    clearUser    // Function to logout/clear user
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


