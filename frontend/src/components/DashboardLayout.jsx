/**
 * @fileoverview DashboardLayout Component
 * A layout wrapper component that provides consistent structure for dashboard pages.
 * Includes navigation header and conditional content rendering based on user authentication.
 * 
 * @requires React
 * @requires UserContext
 * @requires Navbar
 */

import React, {  useContext } from 'react'
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';

/**
 * DashboardLayout Component
 * 
 * Provides a consistent layout structure for dashboard pages with navigation
 * and authenticated content area. Only renders children content when user is authenticated.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.activeMenu - Currently active menu item for navigation highlighting
 * @param {React.ReactNode} props.children - Child components to render in the content area
 * @returns {JSX.Element} Dashboard layout with navigation and conditional content rendering
 * 
 * @example
 * ```jsx
 * <DashboardLayout activeMenu="dashboard">
 *   <div>Dashboard content here</div>
 * </DashboardLayout>
 * ```
 */
const DashboardLayout = ({activeMenu, children}) => {

  // Extract user from context to check authentication status
  const { user } = useContext(UserContext);

  return (
    <div>
      {/* Navigation component with active menu highlighting */}
      <Navbar 
     activeMenu={activeMenu} />
      {/* Conditional content rendering - only show when user is authenticated */}
      { user && (
        <div className=' container  mx-auto pt-4 pb-4 '>{children}</div>
      )}
    </div>
  )
}

export default DashboardLayout