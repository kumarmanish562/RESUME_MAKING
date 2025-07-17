/**
 * @fileoverview File Upload Middleware
 * Configures multer middleware for handling image file uploads with validation.
 * Provides disk storage configuration, file filtering, and naming conventions
 * for resume-related image uploads (thumbnails, profile pictures).
 * 
 * @requires multer - Multipart form data handling library for file uploads
 */

import multer from 'multer'

/**
 * Disk storage configuration for multer
 * 
 * Defines where uploaded files are stored and how they are named.
 * Files are saved to the 'uploads/' directory with timestamp-prefixed names
 * to prevent naming conflicts and maintain chronological order.
 */
const storage = multer.diskStorage({
  /**
   * Destination callback - defines upload directory
   * 
   * @param {Object} req - Express request object
   * @param {Object} file - Uploaded file object from multer
   * @param {Function} cb - Callback function to set destination
   */
  destination: (req, file, cb ) => {
    // Store all uploaded files in the uploads directory
    cb(null, "uploads/")
  },
  
  /**
   * Filename callback - defines how uploaded files are named
   * 
   * Generates unique filenames using timestamp prefix to prevent conflicts
   * and maintain the original file extension.
   * 
   * @param {Object} req - Express request object
   * @param {Object} file - Uploaded file object with originalname property
   * @param {Function} cb - Callback function to set filename
   */
  filename: (req, file, cb) => {
    // Create unique filename with timestamp prefix
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

/**
 * File type validation filter
 * 
 * Restricts uploaded files to specific image formats for security
 * and compatibility. Only allows JPEG, JPG, and PNG image files.
 * 
 * @function fileFilter
 * @param {Object} req - Express request object
 * @param {Object} file - Uploaded file object from multer
 * @param {string} file.mimetype - MIME type of the uploaded file
 * @param {Function} cb - Callback function to accept/reject file
 * 
 * @example
 * // Accepted file types:
 * // - image/jpeg
 * // - image/png  
 * // - image/jpg
 * 
 * // Rejected files will trigger error:
 * // "only .jpg, .jpeg, and .png files are allowed"
 */
//File Filter
const fileFilter = (req, file, cb) => {
  // Define allowed image MIME types
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  
  // Check if uploaded file type is in allowed list
  if (allowedTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file with error message
    cb(new Error("only .jpg, .jpeg, and .png files are allowed"), false);
  }
};

/**
 * Configured multer upload middleware
 * 
 * Combines storage configuration and file filtering to create
 * a complete upload middleware for handling image files.
 * Can be used with .single(), .array(), or .fields() methods.
 * 
 * @constant {Object} upload - Configured multer middleware instance
 * 
 * @example
 * // Single file upload
 * app.post('/upload', upload.single('image'), (req, res) => {
 *   // req.file contains uploaded file info
 * });
 * 
 * // Multiple files upload
 * app.post('/upload-multiple', upload.fields([
 *   { name: 'thumbnail', maxCount: 1 },
 *   { name: 'profileImage', maxCount: 1 }
 * ]), (req, res) => {
 *   // req.files contains uploaded files info
 * });
 */
const upload = multer({
  storage, fileFilter
})

export default upload;