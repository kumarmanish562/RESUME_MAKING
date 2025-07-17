/**
 * @fileoverview Image Upload Controller
 * Handles resume thumbnail and profile image uploads with file management.
 * Manages file replacement, URL generation, and database updates for resume images.
 * 
 * @requires fs - File system operations for file cleanup
 * @requires path - Path utilities for file path construction
 * @requires resumeModel - Resume database model
 * @requires uploadMiddleware - Multer middleware for file uploads
 */

import fs from 'fs';
import path from 'path';
import resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js'
import { error } from 'console';

/**
 * Uploads and manages resume images (thumbnail and profile picture)
 * 
 * Handles multiple image uploads for resumes including thumbnail generation
 * and profile images. Manages file replacement by deleting old files and
 * updating database with new image URLs.
 * 
 * @async
 * @function uploadResumeImages
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Resume's MongoDB ObjectId
 * @param {Object} req.files - Uploaded files from multer middleware
 * @param {Array} req.files.thumbnail - Thumbnail image file array
 * @param {Array} req.files.profileImage - Profile image file array
 * @param {Object} req.user - Authenticated user object from middleware
 * @param {string} req.user._id - User's MongoDB ObjectId
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Responds with uploaded image URLs or error
 * 
 * @example
 * PUT /api/resumes/64a7b8c9d1e2f3a4b5c6d7e8/upload-images
 * Content-Type: multipart/form-data
 * Body: { thumbnail: file, profileImage: file }
 * Response: {
 *   "message": "Resume images uploaded successfully",
 *   "thumbnailLink": "http://localhost:3000/uploads/thumbnail-123.png",
 *   "profilePreviewUrl": "http://localhost:3000/uploads/profile-123.png"
 * }
 */
export const uploadResumeImages = async (req, res) => {
  try { 
    // Configure multer middleware to handle multiple image uploads
    upload.fields([{name: "thumbnail"}, {name: "profileImage"}])
    (req, res, async (err) => {
      // Handle multer upload errors
      if(err) {
        return res.status(400).json({message: "File upload failed", error: err.message})
      }
      
      // Extract resume ID from URL parameters
      const resumeId = req.params.id;
      
      // Find resume and verify ownership
      const resumeDoc = await resume.findOne({ _id: resumeId, userId: req.user._id})
      if(!resumeDoc) {
        return res.status(404).json({message: "Resume not found or unauthorized"})
      }
      
      // Define file system paths and base URL for image access
      const uploadsFolder = path.join(process.cwd(), "uploads")
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      // Extract uploaded files from request
      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileImage?.[0];

      // Handle thumbnail image upload and replacement
      if(newThumbnail) {
        // Delete existing thumbnail if it exists
        if(resumeDoc.thumbnailLink) {
          const oldThumbnail = path.join(uploadsFolder, path.basename(resumeDoc.thumbnailLink));
          if(fs.existsSync(oldThumbnail))
            fs.unlinkSync(oldThumbnail)
        }
        // Update resume with new thumbnail URL
        resumeDoc.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;

      }


      // Handle profile image upload and replacement
      if(newProfileImage) {
        // Delete existing profile image if it exists
        if(resumeDoc.profileInfo?.profilePreviewUrl) {
          const oldProfile = path.join(uploadsFolder, path.basename(resumeDoc.profileInfo.profilePreviewUrl));
          if(fs.existsSync(oldProfile))
            fs.unlinkSync(oldProfile)
        }
        // Update resume with new profile image URL
        resumeDoc.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;

      }
      
      // Save updated resume document to database
      await resumeDoc.save();
      
      // Respond with success message and updated image URLs
      res.status(200).json({ message: "Resume images uploaded successfully",
        thumbnailLink: resumeDoc.thumbnailLink,
        profilePreviewUrl: resumeDoc.profileInfo?.profilePreviewUrl
       });
    });
  } catch (error) {
    // Handle unexpected errors during upload process
    console.error("Error uploading resume images:", error);
    res.status(500).json({ message: "Failed to upload image ", error: error.message });
  }
}