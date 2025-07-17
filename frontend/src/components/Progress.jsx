/**
 * @fileoverview Progress Indicator Component
 * 
 * A flexible progress indicator component that displays progress using a series
 * of dots/circles. Commonly used for skill levels, completion status, ratings,
 * and other measurable progress indicators in the resume builder application.
 * 
 * @author Resume Builder Team
 * @since 1.0.0
 * 
 * Key Features:
 * - Dot-based visual progress representation
 * - Customizable colors for active and inactive states
 * - Configurable total number of progress indicators
 * - Smooth CSS transitions for state changes
 * - Responsive design with Tailwind CSS
 * 
 * Design Characteristics:
 * - Small circular indicators (8x8px)
 * - Consistent spacing between dots (6px gap)
 * - Smooth transition animations
 * - High contrast color scheme
 * 
 * @example
 * ```jsx
 * // Basic usage for skill level
 * <Progress progress={3} total={5} />
 * 
 * // Custom colors
 * <Progress 
 *   progress={4} 
 *   total={5} 
 *   color="#3b82f6" 
 *   bgColor="#e5e7eb" 
 * />
 * ```
 */

import React from 'react'

/**
 * Progress Indicator Component
 * 
 * Displays a visual progress indicator using a series of circular dots.
 * Each dot represents a unit of progress, with filled dots indicating
 * completed/achieved progress and empty dots showing remaining capacity.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.progress=0] - Current progress value (number of filled dots)
 * @param {number} [props.total=5] - Total number of progress indicators to display
 * @param {string} [props.color] - Custom color for active/filled progress dots
 * @param {string} [props.bgColor] - Custom color for inactive/empty progress dots
 * 
 * @returns {JSX.Element} A horizontal row of progress indicator dots
 * 
 * @example
 * ```jsx
 * // Display 3 out of 5 skill level
 * <Progress progress={3} total={5} />
 * 
 * // Custom styled progress with blue theme
 * <Progress 
 *   progress={4} 
 *   total={5} 
 *   color="#3b82f6" 
 *   bgColor="#e5e7eb" 
 * />
 * 
 * // Language proficiency indicator
 * <Progress 
 *   progress={2} 
 *   total={4} 
 *   color="#10b981" 
 *   bgColor="#f3f4f6" 
 * />
 * ```
 */
const Progress = ({progress = 0, total = 5, color, bgColor}) => {
  return (
    <div className='flex gap-1.5'>
      {/* Generate array of progress dots based on total count */}
      {[...Array(total)].map((_, index) => (
        <div 
          key={index} 
          className={`w-2 h-2 rounded transition-all ${
            index < progress ? 'bg-cyan-500' : 'bg-cyan-100'
          }`}
          style={{
            // Apply custom colors if provided, otherwise use default rgba values
            backgroundColor: index < progress 
              ? color || "rgba(1,1,1,1)"     // Active dot: custom color or black
              : bgColor || "rgba(1,1,1,0.1)", // Inactive dot: custom color or light gray
          }}
        >
        </div>
      ))}
    </div>
    
  )
}

export default Progress