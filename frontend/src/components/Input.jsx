import { Eye, EyeOff } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { inputStyles as styles } from '../assets/dummystyle'

export const Input = ({ value, onChange, label, placeholder , type= "text"}) => { 
  const [showPassword, setShowPassword] = useState(false);
  const [ isFocused, setIsFocused] = useState(false);
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer(isFocused)}>
        <input  type={type === "password" ? (showPassword ? "text" : "password") : type}  placeholder={placeholder}
        className={styles.inputField}
        value={value} 
        onChange={onChange} 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />
        {type === "password" && (
          <button 
            type="button" 
            className={styles.toggleButton} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input;

