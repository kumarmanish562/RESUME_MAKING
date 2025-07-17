/**
 * @fileoverview Tabs Component for Resume Builder Application
 * 
 * This component provides a modern, responsive tab navigation system with smooth transitions
 * and interactive visual feedback. It features a clean design with gradient accents and
 * hover effects that enhance the user experience across different screen sizes.
 * 
 * Key Features:
 * - Responsive design that adapts to mobile and desktop screens
 * - Smooth transition animations between tab states
 * - Interactive hover effects with semi-transparent backgrounds
 * - Active tab highlighting with gradient backgrounds and dashed borders
 * - Flexible layout that supports varying numbers of tabs
 * - Professional indigo color scheme with subtle visual hierarchy
 * - Accessible button implementation with proper click handling
 * 
 * Design Characteristics:
 * - Rounded container with soft indigo background (indigo-50)
 * - Active tab: White background with indigo text and shadow
 * - Inactive tabs: Slate text with hover transitions to indigo
 * - Special active tab overlay with gradient and dashed border accent
 * - Responsive padding and font sizes for different screen breakpoints
 * - Smooth transition effects for state changes
 * 
 * Usage:
 * ```jsx
 * const [currentTab, setCurrentTab] = useState('Templates');
 * const tabData = [
 *   { label: 'Templates' },
 *   { label: 'Colors' },
 *   { label: 'Settings' }
 * ];
 * 
 * <Tabs
 *   tabs={tabData}
 *   activeTab={currentTab}
 *   setActiveTab={setCurrentTab}
 * />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

import React from 'react'

/**
 * Tabs Component
 * 
 * A modern, responsive tab navigation component with smooth animations and interactive
 * visual feedback. Provides an elegant way to switch between different content sections
 * with professional styling and accessibility features.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.tabs - Array of tab objects with label properties
 * @param {string} props.tabs[].label - The display text for each tab
 * @param {string} props.activeTab - The label of the currently active tab
 * @param {Function} props.setActiveTab - Function to update the active tab state
 * 
 * @returns {JSX.Element} The rendered tab navigation component
 * 
 * @example
 * ```jsx
 * // Basic usage with multiple tabs
 * const [selectedTab, setSelectedTab] = useState('Dashboard');
 * const navigationTabs = [
 *   { label: 'Dashboard' },
 *   { label: 'Templates' },
 *   { label: 'Settings' },
 *   { label: 'Profile' }
 * ];
 * 
 * <Tabs
 *   tabs={navigationTabs}
 *   activeTab={selectedTab}
 *   setActiveTab={setSelectedTab}
 * />
 * 
 * // With state management in parent component
 * const handleTabChange = (tabLabel) => {
 *   setSelectedTab(tabLabel);
 *   // Additional logic for tab switching
 *   loadTabContent(tabLabel);
 * };
 * 
 * <Tabs
 *   tabs={tabs}
 *   activeTab={activeTab}
 *   setActiveTab={handleTabChange}
 * />
 * ```
 */
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className='w-full my-2'>
      <div className='flex flex-wrap bg-indigo-50 p-1 rounded-2xl border border-indigo-100'>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative flex-1 sm:flex-none py-2 sm:py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === tab.label
                ? 'bg-white text-indigo-700 shadow-lg' // Active tab styling
                : 'text-slate-500 hover:text-indigo-600 hover:bg-white/50' // Inactive tab with hover effects
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <span className='relative z-10'>{tab.label}</span>
            
            {/* Special active tab overlay with gradient and dashed border */}
            {activeTab === tab.label && (
              <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-xl'>
                <div className='absolute inset-0 border-2 border-dashed border-indigo-300 rounded-xl'></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs