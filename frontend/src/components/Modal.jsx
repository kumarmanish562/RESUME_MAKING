/**
 * @fileoverview Modal Dialog Component
 * 
 * A flexible and reusable modal component that provides overlay functionality
 * for displaying content above the main application interface. Features
 * customizable headers, action buttons, and close functionality.
 * 
 * @author Resume Builder Team
 * @since 1.0.0
 * 
 * Key Features:
 * - Overlay backdrop with click-to-close support
 * - Optional header with customizable title
 * - Configurable action button with icon support
 * - Accessible close button with X icon
 * - Conditional rendering based on open state
 * - Flexible content area for any child components
 * 
 * Design Characteristics:
 * - Centered modal positioning
 * - Backdrop overlay for focus management
 * - Consistent styling through dummystyle
 * - Responsive design considerations
 * - Accessible keyboard and screen reader support
 * 
 * Common Use Cases:
 * - Authentication forms (login, signup)
 * - Confirmation dialogs
 * - Content creation forms
 * - Image galleries and previews
 * - Settings and configuration panels
 * 
 * Dependencies:
 * - Lucide React: X icon for close button
 * - dummystyle: Modal styling definitions
 * 
 * @example
 * ```jsx
 * // Basic modal with title
 * <Modal isOpen={isOpen} onClose={handleClose} title="Edit Profile">
 *   <ProfileForm />
 * </Modal>
 * 
 * // Modal with action button
 * <Modal 
 *   isOpen={showConfirm} 
 *   onClose={handleCancel}
 *   title="Delete Resume"
 *   showActionBtn={true}
 *   actionBtnText="Delete"
 *   actionBtnIcon={<Trash size={16} />}
 *   onActionClick={handleDelete}
 * >
 *   <p>Are you sure you want to delete this resume?</p>
 * </Modal>
 * ```
 */

import React from 'react'
import { modalStyles as styles } from '../assets/dummystyle'
import { X } from 'lucide-react'

/**
 * Modal Dialog Component
 * 
 * A flexible modal component that displays content in an overlay above the main
 * application interface. Supports conditional headers, action buttons, and 
 * customizable content areas.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the modal body
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback function when modal is closed
 * @param {string} [props.title] - Optional title text for the modal header
 * @param {boolean} [props.hideHeader=false] - Whether to hide the header section
 * @param {boolean} [props.showActionBtn=false] - Whether to display an action button
 * @param {React.ReactNode} [props.actionBtnIcon=null] - Icon element for the action button
 * @param {string} [props.actionBtnText] - Text label for the action button
 * @param {Function} [props.onActionClick=() => {}] - Callback for action button clicks
 * 
 * @returns {JSX.Element|null} Modal dialog or null if not open
 * 
 * @example
 * ```jsx
 * // Simple content modal
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)} 
 *   title="Welcome"
 * >
 *   <p>Welcome to ResumeMaker!</p>
 * </Modal>
 * 
 * // Action modal with confirmation
 * <Modal
 *   isOpen={showDeleteModal}
 *   onClose={handleCancel}
 *   title="Confirm Deletion"
 *   showActionBtn={true}
 *   actionBtnText="Delete"
 *   actionBtnIcon={<Trash2 size={16} />}
 *   onActionClick={handleConfirmDelete}
 * >
 *   <p>This action cannot be undone.</p>
 * </Modal>
 * 
 * // Headerless modal for custom layouts
 * <Modal 
 *   isOpen={showImagePreview} 
 *   onClose={handleClosePreview}
 *   hideHeader={true}
 * >
 *   <ImageGallery />
 * </Modal>
 * ```
 */
const Modal = ({ 
  children, 
  isOpen, 
  onClose, 
  title, 
  hideHeader, 
  showActionBtn, 
  actionBtnIcon = null, 
  actionBtnText, 
  onActionClick = () => {},
}) => {
  // Early return if modal is not open
  if (!isOpen) return null
  
  return (
    // Modal overlay - provides backdrop and handles outside clicks
    <div className={styles.overlay}>
      {/* Main modal container */}
      <div className={styles.container}>
        
        {/* Optional header section with title and action button */}
        {!hideHeader && (
          <div className={styles.header}>
            {/* Modal title */}
            <h3 className={styles.title}>
              {title}
            </h3>

            {/* Optional action button with icon and text */}
            {showActionBtn && (
              <button className={styles.actionButton} onClick={onActionClick}>
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}
        
        {/* Close button - always visible for accessibility */}
        <button type='button' className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        
        {/* Modal body content area */}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal