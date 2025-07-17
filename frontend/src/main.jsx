
// React 18 root API for rendering
import { createRoot } from 'react-dom/client'

// Global styles and Tailwind CSS
import './index.css'

// Main App component
import App from './App.jsx'

// React Router for client-side routing
import { BrowserRouter } from 'react-router-dom'

/**
 * Application Entry Point
 * 
 * This file initializes the React application by:
 * 1. Creating a React root using the new React 18 API
 * 2. Wrapping the App in BrowserRouter for client-side routing
 * 3. Rendering the entire application to the DOM
 * 
 * BrowserRouter enables:
 * - URL-based navigation (e.g., /dashboard, /resume/123)
 * - Browser history management
 * - Deep linking support
 */

// Create React root and render the application
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* Main application component wrapped in router */}
    <App />
  </BrowserRouter>
)
