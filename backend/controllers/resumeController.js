/**
 * @fileoverview Resume Controller Module
 * Handles all resume-related API operations including CRUD operations,
 * file management, and user authorization for the resume builder application.
 * 
 * @requires path - Node.js path utilities
 * @requires Resume - Resume model for database operations
 * @requires fs - File system operations
 */

import path from 'path';
import Resume from '../models/resumeModel.js';
import fs from 'fs';

/**
 * Creates a new resume with default template structure
 * 
 * Initializes a new resume document with default empty sections and
 * associates it with the authenticated user's ID.
 * 
 * @async
 * @function createResume
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing resume data
 * @param {string} req.body.title - Title for the new resume
 * @param {Object} req.user - Authenticated user object from middleware
 * @param {string} req.user._id - User's MongoDB ObjectId
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with created resume object or error
 * 
 * @example
 * POST /api/resumes
 * Body: { "title": "Software Engineer Resume" }
 * Response: { "_id": "...", "title": "Software Engineer Resume", ... }
 */
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default template structure for new resumes
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        
    // Create new resume with user ID and default structure
    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });
    
    // Return created resume with 201 status
    res.status(201).json(newResume);
  } catch (error) {
    // Handle creation errors
    res
      .status(500)
      .json({ message: 'failed to create resume', error: error.message });
  }
};

/**
 * Retrieves all resumes for the authenticated user
 * 
 * Fetches user's resumes sorted by most recently updated first.
 * Only returns resumes belonging to the authenticated user.
 * 
 * @async
 * @function getUserResumes
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object from middleware
 * @param {string} req.user._id - User's MongoDB ObjectId
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with array of user's resumes or error
 * 
 * @example
 * GET /api/resumes
 * Response: [{ "_id": "...", "title": "Resume 1", ... }, ...]
 */
//get Function
export const getUserResumes = async (req, res) => {
  try {
    // Find all resumes for the authenticated user, sorted by update date
    const resume = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to get resumes', error: error.message });
  }
};

/**
 * Retrieves a specific resume by ID for the authenticated user
 * 
 * Fetches a single resume document ensuring it belongs to the authenticated user.
 * Returns 404 if resume doesn't exist or doesn't belong to the user.
 * 
 * @async
 * @function getResumeById
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Resume's MongoDB ObjectId
 * @param {Object} req.user - Authenticated user object from middleware
 * @param {string} req.user._id - User's MongoDB ObjectId
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with resume object or error
 * 
 * @example
 * GET /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8
 * Response: { "_id": "64a7b8c9d1e2f3a4b5c6d7e8", "title": "My Resume", ... }
 */
//get resume by id
export const getResumeById = async (req, res) => {
  try {
    // Find resume by ID and ensure it belongs to the authenticated user
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    // Check if resume exists and belongs to user
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.status(200).json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to get resume', error: error.message });
  }
};

/**
 * Updates an existing resume with new data
 * 
 * Merges the provided data with existing resume and saves changes.
 * Ensures user authorization before allowing updates.
 * 
 * @async
 * @function updateResume
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Resume's MongoDB ObjectId
 * @param {Object} req.body - Updated resume data
 * @param {Object} req.user - Authenticated user object from middleware
 * @param {string} req.user._id - User's MongoDB ObjectId
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with updated resume object or error
 * 
 * @example
 * PUT /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8
 * Body: { "title": "Updated Resume Title", "profileInfo": {...} }
 * Response: { "_id": "...", "title": "Updated Resume Title", ... }
 */
//update resume
export const updateResume = async (req, res) => {
  try {
    // Find resume and verify ownership
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or not authorized' });
    }

    // Merge update data with existing resume
    Object.assign(resume, req.body);
    
    // Save updated resume to database
    const savedResume = await resume.save();
    res.status(200).json(savedResume);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to update resume', error: error.message });
  }
};

/**
 * Deletes a resume and associated files
 * 
 * Removes resume document from database and deletes associated files
 * (thumbnail images, profile images) from the file system.
 * Ensures user authorization before deletion.
 * 
 * @async
 * @function deleteResume
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Resume's MongoDB ObjectId
 * @param {Object} req.user - Authenticated user object from middleware
 * @param {string} req.user._id - User's MongoDB ObjectId
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with success message or error
 * 
 * @example
 * DELETE /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8
 * Response: { "message": "Resume deleted successfully" }
 */
//Delete resume
export const deleteResume = async (req, res) => {
  try {
    // Find resume and verify ownership
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    // Define upload folder path for file cleanup
    const uploadFolder = path.join(process.cwd(), 'uploads')

    // Delete thumbnail image if it exists
    if(resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink))
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail)
      }
    }
    
    // Delete profile image if it exists
    if(resume.profileInfo?.profilePreviewUrl){
      const oldProfile = path.join(
        uploadFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      )
       if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail)
      }
    }

    // Delete resume document from database
    const deleted = await Resume.findOneAndDelete({
      _id:req.params.id,
      userId: req.user._id
    })
    
    if(!deleted){
      return res.status(404).json({ message: "Resume not found or not authorized"})
    }
    
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'failed to delete resume', error: error.message });
  }
};