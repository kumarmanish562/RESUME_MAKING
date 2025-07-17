/**
 * @fileoverview Navigation Bar Component
 * 
 * The main navigation component for the resume builder application featuring
 * a modern glassmorphism design with sticky positioning. Provides brand identity
 * and user profile access across all authenticated pages.
 * 
 * @author Resume Builder Team
 * @since 1.0.0
 * 
 * Key Features:
 * - Glassmorphism design with backdrop blur effect
 * - Sticky positioning for persistent navigation
 * - Responsive layout with mobile-first approach
 * - Gradient brand logo and typography
 * - Integrated user profile management
 * - High z-index for overlay positioning
 * 
 * Design Characteristics:
 * - Semi-transparent white background (70% opacity)
 * - Backdrop blur for modern glass effect
 * - Gradient brand colors (cyan to blue)
 * - Custom cursive font for brand name
 * - Consistent spacing and alignment
 * 
 * Dependencies:
 * - React Router: Link component for navigation
 * - Lucide React: LayoutTemplate icon
 * - ProfileInfoCard: User profile display component
 * 
 * @example
 * ```jsx
 * // Used at the app level for consistent navigation
 * <Navbar />
 * ```
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutTemplate } from 'lucide-react';
import { ProfileInfoCard } from './Cards';

/**
 * Navigation Bar Component
 * 
 * A sticky navigation bar that provides consistent branding and user access
 * across the application. Features a modern glassmorphism design with gradient
 * brand elements and integrated profile management.
 * 
 * @component
 * @returns {JSX.Element} A sticky navigation bar with brand logo and profile access
 * 
 * @example
 * ```jsx
 * // App-level navigation
 * function App() {
 *   return (
 *     <div>
 *       <Navbar />
 *       <main>{children}</main>
 *     </div>
 *   );
 * }
 * ```
 */
const Navbar = () => {
  return (
    // Main navigation container with glassmorphism effect
    <div className="h-20 bg-white/70 backdrop-blur-xl border-b border-indigo-100/50 py-2.5 px-4 md:px-0 sticky top-0 z-50">
      {/* Content container with max width and centering */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-5">
        
        {/* Logo + Brand Section */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3 pb-1">
            {/* Brand icon with gradient background */}
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-200">
              <LayoutTemplate className="w-5 h-5 text-white" />
            </div>
            {/* Brand name with gradient text effect */}
            <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent font-cursive-dancing">
              ResumeMaker
            </span>
          </div>
        </Link>

        {/* User Profile Section */}
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
