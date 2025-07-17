/**
 * Dashboard Component
 * 
 * Main dashboard page for the Resume Maker application that displays all user resumes
 * in a grid layout with options to create, edit, and delete resumes. Features include
 * resume completion tracking, search functionality, and responsive design.
 * 
 * Key Features:
 * - Resume grid display with thumbnails
 * - Resume completion percentage calculation
 * - Create new resume modal
 * - Delete confirmation dialog
 * - Loading states and empty state handling
 * - Responsive design with modern UI
 * 
 * Dependencies:
 * - React Router: For navigation between pages
 * - Axios: For API calls to backend
 * - Moment.js: For date formatting and calculations
 * - React Hot Toast: For user notifications
 * - Lucide React: For icons
 * 
 * @fileoverview Dashboard page component for resume management
 * @version 1.0.0
 */

import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../components/DashboardLayout'; // Layout wrapper with navigation
import { dashboardStyles as styles } from '../assets/dummystyle'; // Styled components/classes
import { useNavigate } from 'react-router-dom'; // React Router navigation hook
import { LucideFilePlus, LucideTrash } from 'lucide-react'; // Icons for UI actions
import { ResumeSummaryCard } from '../components/Cards'; // Resume card component
import axiosInstance from '../utils/axiosInstance'; // Configured axios client
import { API_PATHS } from '../utils/apiPath'; // API endpoint constants
import { toast } from 'react-hot-toast'; // Toast notifications
import moment from 'moment'; // Date manipulation library
import Modal from '../components/Modal'; // Modal component
import CreateResumeForm from '../components/CreateResumeForm'; // Resume creation form

/**
 * Dashboard Component
 * 
 * Main dashboard page that serves as the central hub for resume management.
 * Provides overview of all user resumes with CRUD operations.
 * 
 * @returns {JSX.Element} Dashboard page component
 */
