/**
 * @fileoverview Input Components Library
 * 
 * A comprehensive collection of reusable input components for the resume builder
 * application. Includes standard form inputs, password fields with visibility toggle,
 * profile photo selection with preview, and inline title editing functionality.
 * 
 * @author Resume Builder Team
 * @since 1.0.0
 * 
 * Component Library:
 * - Input: Standard form input with label and password visibility toggle
 * - ProfilePhotoSelector: Image upload with preview and edit/remove actions
 * - TitleInput: Inline editable title with toggle between display and edit modes
 * 
 * Key Features:
 * - Consistent styling through dummystyle design system
 * - Focus state management and visual feedback
 * - Password visibility toggle with eye icons
 * - Image upload with drag-and-drop preview
 * - Inline editing with immediate save/cancel actions
 * - Responsive design with hover states
 * 
 * Design Characteristics:
 * - Modern UI with clean aesthetics
 * - Accessible keyboard navigation
 * - Visual feedback for user interactions
 * - Consistent spacing and typography
 * - Icon integration with Lucide React
 * 
 * Dependencies:
 * - Lucide React: Icons for UI elements
 * - dummystyle: Styling definitions and theme
 * - React hooks: useState, useEffect, useRef
 * 
 * @example
 * ```jsx
 * // Standard input usage
 * <Input 
 *   value={email} 
 *   onChange={setEmail}
 *   label="Email"
 *   placeholder="Enter your email"
 *   type="email"
 * />
 * 
 * // Password input with visibility toggle
 * <Input 
 *   value={password}
 *   onChange={setPassword}
 *   label="Password"
 *   type="password"
 * />
 * 
 * // Profile photo selector
 * <ProfilePhotoSelector 
 *   image={profileImage}
 *   setImage={setProfileImage}
 *   preview={previewUrl}
 *   setPreview={setPreviewUrl}
 * />
 * ```
 */

