import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { authStyles as styles } from '../assets/dummystyle';
import { validateEmail } from '../utils/helper';
import Input from './Input';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
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

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("Login response:", response.data);

      const { user } = response.data;
      const token = user.token;

      if (token) {
        localStorage.setItem('token', token);     // Store token
        updateUser(user);                          // Update user context
        navigate('/dashboard');                    // Navigate to dashboard
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
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Sign in to continue building amazing resumes</p>
      </div>

      {/* Login Form */}
      <form className={styles.form} onSubmit={handleLogin}>
        {/* Email Field */}
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Enter your email"
          type="email"
        />

        {/* Password Field */}
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        {/* Error Display */}
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        {/* Switch to Sign Up */}
        <p className="mt-4">
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
