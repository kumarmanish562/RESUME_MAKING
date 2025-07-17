/**
 * Image Upload Utility Functions
 * 
 * This file provides comprehensive image upload functionality for the Resume Maker application.
 * It handles file validation, compression, format conversion, and upload operations for
 * profile pictures, resume thumbnails, and other image assets.
 * 
 * Key Features:
 * - File type validation (JPEG, PNG, WebP, GIF)
 * - Image size validation and compression
 * - Preview generation for uploaded images
 * - Base64 encoding and decoding
 * - File upload to server with progress tracking
 * - Error handling and user feedback
 * - Image optimization for web and print
 * 
 * Dependencies:
 * - axiosInstance: For HTTP requests to upload endpoints
 * - Browser APIs: File, FileReader, Canvas, Image
 * 
 * @fileoverview Image upload and processing utilities for resume builder
 * @version 1.0.0
 */

// src/utils/uploadImage.js
import axiosInstance from "./axiosInstance";

/**
 * Supported image file types and their MIME types
 * Used for validation and processing decisions
 */
const SUPPORTED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif']
};

/**
 * Image size constraints for different use cases
 * Helps maintain performance and storage efficiency
 */
const IMAGE_CONSTRAINTS = {
  // Profile pictures - small, optimized for display
  PROFILE: {
    maxWidth: 400,
    maxHeight: 400,
    maxSizeBytes: 2 * 1024 * 1024, // 2MB
    quality: 0.8
  },
  // Resume thumbnails - medium size for previews
  THUMBNAIL: {
    maxWidth: 800,
    maxHeight: 1000,
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    quality: 0.9
  },
  // High-resolution images for PDF generation
  HIGH_RES: {
    maxWidth: 2480,
    maxHeight: 3508, // A4 at 300 DPI
    maxSizeBytes: 10 * 1024 * 1024, // 10MB
    quality: 0.95
  }
};

/**
 * Validate Image File
 * 
 * Performs comprehensive validation on uploaded image files including
 * file type, size, dimensions, and format compatibility.
 * 
 * @param {File} file - The file object to validate
 * @param {string} type - Image type constraint ('PROFILE', 'THUMBNAIL', 'HIGH_RES')
 * @returns {Promise<{valid: boolean, error?: string, details?: object}>}
 * 
 * Validation Steps:
 * 1. Check if file exists and is valid
 * 2. Validate MIME type against supported formats
 * 3. Check file size against constraints
 * 4. Validate image dimensions (if possible)
 * 5. Check for corrupted or invalid image data
 * 
 * @example
 * const result = await validateImageFile(file, 'PROFILE');
 * if (result.valid) {
 *   // Proceed with upload
 * } else {
 *   console.error(result.error);
 * }
 */