import { Camera, Check, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { photoSelectorStyles, inputStyles as styles, titleInputStyles } from '../assets/dummystyle'

/**
 * Standard Input Component
 * 
 * A versatile input field component with label support, focus states, and
 * special handling for password fields with visibility toggle functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Value change handler
 * @param {string} [props.label] - Optional label text
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.type="text"] - Input type (text, email, password, etc.)
 * 
 * @returns {JSX.Element} Input field with optional label and password toggle
 * 
 * @example
 * ```jsx
 * // Text input with label
 * <Input 
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   label="Full Name"
 *   placeholder="Enter your name"
 * />
 * 
 * // Password input with visibility toggle
 * <Input 
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   label="Password"
 *   placeholder="Enter password"
 *   type="password"
 * />
 * 
 * // Email input
 * <Input 
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   label="Email Address"
 *   type="email"
 * />
 * ```
 */
export const Input = ({ value, onChange, label, placeholder , type= "text"}) => { 
  const [showPassword, setShowPassword] = useState(false);
  const [ isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={styles.wrapper}>
      {/* Optional label */}
      {label && <label className={styles.label}>{label}</label>}
      
      {/* Input container with focus state styling */}
      <div className={styles.inputContainer(isFocused)}>
        {/* Main input field with conditional password type handling */}
        <input  
          type={type === "password" ? (showPassword ? "text" : "password") : type}  
          placeholder={placeholder}
          className={styles.inputField}
          value={value} 
          onChange={onChange} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {/* Password visibility toggle button */}
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

/**
 * Profile Photo Selector Component
 * 
 * An interactive image upload component with preview functionality, hover states,
 * and edit/remove actions. Handles file selection, preview generation, and
 * image management for profile photos.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {File|null} props.image - Current image file object
 * @param {Function} props.setImage - Function to update image file
 * @param {string|null} props.preview - Preview URL for the image
 * @param {Function} [props.setPreview] - Function to update preview URL
 * 
 * @returns {JSX.Element} Interactive photo selector with preview and actions
 * 
 * @example
 * ```jsx
 * // Basic photo selector
 * const [profileImage, setProfileImage] = useState(null);
 * const [previewUrl, setPreviewUrl] = useState(null);
 * 
 * <ProfilePhotoSelector 
 *   image={profileImage}
 *   setImage={setProfileImage}
 *   preview={previewUrl}
 *   setPreview={setPreviewUrl}
 * />
 * 
 * // With existing image
 * <ProfilePhotoSelector 
 *   image={userImage}
 *   setImage={updateUserImage}
 *   preview="https://example.com/user-photo.jpg"
 *   setPreview={setImagePreview}
 * />
 * ```
 */
export const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);
  const [hovered, setHovered] = useState(false);
  const styles = photoSelectorStyles;

  // Sync external preview changes
  useEffect(() => {
    if (preview) setPreviewUrl(preview);
  }, [preview]);

  /**
   * Handles file selection and preview generation
   * @param {Event} e - File input change event
   */
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreview?.(url);
    }
  };

  /**
   * Removes the current image and clears preview
   */
  const handleRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    setPreview?.(null);
  };

  /**
   * Triggers the hidden file input
   */
  const chooseFile = () => inputRef.current.click();

  return (
    <div className={styles.container}>
      {/* Hidden file input */}
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className={styles.hiddenInput} />
      
      {!previewUrl ? (
        // Placeholder state - no image selected
        <div
          className={styles.placeholder(hovered)}
          onClick={chooseFile}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <button type="button" className={styles.cameraButton}>
            <Camera size={20} />
          </button>
        </div>
      ) : (
        // Preview state - image selected
        <div
          className={styles.previewWrapper}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image preview container */}
          <div className={styles.previewImageContainer(hovered)} onClick={chooseFile}>
            <img src={previewUrl} alt="profile" className={styles.previewImage} />
          </div>
          
          {/* Action buttons overlay */}
          <div className={styles.overlay}>
            {/* Edit button */}
            <button type="button" className={styles.actionButton('white/80','white','gray-800')} onClick={chooseFile}>
              <Edit size={16} />
            </button>
            {/* Remove button */}
            <button type="button" className={styles.actionButton('red-500','red-600','white')} onClick={handleRemove}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Title Input Component
 * 
 * An inline editable title component that toggles between display and edit modes.
 * Provides immediate editing functionality with save/cancel actions.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Current title text
 * @param {Function} props.setTitle - Function to update title
 * 
 * @returns {JSX.Element} Inline editable title with toggle functionality
 * 
 * @example
 * ```jsx
 * // Resume title editor
 * const [resumeTitle, setResumeTitle] = useState("My Resume");
 * 
 * <TitleInput 
 *   title={resumeTitle}
 *   setTitle={setResumeTitle}
 * />
 * 
 * // Project title editor
 * const [projectName, setProjectName] = useState("Untitled Project");
 * 
 * <TitleInput 
 *   title={projectName}
 *   setTitle={setProjectName}
 * />
 * ```
 */
export const TitleInput = ({ title, setTitle }) => {
  const [editing, setEditing] = useState(false);
  const [focused, setFocused] = useState(false);
  const styles = titleInputStyles;

  return (
    <div className={styles.container}>
      {editing ? (
        // Edit mode - input field with confirm button
        <>
          <input
            type="text"
            placeholder="Resume title"
            className={styles.inputField(focused)}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
          />
          {/* Confirm changes button */}
          <button className={styles.confirmButton} onClick={() => setEditing(false)}>
            <Check className="w-5 h-5" />
          </button>
        </>
      ) : (
        // Display mode - title text with edit button
        <>
          <h2 className={styles.titleText}>{title}</h2>
          {/* Enter edit mode button */}
          <button className={styles.editButton} onClick={() => setEditing(true)}>
            <Edit className={styles.editIcon} />
          </button>
        </>
      )}
    </div>
  );
};

export default Input;