const Dashboard = () => {
  // Navigation hook for programmatic routing
  const navigate = useNavigate();
  
  // State Management
  const [openCreateModal, setOpenCreateModal] = useState(false); // Controls create resume modal visibility
  const [allResumes, setAllResumes] = useState([]); // Stores all user resumes
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [resumeToDelete, setResumeToDelete] = useState(null); // ID of resume selected for deletion
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Controls delete confirmation modal

  /**
   * Calculate Resume Completion Percentage
   * 
   * Analyzes a resume object and calculates what percentage of fields are completed.
   * This helps users understand how much of their resume they've filled out and
   * encourages them to complete missing sections.
   * 
   * @param {Object} resume - Resume object to analyze
   * @returns {number} Completion percentage (0-100)
   * 
   * Calculation Logic:
   * 1. Count total possible fields across all sections
   * 2. Count actually filled fields (non-empty values)
   * 3. Calculate percentage: (completed/total) * 100
   * 
   * Sections analyzed:
   * - Profile Info: fullName, designation, summary
   * - Contact Info: email, phone
   * - Work Experience: company, role, startDate, endDate, description (per entry)
   * - Education: degree, institution, startDate, endDate (per entry)
   * - Skills: name, progress (per entry)
   * - Projects: title, description, github, liveDemo (per entry)
   * - Certifications: title, issuer, year (per entry)
   * - Languages: name, progress (per entry)
   * - Interests: each non-empty interest
   */
  const calculateCompletion = (resume) => {
    let completedFields = 0; // Counter for filled fields
    let totalFields = 0; // Counter for all possible fields

    // Profile Information Section (3 fields)
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Information Section (2 fields)
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience Section (5 fields per entry)
    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education Section (4 fields per entry)
    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills Section (2 fields per entry)
    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects Section (4 fields per entry)
    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications Section (3 fields per entry)
    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages Section (2 fields per entry)
    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests Section (1 field per interest)
    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== '')?.length || 0);

    // Calculate and return percentage (rounded to nearest integer)
    return Math.round((completedFields / totalFields) * 100);
  };

  /**
   * Fetch All User Resumes
   * 
   * Retrieves all resumes for the current user from the backend API.
   * Adds completion percentage to each resume and updates the state.
   * Handles loading states and error scenarios gracefully.
   * 
   * Wrapped in useCallback to prevent unnecessary re-renders when used
   * as a dependency in useEffect.
   * 
   * @async
   * @function fetchAllResumes
   * 
   * Process:
   * 1. Set loading state to true
   * 2. Make API call to get all resumes
   * 3. Calculate completion percentage for each resume
   * 4. Update state with enhanced resume data
   * 5. Handle errors and set loading to false
   */
  const fetchAllResumes = useCallback(async () => {
    try {
      setLoading(true); // Show loading spinner
      
      // Fetch resumes from backend API
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      
      // Enhance each resume with completion percentage
      const resumesWithCompletion = response.data.map(resume => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));
      
      // Update state with enhanced data
      setAllResumes(resumesWithCompletion);
    } catch (error) {
      // Log error for debugging (could also show toast notification)
      console.error('Error fetching resumes:', error);
      // Could add: toast.error('Failed to load resumes');
    } finally {
      // Always hide loading spinner
      setLoading(false);
    }
  }, []); // Empty dependencies since it only uses stable functions

  /**
   * Effect Hook: Fetch Resumes on Component Mount
   * 
   * Automatically fetches all user resumes when the dashboard loads.
   * We include fetchAllResumes in dependencies but wrap it in useCallback
   * to prevent infinite re-renders.
   */
  useEffect(() => {
    fetchAllResumes();
  }, [fetchAllResumes]); // Include fetchAllResumes in dependencies

  /**
   * Handle Resume Deletion
   * 
   * Deletes the selected resume from the backend and updates the UI.
   * Shows success/error notifications and refreshes the resume list.
   * 
   * @async
   * @function handleDeleteResume
   * 
   * Process:
   * 1. Validate that a resume is selected for deletion
   * 2. Make API call to delete the resume
   * 3. Show success notification
   * 4. Refresh the resume list
   * 5. Handle errors with error notifications
   * 6. Clean up state and close modal
   */
  const handleDeleteResume = async () => {
    // Ensure a resume is selected for deletion
    if (!resumeToDelete) return;
    
    try {
      // Make API call to delete the resume
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      
      // Show success notification to user
      toast.success('Resume deleted successfully');
      
      // Refresh the resume list to reflect deletion
      fetchAllResumes();
    } catch (error) {
      // Show error notification with specific error message
      toast.error('Error deleting resume: ' + error.message);
    } finally {
      // Clean up state regardless of success/failure
      setResumeToDelete(null); // Clear selected resume
      setShowDeleteConfirm(false); // Close confirmation modal
    }
  };

  /**
   * Handle Delete Button Click
   * 
   * Initiates the deletion process by setting up the confirmation modal.
   * Stores the resume ID and shows the confirmation dialog.
   * 
   * @param {string} id - ID of the resume to delete
   */
  const handleDeleteClick = (id) => {
    setResumeToDelete(id); // Store resume ID for deletion
    setShowDeleteConfirm(true); // Show confirmation modal
  };

  // Render the dashboard UI
  return (
    <DashboardLayout>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerWrapper}>
          <div>
            {/* Page Title */}
            <h1 className={styles.headerTitle}>My Resume</h1>
            
            {/* Dynamic Subtitle based on resume count */}
            <p className={styles.headerSubtitle}>
              {allResumes.length > 0
                ? `You have ${allResumes.length} resume${allResumes.length !== 1 ? 's' : ''}.`
                : 'Start building your professional resume now!'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4'>
            <button 
              className={styles.createButton} 
              onClick={() => setOpenCreateModal(true)}
              aria-label="Create new resume"
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Now
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={18} />
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* Empty State - No Resumes */}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus className='text-violet-600' size={32} />
            </div>
            <h3 className={styles.emptyTitle}>No Resumes Yet</h3>
            <p className={styles.emptyText}>
              You haven't created any resumes yet. Start building your professional resume now!
            </p>
            <button 
              className={styles.createButton} 
              onClick={() => setOpenCreateModal(true)}
              aria-label="Create your first resume"
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Your First Resume
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={20} />
              </span>
            </button>
          </div>
        )}

        {/* Resume Grid - When resumes exist */}
        {!loading && allResumes.length > 0 && (
          <div className={styles.grid}>
            {/* Create New Resume Card */}
            <div 
              className={styles.newResumeCard} 
              onClick={() => setOpenCreateModal(true)}
              role="button"
              tabIndex={0}
              aria-label="Create new resume"
            >
              <div className={styles.newResumeIcon}>
                <LucideFilePlus className='text-white' size={32} />
              </div>
              <h3 className={styles.newResumeTitle}>Create New Resume</h3>
              <p className={styles.newResumeText}>Start building career</p>
            </div>

            {/* Existing Resume Cards */}
            {allResumes.map((resume) => (
              <ResumeSummaryCard
                key={resume._id}
                imgUrl={resume.thumbnailLink} // Resume thumbnail image
                title={resume.title} // Resume title
                createdAt={resume.createdAt} // Creation date
                updatedAt={resume.updatedAt} // Last update date
                onSelect={() => navigate(`/resume/${resume._id}`)} // Navigate to edit page
                onDelete={() => handleDeleteClick(resume._id)} // Delete handler
                completion={resume.completion || 0} // Completion percentage
                isPremium={resume.isPremium} // Premium status
                isNew={moment().diff(moment(resume.createdAt), 'days') < 7} // New badge if created < 7 days ago
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Resume Modal */}
      <Modal 
        isOpen={openCreateModal} 
        onClose={() => setOpenCreateModal(false)}
        hideHeader 
        maxWidth='max-w-2xl'
        aria-labelledby="create-resume-title"
      >
        <div className='p-6'>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <h3 id="create-resume-title" className={styles.modalTitle}>
              Create New Resume
            </h3>
            <button 
              onClick={() => setOpenCreateModal(false)} 
              className={styles.modalCloseButton}
              aria-label="Close modal"
            >
              X 
            </button>
          </div>
          
          {/* Resume Creation Form */}
          <CreateResumeForm 
            onSuccess={() => {
              setOpenCreateModal(false); // Close modal on success
              fetchAllResumes(); // Refresh resume list
            }} 
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)} 
        title='Confirm Deletion'
        showActionBtn 
        actionBtnText='Delete' 
        actionBtnClassName='bg-red-600 hover:bg-red-700' 
        onActionClick={handleDeleteResume}
        aria-labelledby="delete-confirm-title"
      >
        <div className='p-4'>
          <div className='flex flex-col items-center text-center'>
            {/* Delete Icon */}
            <div className={styles.deleteIconWrapper}>
              <LucideTrash className='text-red-600' size={24} />
            </div>
            
            {/* Confirmation Title */}
            <h3 id="delete-confirm-title" className={styles.deleteTitle}>
              Delete Resume? 
            </h3>
            
            {/* Warning Message */}
            <p className={styles.deleteText}>
              Are you sure you want to delete this resume? This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;

/**
 * Component Usage Notes:
 * 
 * 1. State Management:
 *    - Uses React hooks for local state management
 *    - Loading states provide smooth user experience
 *    - Modal states control dialog visibility
 * 
 * 2. Data Flow:
 *    - Fetches data on component mount
 *    - Refreshes data after create/delete operations
 *    - Calculates completion percentage client-side
 * 
 * 3. User Experience:
 *    - Loading spinners during data fetching
 *    - Empty state when no resumes exist
 *    - Confirmation dialogs for destructive actions
 *    - Toast notifications for user feedback
 * 
 * 4. Accessibility:
 *    - ARIA labels for screen readers
 *    - Keyboard navigation support
 *    - Semantic HTML structure
 * 
 * 5. Performance:
 *    - Efficient re-renders with proper key props
 *    - Minimal API calls with strategic data fetching
 *    - Optimized completion calculations
 * 
 * 6. Error Handling:
 *    - Try-catch blocks for API calls
 *    - User-friendly error messages
 *    - Graceful degradation on failures
 */
