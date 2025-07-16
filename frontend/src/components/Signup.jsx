import { authStyles as styles } from '../assets/dummystyle'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import { API_PATHS } from '../utils/apiPath';
import { UserContext } from '../context/UserContext'; 
import { Input } from './Input';
import axiosInstance from '../utils/axiosInstance';

const Signup = ({ setCurrentPage }) => {
    const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
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
    setError('');
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email: email,
        password: password
      });
      const{token} = response.data;
      if(token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } 
    catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. please try again later.');
    }
  };



  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
      </div>

      {/* Form  */}
      <form onSubmit ={handleSignup} className={styles.signupForm}>
        <Input value={fullName} 
        onChange={({target}) => setFullName(target.value)}
        label="Full Name"
        placeholder="Manish Kumar"
        type="text"
        />

         <Input value={email} 
        onChange={({target}) => setEmail(target.value)}
        label="Email"
        placeholder="manish.kumar@example.com"
        type="email"
        />

         <Input value={password} 
        onChange={({target}) => setPassword(target.value)}
        label="Password"
        placeholder="Min 8 characters"
        type="password"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.signupSubmit}>Create Account </button>

        {/* Footer  */}
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