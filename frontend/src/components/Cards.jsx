/**
 * @fileoverview Cards Component Library
 * Collection of card components for the resume builder application including
 * profile information cards, resume summary cards, and template selection cards.
 * 
 * @requires React
 * @requires lucide-react
 * @requires react-router-dom
 * @requires UserContext
 * @requires dummystyle
 */

// Profile INFO Cards

import { Award, Check, Clock, Edit, Trash2, TrendingUp, User, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { cardStyles } from "../assets/dummystyle";

/**
 * ProfileInfoCard Component
 * 
 * Displays user profile information with logout functionality.
 * Shows user's name initial and provides logout button.
 * 
 * @component
 * @returns {JSX.Element|null} Profile card with user info and logout button, or null if no user
 * 
 * @example
 * ```jsx
 * <ProfileInfoCard />
 * ```
 */
export const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);
  
  /**
   * Handles user logout process
   * Clears local storage, user context, and navigates to home page
   */
  const handleLogout = () => {
    localStorage.clear
    clearUser();
    navigate("/");
  };
  
  return (
    user && (
    <div className={cardStyles.profileCard}>
  {/* User initial display */}
  <div className={cardStyles.profileInitialsContainer}>
    <span className={cardStyles.profileInitialsText}>
      {user.name ? user.name.charAt(0).toUpperCase() : ""}
    </span>
  </div>
  <div>
    {/* User name display */}
    <div className={cardStyles.profileName}>
      {user.name || ""}
    </div>
    {/* Logout button */}
    <button className={cardStyles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  </div>
</div>

    )
  )
}
  

/**
 * ResumeSummaryCard Component
 * 
 * Displays resume information including title, dates, completion status,
 * and provides edit/delete functionality with hover interactions.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title="Untitled Resume"] - Resume title
 * @param {string|null} [props.createdAt=null] - Resume creation date
 * @param {string|null} [props.updatedAt=null] - Resume last update date
 * @param {Function} props.onSelect - Callback function when resume is selected
 * @param {Function} props.onDelete - Callback function when resume is deleted
 * @param {number} [props.completion=85] - Resume completion percentage (0-100)
 * @returns {JSX.Element} Resume summary card with interactive elements
 * 
 * @example
 * ```jsx
 * <ResumeSummaryCard
 *   title="Software Engineer Resume"
 *   createdAt="2023-01-15"
 *   updatedAt="2023-01-20"
 *   completion={75}
 *   onSelect={() => handleSelect()}
 *   onDelete={() => handleDelete()}
 * />
 * ```
 */