export const validateImageFile = (file, type = 'PROFILE') => {
  return new Promise((resolve) => {
    // Step 1: Basic file validation
    if (!file || !(file instanceof File)) {
      return resolve({
        valid: false,
        error: "No valid file provided"
      });
    }

    // Step 2: MIME type validation
    const supportedTypes = Object.keys(SUPPORTED_IMAGE_TYPES);
    if (!supportedTypes.includes(file.type)) {
      return resolve({
        valid: false,
        error: `Unsupported file type: ${file.type}. Supported types: ${supportedTypes.join(', ')}`
      });
    }

    // Step 3: File size validation
    const constraints = IMAGE_CONSTRAINTS[type] || IMAGE_CONSTRAINTS.PROFILE;
    if (file.size > constraints.maxSizeBytes) {
      const maxSizeMB = (constraints.maxSizeBytes / (1024 * 1024)).toFixed(1);
      return resolve({
        valid: false,
        error: `File size too large. Maximum allowed: ${maxSizeMB}MB`
      });
    }

    // Step 4: Image dimension validation
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      // Clean up object URL
      URL.revokeObjectURL(url);
      
      // Check dimensions
      if (img.width > constraints.maxWidth || img.height > constraints.maxHeight) {
        return resolve({
          valid: false,
          error: `Image dimensions too large. Maximum: ${constraints.maxWidth}x${constraints.maxHeight}px`
        });
      }
      
      // All validations passed
      resolve({
        valid: true,
        details: {
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type,
          name: file.name
        }
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({
        valid: false,
        error: "Invalid or corrupted image file"
      });
    };
    
    img.src = url;
  });
};

/**
 * Compress Image File
 * 
 * Reduces image file size while maintaining visual quality using
 * canvas-based compression. Automatically handles different image
 * formats and applies appropriate compression settings.
 * 
 * @param {File} file - Original image file to compress
 * @param {string} type - Compression type ('PROFILE', 'THUMBNAIL', 'HIGH_RES')
 * @param {number} customQuality - Optional custom quality override (0-1)
 * @returns {Promise<File>} - Compressed image file
 * 
 * Process:
 * 1. Create image element from file
 * 2. Calculate optimal dimensions
 * 3. Draw to canvas with new dimensions
 * 4. Apply compression settings
 * 5. Convert back to File object
 * 
 * @example
 * const compressedFile = await compressImage(originalFile, 'PROFILE');
 * console.log(`Original: ${originalFile.size}, Compressed: ${compressedFile.size}`);
 */
export const compressImage = (file, type = 'PROFILE', customQuality = null) => {
  return new Promise((resolve, reject) => {
    const constraints = IMAGE_CONSTRAINTS[type] || IMAGE_CONSTRAINTS.PROFILE;
    const quality = customQuality || constraints.quality;
    
    // Create image element
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      const maxWidth = constraints.maxWidth;
      const maxHeight = constraints.maxHeight;
      
      // Scale down if necessary
      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        
        if (width > height) {
          width = maxWidth;
          height = width / aspectRatio;
        } else {
          height = maxHeight;
          width = height * aspectRatio;
        }
      }
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob with compression
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Image compression failed'));
            return;
          }
          
          // Create new File object with compressed data
          const compressedFile = new File(
            [blob],
            file.name,
            { type: blob.type, lastModified: Date.now() }
          );
          
          resolve(compressedFile);
        },
        file.type,
        quality
      );
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };
    
    // Load image from file
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Generate Image Preview
 * 
 * Creates a data URL preview of an image file for immediate display
 * in the UI before upload completion. Handles various file formats
 * and provides error fallbacks.
 * 
 * @param {File} file - Image file to preview
 * @returns {Promise<string>} - Data URL string for preview
 * 
 * @example
 * const previewUrl = await generateImagePreview(file);
 * document.getElementById('preview').src = previewUrl;
 */
export const generateImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Invalid image file'));
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    
    // Read file as data URL
    reader.readAsDataURL(file);
  });
};

/**
 * Upload Image to Server
 * 
 * Handles the complete image upload process including validation,
 * compression, and server communication. Provides progress tracking
 * and comprehensive error handling.
 * 
 * @param {File} file - Image file to upload
 * @param {object} options - Upload configuration
 * @param {string} options.type - Image type ('PROFILE', 'THUMBNAIL', 'HIGH_RES')
 * @param {function} options.onProgress - Progress callback function
 * @param {boolean} options.compress - Whether to compress before upload
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 * 
 * Process:
 * 1. Validate image file
 * 2. Compress if requested
 * 3. Create FormData for upload
 * 4. Send to server with progress tracking
 * 5. Handle server response
 * 
 * @example
 * const result = await uploadImageToServer(file, {
 *   type: 'PROFILE',
 *   compress: true,
 *   onProgress: (percent) => console.log(`Upload: ${percent}%`)
 * });
 */
