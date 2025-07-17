/**
 * @fileoverview Resume Database Model
 * Defines the MongoDB schema for resume documents using Mongoose ODM.
 * Includes comprehensive resume structure with profile info, work experience,
 * education, skills, projects, certifications, and template settings.
 * 
 * @requires mongoose - MongoDB object modeling library
 */

import mongoose from "mongoose";

/**
 * Resume MongoDB Schema Definition
 * 
 * Comprehensive schema for storing resume data including personal information,
 * professional experience, education, skills, projects, and formatting preferences.
 * Includes automatic timestamp tracking and user ownership relationship.
 * 
 * @typedef {Object} ResumeSchema
 * @property {ObjectId} userId - Reference to the user who owns this resume
 * @property {string} title - Resume title/name for identification
 * @property {string} thumbLink - URL/path to resume thumbnail image
 * @property {Object} templates - Resume template and styling configuration
 * @property {Object} profileInfo - Personal profile information and summary
 * @property {Object} contactInfo - Contact details and social media links
 * @property {Array} workExperience - Professional work experience entries
 * @property {Array} education - Educational background entries
 * @property {Array} skills - Technical and soft skills with proficiency levels
 * @property {Array} project - Personal or professional project entries
 * @property {Array} certifications - Professional certifications and credentials
 * @property {Array} languages - Language skills with proficiency levels
 * @property {Array} interests - Personal interests and hobbies
 * @property {Date} createdAt - Timestamp of resume creation (auto-generated)
 * @property {Date} updatedAt - Timestamp of last modification (auto-generated)
 */
const resumeSchema = new mongoose.Schema({
  /**
   * User ownership reference
   * Links resume to specific user account with required relationship
   */
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true 
  },
  
  /**
   * Resume title/identifier
   * Required field for resume identification and organization
   */
  title: {
    type: String,
    required: true,
  },
  
  /**
   * Thumbnail image link
   * URL or file path to resume preview thumbnail
   */
  thumbLink: {
    type: String,
  },
  
  /**
   * Template configuration
   * Stores resume theme and color customization settings
   */
  templates: {
    theme: String,           // Selected template theme name
    colorPalette: [String],  // Array of color codes for customization
  },
  
  /**
   * Personal profile information
   * Core identity and professional summary data
   */
  profileInfo: {
    profilePreviewUrl: String,  // Profile picture URL/path
    FullName: String,          // Full legal name
    designation: String,       // Job title or professional designation
    summary: String,           // Professional summary or objective
  },

  /**
   * Contact and social media information
   * Various ways to reach the resume owner
   */
  contactInfo: {
    email: String,     // Primary email address
    phone: String,     // Phone number
    location: String,  // Geographic location (city, state)
    linkedIn: String,  // LinkedIn profile URL
    github: String,    // GitHub profile URL
    website: String,   // Personal website URL
  },

  /**
   * Professional work experience
   * Array of employment history with details
   */
  workExperience: [
    {
      company: String,     // Company/organization name
      role: String,        // Job title/position
      startDate: Date,     // Employment start date
      endDate: Date,       // Employment end date (null for current)
      description: String, // Role responsibilities and achievements
    }
  ],

  /**
   * Educational background
   * Array of academic qualifications and institutions
   */
  education: [
    {
      degree: String,      // Degree type and field of study
      institution: String, // School/university name
      startDate: Date,     // Education start date
      endDate: Date,       // Education completion date
    }
  ],

  /**
   * Technical and soft skills
   * Array of skills with proficiency ratings
   */
  skills: [
    {
      name: String,     // Skill name (e.g., "JavaScript", "Project Management")
      progress: Number, // Proficiency level (0-100 or 1-10 scale)
    }
  ],

  /**
   * Personal and professional projects
   * Array of notable projects with links and descriptions
   */
  project: [
    {
      title: String,       // Project name/title
      description: String, // Project description and technologies used
      github: String,      // GitHub repository URL
      liveDemo: String,    // Live project demonstration URL
    },
  ],

  /**
   * Professional certifications
   * Array of credentials and professional qualifications
   */
  certifications: [
    {
      title: String,  // Certification name
      issuer: String, // Issuing organization
      year: String,   // Year of certification
    }
  ],

  /**
   * Language proficiencies
   * Array of spoken languages with skill levels
   */
  languages: [
    {
      name: String,     // Language name (e.g., "English", "Spanish")
      progress: Number, // Proficiency level (0-100 or 1-10 scale)
    }
  ],

  /**
   * Personal interests and hobbies
   * Simple array of interest strings
   */
  interests: [String],
    
}, { 
  /**
   * Schema options with automatic timestamp management
   * Enables createdAt and updatedAt fields with custom names
   */
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } 
});

/**
 * Resume Mongoose Model
 * 
 * Exported model for performing database operations on resume documents.
 * Provides methods for CRUD operations, queries, and data validation.
 * 
 * @example
 * // Create new resume
 * const resume = new Resume({
 *   userId: "64a7b8c9d1e2f3a4b5c6d7e8",
 *   title: "Software Engineer Resume",
 *   profileInfo: { FullName: "John Doe", designation: "Developer" }
 * });
 * 
 * // Save to database
 * await resume.save();
 * 
 * // Find user's resumes
 * const userResumes = await Resume.find({ userId: userId });
 */
export default mongoose.model("Resume", resumeSchema);