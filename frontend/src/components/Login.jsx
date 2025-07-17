/**
 * @fileoverview User Login Component
 * 
 * Authentication component that handles user login functionality with email
 * and password validation. Integrates with the UserContext for global state
 * management and provides seamless navigation to the dashboard upon successful
 * authentication.
 * 
 * @author Resume Builder Team
 * @since 1.0.0
 * 
 * Key Features:
 * - Email and password validation
 * - Secure token-based authentication
 * - Error handling and user feedback
 * - Context integration for user state management
 * - Navigation control between auth forms
 * - Responsive design with consistent styling
 * 
 * Authentication Flow:
 * 1. User enters email and password
 * 2. Client-side validation (email format, required fields)
 * 3. API request to backend authentication endpoint
 * 4. Token storage in localStorage
 * 5. User context update with authenticated user data
 * 6. Automatic navigation to dashboard
 * 
 * Security Features:
 * - Input validation and sanitization
 * - Secure token storage
 * - Error message handling without exposing sensitive data
 * - HTTPS API communication through axios instance
 * 
 * Dependencies:
 * - React Router: Navigation after successful login
 * - UserContext: Global user state management
 * - Input component: Reusable form input fields
 * - axiosInstance: Configured HTTP client
 * - validateEmail utility: Email format validation
 * 
 * @example
 * ```jsx
 * // Used within modal or standalone page
 * <Login setCurrentPage={setAuthPage} />
 * 
 * // In authentication modal system
 * {currentPage === 'login' && (
 *   <Login setCurrentPage={setCurrentPage} />
 * )}
 * ```
 */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { authStyles as styles } from '../assets/dummystyle';
import { validateEmail } from '../utils/helper';
import Input from './Input';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

/**
 * User Login Component
 * 
 * Provides a complete login form with validation, authentication, and
 * navigation. Handles the entire authentication flow from user input
 * to successful dashboard redirect.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.setCurrentPage] - Function to switch between auth forms (login/signup)
 * 
 * @returns {JSX.Element} Login form with email, password fields and navigation
 * 
 * @example
 * ```jsx
 * // Basic login form
 * function AuthModal() {
 *   const [currentPage, setCurrentPage] = useState('login');
 *   
 *   return (
 *     <Modal isOpen={isAuthOpen} onClose={closeAuth}>
 *       <Login setCurrentPage={setCurrentPage} />
 *     </Modal>
 *   );
 * }
 * 
 * // Standalone login page
 * function LoginPage() {
 *   return <Login />;
 * }
 * ```
 */
const Login = ({ setCurrentPage }) => {
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Context and navigation hooks
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Handles login form submission with validation and authentication
   * 
   * Performs client-side validation, sends authentication request to backend,
   * stores received token, updates user context, and navigates to dashboard.
   * 
   * @async
   * @param {Event} e - Form submission event
   * @returns {Promise<void>}
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    try {
      setError(''); // Clear previous errors

      // Send authentication request to backend
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("Login response:", response.data);

      // Extract user data and token from response
      const { user } = response.data;
      const token = user.token;

      if (token) {
        localStorage.setItem('token', token);     // Store authentication token
        updateUser(user);                          // Update global user context
        navigate('/dashboard');                    // Navigate to main application
      } else {
        setError('Login failed. No token received.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Sign in to continue building amazing resumes</p>
      </div>

      {/* Login Form */}
      <form className={styles.form} onSubmit={handleLogin}>
        {/* Email Input Field */}
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Enter your email"
          type="email"
        />

        {/* Password Input Field */}
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        {/* Error Message Display */}
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        {/* Navigation to Sign Up Form */}
        <p className={`mt-4 ${styles.switchText}`} style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentPage && setCurrentPage('signup')}
            className={styles.switchButton}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
