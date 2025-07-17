/**
 * @fileoverview CreateResumeForm Component
 * A form component for creating new resumes with title input and validation.
 * Handles resume creation API calls and navigation to the edit page.
 * 
 * @requires React
 * @requires Input
 * @requires react-router-dom
 * @requires apiPath
 * @requires lucide-react
 * @requires axiosInstance
 */

import React, { useState } from 'react'
import {Input} from './Input'
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '../utils/apiPath'
import { Target } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'

/**
 * CreateResumeForm Component
 * 
 * Renders a form for creating new resumes with title input, validation,
 * and API integration. Navigates to the resume editor upon successful creation.
 * 
 * @component
 * @returns {JSX.Element} Form component with title input and create button
 * 
 * @example
 * ```jsx
 * <CreateResumeForm />
 * ```
 */
const CreateResumeForm = () => {

// State for managing form input and error handling
const [title, setTitle] = useState('')
const [error, setError] = useState(null)
const navigate = useNavigate()

/**
 * Handles resume creation form submission
 * 
 * Validates the title input, makes API call to create resume,
 * and navigates to the resume editor on success.
 * 
 * @param {Event} e - Form submission event
 * @returns {Promise<void>} Async function for handling form submission
 */
const handleCreatedResume = async (e) => {
  e.preventDefault()
  
  // Validate required title field
  if (!title ){
    setError('Title is required')
    return
  }

  // Clear any previous errors
  setError("")
  try {
    // Make API call to create new resume
    const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { 
      title , // Include other necessary fields here
    })
    
    // Navigate to resume editor if creation successful
    if (response.data?._id ) {
      navigate(`/resume/${response.data?._id}`)
    }
  } catch (error) {
    // Handle API errors with user-friendly messages
   if (error.response && error.response.data.message) {
      setError(error.response.data.message)
    }
    else {
      setError('Something went wrong. Please try again later.')
    }
  }
}



  return (
   <div className='w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-lg p-6'>
  {/* Form header section */}
  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
    Create Your Resume
  </h3>

  <p className='text-gray-600 mb-8'>
    Give your resume a title and start building it with our easy-to-use form.
  </p>

  {/* Resume creation form */}
  <form onSubmit={handleCreatedResume}>
    {/* Title input field */}
    <Input 
      value={title || ''} 
      onChange={(e) => setTitle(e.target.value)} 
      label='Resume Title' 
      placeholder='e.g. Manish - Software Engineer'
      type='text' 
      required 
    />

    {/* Error message display */}
    {error && (
      <p className='text-red-500 text-sm mb-4'>{error}</p>
    )}

    {/* Submit button with gradient styling and hover effects */}
    <button 
      type='submit' 
      className='w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black
      rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-emerald-200 transition-all'>
      Create Resume
    </button>
  </form>
</div>

  )
}

export default CreateResumeForm