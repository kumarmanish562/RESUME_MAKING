/**
 * @fileoverview Theme Selector Component for Resume Builder Application
 * 
 * This component provides a comprehensive interface for users to browse, preview, and select
 * different resume templates. It features a responsive grid layout with template thumbnails
 * on the left and a live preview of the selected template on the right.
 * 
 * Key Features:
 * - Interactive template selection with thumbnail previews
 * - Real-time resume preview with user's data
 * - Responsive design that adapts to different screen sizes
 * - Dynamic width calculation for optimal preview rendering
 * - Smooth transitions and hover effects for better UX
 * 
 * Usage:
 * ```jsx
 * <ThemeSelector
 *   selectedTheme="template-1"
 *   setSelectedTheme={setTheme}
 *   resumeData={userResumeData}
 *   onClose={handleModalClose}
 * />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

import React, { useEffect, useRef, useState } from 'react'
import { DUMMY_RESUME_DATA, resumeTemplates } from '../utils/data'
import Tabs from './Tabs'
import { Check } from 'lucide-react'
import { TemplateCard } from './Cards'
import RenderResume from './RenderResume'

/**
 * Tab configuration for the theme selector interface
 * @constant {Array<Object>} TAB_DATA
 */
const TAB_DATA = [{ label: 'Templates' }]

/**
 * ThemeSelector Component
 * 
 * A comprehensive theme selection interface that allows users to browse available
 * resume templates and see live previews of how their data will look with each template.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.selectedTheme - Currently selected theme ID
 * @param {Function} props.setSelectedTheme - Function to update the selected theme
 * @param {Object} props.resumeData - User's resume data for preview
 * @param {Function} props.onClose - Function to close the theme selector modal
 * 
 * @returns {JSX.Element} The theme selector interface
 * 
 * @example
 * ```jsx
 * const [currentTheme, setCurrentTheme] = useState('template-1');
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * 
 * <ThemeSelector
 *   selectedTheme={currentTheme}
 *   setSelectedTheme={setCurrentTheme}
 *   resumeData={userResumeData}
 *   onClose={() => setIsModalOpen(false)}
 * />
 * ```
 */
const ThemeSelector = ({ selectedTheme, setSelectedTheme, resumeData, onClose }) => {
  // Reference to the resume preview container for width calculations
  const resumeRef = useRef(null)
  
  // State for tracking the container width for responsive preview rendering
  const [baseWidth, setBaseWidth] = useState(800);

  // Find the initial template index based on the selected theme ID
  const initialIndex = resumeTemplates.findIndex(t => t.id === selectedTheme);
  
  /**
   * State for managing the currently selected template
   * Includes both the theme ID and array index for efficient lookup
   */
  const [selectedTemplate, setSelectedTemplate] = useState({
    theme: selectedTheme || resumeTemplates[0]?.id || '',
    index: initialIndex >= 0 ? initialIndex : 0
  })

  // State for managing the active tab (currently only Templates tab is available)
  const [tabValue, setTabValue] = useState('Templates');

  /**
   * Handles the theme selection confirmation
   * Updates the parent component's theme state and closes the modal
   * 
   * @function handleThemeSeclection
   */
  const handleThemeSeclection = () => {
    setSelectedTheme(selectedTemplate.theme)
    onClose();
  }

  /**
   * Updates the base width for the preview container
   * Used for responsive rendering of the resume preview
   * 
   * @function updateBaseWidth
   */
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  }

  /**
   * Effect hook for setting up responsive width calculations
   * Adds resize event listener to update preview dimensions
   */
  useEffect(() => {
    updateBaseWidth();
    window.addEventListener('resize', updateBaseWidth);
    return () => {
      window.removeEventListener('resize', updateBaseWidth);
    };
  }, []);

  return (
    <div className='max-w-7xl mx-auto p-4'>
      {/* Header section with tabs and apply button */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-s8 p-4 sm:p-6 bg-gradient-to-r from-white  to-violet-50 rounded-2xl border border-violet-100 '>

        <Tabs tabs={TAB_DATA} activeTab={tabValue} setTabValue={setTabValue} />

        {/* Apply changes button with gradient styling and hover effects */}
        <button className='w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-2xl hover:scale-105 trasnition-all shadow-lg hover:shadow-xl' onClick={handleThemeSeclection}>
          <Check size={18} />
          Apply Changes
        </button>
      </div>
      
      {/* Main content grid with template selection and preview */}
      <div className='grid grid-cols-1  lg:grid-cols-5 gap-6 lg:gap-8'>
        
        {/* Left panel: Template selection grid */}
        <div className='lg:col-span-2 bg-white rounded-xl border border-gray-100 p-4 sm:p-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2  gap-4 max-h-[60vh]  lg:max-h-[70vh] overflow-auto-2' >
            {resumeTemplates.map((template, index) => (
              <TemplateCard key={`template-${index}`}
                thumbnailImg={template.thumbnailImg}
                isSelected={selectedTemplate.index === index}
                onSelect={() => setSelectedTemplate({ theme: template.id, index })}
              />
            ))}
          </div>
        </div>

        {/* Right panel: Live resume preview */}
        <div className='lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 ' ref={resumeRef}>
          <RenderResume
            templateId={selectedTemplate?.theme || ""}
            resumeData={resumeData || DUMMY_RESUME_DATA }
            containerWidth={baseWidth}
          />
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector