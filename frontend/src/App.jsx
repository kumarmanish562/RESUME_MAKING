
// React Router imports for navigation
import { Routes, Route } from 'react-router-dom'

// Page components
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import EditResume from './components/EditResume'

// Context provider for user state management
import UserProvider from './context/UserContext'

// Toast notifications for user feedback
import { Toaster } from 'react-hot-toast'

/**
 * Main App Component
 * 
 * This is the root component that sets up:
 * - User context provider for global state management
 * - React Router configuration for page navigation
 * - Toast notifications for user feedback
 * 
 * Routes:
 * - "/" - Landing page with login/signup
 * - "/dashboard/*" - User dashboard with nested routes
 * - "/resume/:resumeId" - Resume editing interface
 */
const App = () => {
  return (
    <UserProvider>
      {/* Main application routes */}
      <Routes>
        {/* Landing page - handles authentication and welcome */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard - main user interface with nested routing */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        
        {/* Resume editor - edit specific resume by ID */}
        <Route path="/resume/:resumeId" element={<EditResume />} />
      </Routes>
      
      {/* Global toast notifications for success/error messages */}
      <Toaster 
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px" // Small font size for compact notifications
          }
        }}
      >
      </Toaster>
    </UserProvider>
  )
}

export default App