// ResumeSummaryCard Component
export const ResumeSummaryCard = ({
  title = "Untitled Resume",
  createdAt = null,
  updatedAt = null,
  onSelect,
  onDelete,
  completion = 85,
}) => {
  // State for managing hover interactions
  const [isHovered, setIsHovered] = useState(false);

  // Format creation date for display
  const formattedCreatedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";


  
  // Format update date for display
  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";

  /**
   * Gets completion status color based on percentage
   * @returns {string} CSS class for completion color
   */
  // color for completion status
  const getCompletionColor = () => {
    if (completion >= 90) return cardStyles.completionHigh;
    if (completion >= 70) return cardStyles.completionMedium;
    return cardStyles.completionLow;
  };

  /**
   * Gets appropriate icon for completion status
   * @returns {JSX.Element} Icon component based on completion percentage
   */
  const getCompletionIcon = () => {
    if (completion >= 90) return <Award size={12} />;
    if (completion >= 70) return <TrendingUp size={12} />;
    return <Zap size={12} />;
  };

  /**
   * Handles resume deletion with event propagation prevention
   * @param {Event} e - Click event
   */
  //deletion of resume
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  /**
   * Generates background color design based on title
   * @returns {string} Gradient CSS class for card background
   */
  const generateDesign = () => {
    const colors = [
      "from-blue-50 to-blue-100",
      "from-purple-50 to-purple-100",
      "from-emerald-50 to-emerald-100",
      "from-amber-50 to-amber-100",
      "from-rose-50 to-rose-100"
    ];
    return colors[title.length % colors.length];
  };

  const designColor = generateDesign();

  return (
    <div
      className={cardStyles.resumeCard}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion indicator */}
      <div className={cardStyles.completionIndicator}>
        <div className={`${cardStyles.completionDot} bg-gradient-to-r ${getCompletionColor()}`}>
          <div className={cardStyles.completionDotInner} />
        </div>
        <span className={cardStyles.completionPercentageText}>{completion}%</span>
        {getCompletionIcon()}
      </div>

      {/* Preview area */}
      <div className={`${cardStyles.previewArea} bg-gradient-to-br ${designColor}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cardStyles.emptyPreviewIcon}>
            <Edit size={28} className="text-indigo-600" />
          </div>
          <span className={cardStyles.emptyPreviewText}>{title}</span>
          <span className={cardStyles.emptyPreviewSubtext}>
            {completion === 0 ? "Start building" : `${completion}% completed`}
          </span>

          {/* Mini resume sections indicator */}
          <div className="mt-4 flex gap-2">
            {['Profile', 'Work', 'Skills', 'Edu'].map((section, i) => (
              <div
                key={i}
                className={`px-2 py-1 text-xs rounded-md ${i < Math.floor(completion / 25)
                  ? 'bg-white/90 text-indigo-600 font-medium'
                  : 'bg-white/50 text-gray-500'
                  }`}
              >
                {section}
              </div>
            ))}
          </div>
        </div>

        {/* Hover overlay with action buttons */}
        {isHovered && (
          <div className={cardStyles.actionOverlay}>
            <div className={cardStyles.actionButtonsContainer}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelect) onSelect();
                }}
                className={cardStyles.editButton}
                title="Edit"
              >
                <Edit size={18} className={cardStyles.buttonIcon} />
              </button>
              <button
                onClick={handleDeleteClick}
                className={cardStyles.deleteButton}
                title="Delete"
              >
                <Trash2 size={18} className={cardStyles.buttonIcon} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className={cardStyles.infoArea}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h5 className={cardStyles.title}>{title}</h5>
            <div className={cardStyles.dateInfo}>
              <Clock size={12} />
              <span>Created At: {formattedCreatedDate}</span>
              <span className="ml-2">Updated At: {formattedUpdatedDate}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getCompletionColor()} rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
            style={{ width: `${completion}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
          <div
            className={`absolute top-0 h-full w-4 bg-gradient-to-r from-transparent to-white/50 blur-sm transition-all duration-700`}
            style={{ left: `${Math.max(0, completion - 2)}%` }}
          ></div>
        </div>

        {/* Completion status */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-medium text-gray-500">
            {completion < 50 ? "Getting Started" : completion < 80 ? "Almost There" : "Ready to Go!"}
          </span>
          <span className="text-xs font-bold text-gray-700">{completion}% Complete</span>
        </div>
      </div>
    </div>
  );
};

/**
 * TemplateCard Component
 * 
 * Displays resume template preview with selection functionality.
 * Shows template thumbnail image or placeholder with selection indicators.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.thumbnailImg - URL of the template thumbnail image
 * @param {boolean} props.isSelected - Whether this template is currently selected
 * @param {Function} props.onSelect - Callback function when template is selected
 * @returns {JSX.Element} Template card with preview and selection state
 * 
 * @example
 * ```jsx
 * <TemplateCard
 *   thumbnailImg="/templates/template1.png"
 *   isSelected={false}
 *   onSelect={() => handleTemplateSelect()}
 * />
 * ```
 */
//Template Cards
export const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div className={`group h-auto md:h-[300px] lg:h-[320px] flex flex-col bg-white border-2 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-lg rounded-3xl ${
      isSelected ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-50' : 'border-gray-200 hover:border-cyan-300'}`} onClick={onSelect}>
        {/* Template thumbnail or placeholder */}
        {thumbnailImg ? (
          <div className="relative w-full h-full overflow-hidden">
            {/* Template preview image */}
            <img src={thumbnailImg ||  'placeholder.svg'} alt= "Template Review" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center ">
                  <div className="w-8 h-8 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Check size={24} className="text-cyan-600" />
                  </div>
                </div>
              )}
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">   
              </div>
          </div>
        ) : (
          /* Placeholder when no thumbnail available */
          <div className="w-full h-[200px] flex items-center justify-center bg-gradient-to-r from-cyan-50 via-cyan-600 to-blue-50">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-3">
              <Edit size={20} className="text-white" />
            </div>
            <span className="text-gray-700 font-bold">No Preview Available
            </span>
          </div>
        )
      }
    </div>
  );
};
