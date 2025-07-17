import React, { useState } from 'react'
import {Input} from './Input'
import { useNavigate } from 'react-router-dom'
import { API_PATHS } from '../utils/apiPath'
import { Target } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'

const CreateResumeForm = () => {

const [title, setTitle] = useState('')
const [error, setError] = useState(null)
const navigate = useNavigate()

const handleCreatedResume = async (e) => {
  e.preventDefault()
  if (!title ){
    setError('Title is required')
    return
  }

  setError("")
  try {
    const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { 
      title , // Include other necessary fields here
    })
    if (response.data?._id ) {
      navigate(`/resume/${response.data?._id}`)
    }
  } catch (error) {
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
  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
    Create Your Resume
  </h3>

  <p className='text-gray-600 mb-8'>
    Give your resume a title and start building it with our easy-to-use form.
  </p>

  <form onSubmit={handleCreatedResume}>
    <Input 
      value={title || ''} 
      onChange={(e) => setTitle(e.target.value)} 
      label='Resume Title' 
      placeholder='e.g. Manish - Software Engineer'
      type='text' 
      required 
    />

    {error && (
      <p className='text-red-500 text-sm mb-4'>{error}</p>
    )}

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