import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { authStyles as styles} from '../assets/dummystyle';
import { validateEmail } from '../utils/helper';
import Input from './Input';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

const Login = ({ setCurrentPage }) => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
     if(!validateEmail(email)){
          setError('Please enter a valid email');
          return;
        }
        if(!password){
          setError('Please enter a password');
          return;
        }
        setError('');
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email,
        password: password
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. please try again later.');
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>Sign in to continue building amazing resumes</p>
      </div>
      {/* Form */}
      <form className={styles.form} onSubmit={handleLogin}>
        <Input value= {email} onChange={(target) => setEmail(target.value)} 
        label="Email"
        placeholder="Email" 
        type="email" />

         <Input value={password} 
        onChange={({target}) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 characters"
        type="password"
        />
        {error && <div className={styles.errorMessage}>{error}</div>}
         <button type="submit" className={styles.submitButton}> 
          Sign In
         </button>
         <p>
          Don't have an account? {''} 
          <button type="button" 
          onClick={() => setCurrentPage('signup')} 
            className={styles.switchButton}>
              Sign up
              </button>
         </p>

      </form>

    </div>
  )
}

export default Login