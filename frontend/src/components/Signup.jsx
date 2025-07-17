/**
 * @fileoverview Signup Component for Resume Builder Application
 * 
 * This component provides a comprehensive user registration interface with form validation,
 * error handling, and seamless integration with the authentication system. It features
 * a modern design with professional styling and smooth user experience flows.
 * 
 * Key Features:
 * - Complete user registration form with validation
 * - Real-time form validation with descriptive error messages
 * - Secure password handling and email validation
 * - Integration with authentication context for user management
 * - Automatic token storage and user session initialization
 * - Smooth navigation to dashboard upon successful registration
 * - Modal-based page switching between signup and login
 * - Professional styling with reusable Input components
 * - Error handling with user-friendly feedback messages
 * - Responsive design that works across different screen sizes
 * 
 * Form Fields:
 * - Full Name: User's complete name (required)
 * - Email: Valid email address with validation (required)
 * - Password: Secure password with minimum requirements (required)
 * 
 * Validation Rules:
 * - Full Name: Must not be empty
 * - Email: Must pass email format validation via validateEmail utility
 * - Password: Must not be empty (additional requirements can be added)
 * 
 * User Flow:
 * 1. User fills out registration form
 * 2. Client-side validation checks all fields
 * 3. API request sent to registration endpoint
 * 4. On success: token stored, user context updated, redirect to dashboard
 * 5. On error: display appropriate error message to user
 * 
 * Usage:
 * ```jsx
 * // In a modal or authentication flow
 * const [currentPage, setCurrentPage] = useState('signup');
 * 
 * <Signup setCurrentPage={setCurrentPage} />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

import { authStyles as styles } from '../assets/dummystyle'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import { API_PATHS } from '../utils/apiPath';
import { Input } from './Input';
import axiosInstance from '../utils/axiosInstance';
import { UserContext } from '../context/UserContext';

/**
 * Signup Component
 * 
 * A comprehensive user registration component that handles account creation with
 * form validation, error handling, and automatic authentication. Features a clean,
 * professional interface with smooth user experience flows.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.setCurrentPage - Function to switch between authentication pages (signup/login)
 * 
 * @returns {JSX.Element} The rendered signup form with validation and error handling
 * 
 * @example
 * ```jsx
 * // Basic usage in authentication modal
 * const [authPage, setAuthPage] = useState('signup');
 * 
 * {authPage === 'signup' && (
 *   <Signup setCurrentPage={setAuthPage} />
 * )}
 * 
 * // With conditional rendering
 * const [showSignup, setShowSignup] = useState(false);
 * 
 * {showSignup && (
 *   <Signup setCurrentPage={(page) => {
 *     if (page === 'login') {
 *       setShowSignup(false);
 *       setShowLogin(true);
 *     }
 *   }} />
 * )}
 * ```
 * 
 * @description
 * **Form Validation:**
 * - Full Name: Required field, cannot be empty
 * - Email: Must pass validateEmail() utility function
 * - Password: Required field, minimum requirements can be enhanced
 * 
 * **Authentication Flow:**
 * 1. Form submission triggers validation
 * 2. Valid data sent to `/api/auth/register` endpoint
 * 3. Success: Token stored in localStorage, user context updated
 * 4. Automatic redirect to dashboard page
 * 5. Error: Display user-friendly error message
 * 
 * **Error Handling:**
 * - Client-side validation with immediate feedback
 * - Server error messages displayed to user
 * - Graceful fallback for network issues
 */
const Signup = ({ setCurrentPage }) => {
  // Form state management
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error state for validation and API error feedback
  const [error, setError] = useState(null);

  // Context and navigation hooks
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  /**
   * Handles user registration form submission
   * Performs client-side validation, API request, and post-registration flow
   * 
   * @async
   * @function handleSignup
   * @param {Event} e - Form submission event
   */
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if(!fullName){
      setError('Please enter FullName');
      return;
    }
    if(!validateEmail(email)){
      setError('Please enter a valid email');
      return;
    }
    if(!password){
      setError('Please enter a password');
      return;
    }
    
    // Clear any existing errors
    setError('');
    
    try {
      // Send registration request to API
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email: email,
        password: password
      });
      
      // Check if registration was successful
      if(response.data.success) {
        // Extract user data and token from response
        const { user } = response.data;
        const token = user.token;

        if (token) {
          // Store token and update user context
          localStorage.setItem('token', token);
          updateUser(user);
          
          // Navigate directly to dashboard
          navigate('/dashboard');
        } else {
          setError('Registration failed. No token received.');
        }
      }
    } 
    catch (error) {
      // Handle registration errors with user-friendly messages
      setError(error.response?.data?.message || 'Something went wrong. please try again later.');
    }
  };

  return (
    <div className={styles.signupContainer}>
      {/* Header section with title and subtitle */}
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
      </div>

      {/* Registration form with validation */}
      <form onSubmit={handleSignup} className={styles.signupForm}>
        
        {/* Full Name input field */}
        <Input 
          value={fullName} 
          onChange={({target}) => setFullName(target.value)}
          label="Full Name"
          placeholder="Manish Kumar"
          type="text"
        />

        {/* Email input field with validation */}
        <Input 
          value={email} 
          onChange={({target}) => setEmail(target.value)}
          label="Email"
          placeholder="manish.kumar@example.com"
          type="email"
        />

        {/* Password input field */}
        <Input 
          value={password} 
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {/* Error message display */}
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {/* Submit button */}
        <button type="submit" className={styles.signupSubmit}>Create Account</button>

        {/* Footer with link to login page */}
        <p className={styles.switchText}>
          Already have an account? {'  '}
          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className={styles.signupSwitchButton}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  )
}

export default Signup