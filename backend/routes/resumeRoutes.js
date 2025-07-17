/**
 * @fileoverview Resume API Routes
 * Defines Express router for resume-related API endpoints with authentication.
 * Provides full CRUD operations for resumes including image upload functionality.
 * All routes are protected with JWT authentication middleware.
 * 
 * @requires express - Express.js web framework
 * @requires authMiddleware - JWT authentication protection
 * @requires resumeController - Resume business logic controllers
 * @requires uploadImages - Image upload controller
 */

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createResume, getUserResumes, getResumeById, updateResume, deleteResume } from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImages.js'
import upload from '../middleware/uploadMiddleware.js'

/**
 * Express Router for Resume API Endpoints
 * 
 * Configured router with authentication middleware and complete CRUD operations
 * for resume management including specialized image upload functionality.
 */
const resumeRouter = express.Router();

/**
 * @route POST /api/resumes
 * @desc Create a new resume
 * @access Private (requires authentication)
 * @middleware protect - JWT authentication required
 * @controller createResume
 * 
 * @example
 * POST /api/resumes
 * Headers: { "Authorization": "Bearer <jwt_token>" }
 * Body: { "title": "Software Engineer Resume" }
 * Response: { "_id": "...", "title": "Software Engineer Resume", ... }
 */
resumeRouter.post('/', protect, createResume);

/**
 * @route GET /api/resumes
 * @desc Get all resumes for authenticated user
 * @access Private (requires authentication)
 * @middleware protect - JWT authentication required
 * @controller getUserResumes
 * 
 * @example
 * GET /api/resumes
 * Headers: { "Authorization": "Bearer <jwt_token>" }
 * Response: [{ "_id": "...", "title": "Resume 1", ... }, ...]
 */
resumeRouter.get('/', protect, getUserResumes);

/**
 * @route GET /api/resumes/:id
 * @desc Get specific resume by ID
 * @access Private (requires authentication and ownership)
 * @middleware protect - JWT authentication required
 * @controller getResumeById
 * @param {string} id - Resume MongoDB ObjectId
 * 
 * @example
 * GET /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8
 * Headers: { "Authorization": "Bearer <jwt_token>" }
 * Response: { "_id": "64a7b8c9d1e2f3a4b5c6d7e8", "title": "My Resume", ... }
 */
resumeRouter.get('/:id', protect, getResumeById); 

/**
 * @route PUT /api/resumes/:id
 * @desc Update existing resume data
 * @access Private (requires authentication and ownership)
 * @middleware protect - JWT authentication required
 * @controller updateResume
 * @param {string} id - Resume MongoDB ObjectId
 * 
 * @example
 * PUT /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8
 * Headers: { "Authorization": "Bearer <jwt_token>" }
 * Body: { "title": "Updated Resume Title", "profileInfo": {...} }
 * Response: { "_id": "...", "title": "Updated Resume Title", ... }
 */
resumeRouter.put('/:id', protect, updateResume); 

/**
 * @route PUT /api/resumes/:id/upload-image
 * @desc Upload resume images (thumbnail and profile picture)
 * @access Private (requires authentication and ownership)
 * @middleware protect - JWT authentication required
 * @controller uploadResumeImages
 * @param {string} id - Resume MongoDB ObjectId
 * 
 * @example
 * PUT /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8/upload-image
 * Headers: { "Authorization": "Bearer <jwt_token>" }
 * Content-Type: multipart/form-data
 * Body: { thumbnail: file, profileImage: file }
 * Response: {
 *   "message": "Resume images uploaded successfully",
 *   "thumbnailLink": "http://localhost:3000/uploads/thumbnail-123.png",
 *   "profilePreviewUrl": "http://localhost:3000/uploads/profile-123.png"
 * }
 */
// Handle preflight OPTIONS request for upload endpoint
resumeRouter.options('/:id/upload-image', (req, res) => {
  res.status(200).end();
});

resumeRouter.put('/:id/upload-image', protect, upload.fields([{name: "thumbnail"}, {name: "profileImage"}]), uploadResumeImages);

/**
 * @route DELETE /api/resumes/:id
 * @desc Delete resume and associated files
 * @access Private (requires authentication and ownership)
 * @middleware protect - JWT authentication required
 * @controller deleteResume
 * @param {string} id - Resume MongoDB ObjectId
 * 
 * @example
 * DELETE /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8
 * Headers: { "Authorization": "Bearer <jwt_token>" }
 * Response: { "message": "Resume deleted successfully" }
 */
resumeRouter.delete('/:id', protect, deleteResume);

/**
 * Resume Router Export
 * 
 * Configured Express router with all resume endpoints and authentication.
 * Ready to be mounted on the main Express application.
 * 
 * @example
 * // In main app.js
 * import resumeRouter from './routes/resumeRoutes.js';
 * app.use('/api/resumes', resumeRouter);
 */
export default resumeRouter;