export const uploadImageToServer = async (file, options = {}) => {
  const {
    type = 'PROFILE',
    onProgress = () => {},
    compress = true
  } = options;
  
  try {
    // Step 1: Validate image
    const validation = await validateImageFile(file, type);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error
      };
    }
    
    // Step 2: Compress if requested
    let uploadFile = file;
    if (compress) {
      uploadFile = await compressImage(file, type);
    }
    
    // Step 3: Create FormData
    const formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('type', type);
    formData.append('originalName', file.name);
    
    // Step 4: Upload to server
    const response = await axiosInstance.post('/api/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      },
    });
    
    // Step 5: Handle success response
    return {
      success: true,
      data: response.data
    };
    
  } catch (error) {
    // Handle various error types
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data.message || 'Upload failed'
      };
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: 'Network error - please check your connection'
      };
    } else {
      // Other error
      return {
        success: false,
        error: error.message || 'Unknown upload error'
      };
    }
  }
};

/**
 * Convert File to Base64
 * 
 * Converts an image file to base64 string for storage or transmission.
 * Useful for embedding images directly in data or for preview purposes.
 * 
 * @param {File} file - File to convert
 * @returns {Promise<string>} - Base64 encoded string
 * 
 * @example
 * const base64 = await fileToBase64(imageFile);
 * localStorage.setItem('userAvatar', base64);
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      // Remove data URL prefix to get pure base64
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to convert file to base64'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Convert Base64 to File
 * 
 * Converts a base64 string back to a File object. Useful for
 * reconstructing files from stored data or API responses.
 * 
 * @param {string} base64 - Base64 encoded string
 * @param {string} filename - Desired filename
 * @param {string} mimeType - File MIME type
 * @returns {File} - Reconstructed File object
 * 
 * @example
 * const file = base64ToFile(base64String, 'avatar.jpg', 'image/jpeg');
 */
export const base64ToFile = (base64, filename, mimeType = 'image/jpeg') => {
  // Convert base64 to binary
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  
  return new File([blob], filename, {
    type: mimeType,
    lastModified: Date.now()
  });
};

/**
 * Batch Upload Images
 * 
 * Handles uploading multiple images with progress tracking
 * and error handling for each individual file.
 * 
 * @param {File[]} files - Array of image files to upload
 * @param {object} options - Upload configuration
 * @returns {Promise<Array>} - Array of upload results
 * 
 * @example
 * const results = await batchUploadImages(fileArray, {
 *   type: 'THUMBNAIL',
 *   onProgress: (index, percent) => updateProgress(index, percent)
 * });
 */
export const batchUploadImages = async (files, options = {}) => {
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const result = await uploadImageToServer(file, {
        ...options,
        onProgress: (percent) => {
          if (options.onProgress) {
            options.onProgress(i, percent);
          }
        }
      });
      
      results.push({
        file: file.name,
        index: i,
        ...result
      });
      
    } catch (error) {
      results.push({
        file: file.name,
        index: i,
        success: false,
        error: error.message
      });
    }
  }
  
  return results;
};

/**
 * Get Image Dimensions
 * 
 * Retrieves the dimensions of an image file without fully loading it.
 * Useful for validation and layout calculations.
 * 
 * @param {File} file - Image file to measure
 * @returns {Promise<{width: number, height: number}>}
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.width,
        height: img.height
      });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
};

/**
 * Format File Size
 * 
 * Converts file size in bytes to human-readable format
 * 
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted size string
 * 
 * @example
 * formatFileSize(1024768) // "1.0 MB"
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

/**
 * Usage Guidelines:
 * 
 * 1. File Validation:
 *    - Always validate files before processing
 *    - Use appropriate size constraints for different use cases
 *    - Handle validation errors gracefully with user feedback
 * 
 * 2. Image Compression:
 *    - Compress large images to improve upload speed
 *    - Choose quality settings based on use case
 *    - Profile pictures: 0.8 quality, Thumbnails: 0.9, High-res: 0.95
 * 
 * 3. Progress Tracking:
 *    - Implement progress callbacks for better UX
 *    - Show file names and individual progress for batch uploads
 *    - Handle network interruptions gracefully
 * 
 * 4. Error Handling:
 *    - Provide clear error messages to users
 *    - Implement retry mechanisms for failed uploads
 *    - Log errors for debugging purposes
 * 
 * 5. Performance:
 *    - Use compression for large files
 *    - Implement lazy loading for image previews
 *    - Consider using web workers for heavy processing
 */