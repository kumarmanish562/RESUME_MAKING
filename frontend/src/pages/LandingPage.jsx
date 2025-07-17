/**
 * Landing Page Component
 * 
 * The main landing page for the Resume Maker application that serves as the entry point
 * for new users. Features a modern, responsive design with hero section, features showcase,
 * call-to-action sections, and integrated authentication modals.
 * 
 * Key Features:
 * - Responsive hero section with animated SVG illustration
 * - Feature showcase with interactive cards
 * - Dynamic authentication handling (logged in vs guest users)
 * - Mobile-responsive navigation with hamburger menu
 * - Integrated login/signup modals
 * - Statistics display with gradient styling
 * - Professional footer with social links
 * 
 * User Flow:
 * 1. Guest users see CTA buttons that open authentication modal
 * 2. Authenticated users see profile info and direct dashboard access
 * 3. Mobile users get responsive menu with touch-friendly interactions
 * 4. All users can view features and company statistics
 * 
 * Dependencies:
 * - React Router: For navigation between pages
 * - UserContext: For authentication state management
 * - Lucide React: For modern icon components
 * - Modal System: For authentication forms
 * 
 * @fileoverview Main landing page component for Resume Maker application
 * @version 1.0.0
 */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router navigation hook
import { landingPageStyles } from '../assets/dummystyle'; // Pre-defined Tailwind CSS classes
import { Download, LayoutTemplate, MenuIcon, X, Zap } from 'lucide-react'; // Icon components
import { UserContext } from '../context/UserContext'; // Authentication context
import { ProfileInfoCard } from '../components/Cards'; // User profile display component
import { ArrowRight } from 'lucide-react'; // Additional icon for buttons
import Modal from '../components/Modal'; // Modal component for auth forms
import Login from '../components/Login'; // Login form component
import Signup from '../components/Signup'; // Signup form component

/**
 * Landing Page Component
 * 
 * Main marketing page that introduces the Resume Maker application to users.
 * Handles both authenticated and guest user experiences with responsive design.
 * 
 * @returns {JSX.Element} Landing page component with hero, features, and CTA sections
 */
const LandingPage = () => {
  // Authentication and navigation hooks
  const { user } = useContext(UserContext); // Get current user from context
  const navigate = useNavigate(); // Navigation function for programmatic routing

  // State Management
  const [openAuthModal, setOpenAuthModal] = useState(false); // Controls authentication modal visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Controls mobile hamburger menu
  const [currentPage, setCurrentPage] = useState('login'); // Tracks current auth form (login/signup)

  /**
   * Handle Call-to-Action Button Clicks
   * 
   * Determines the appropriate action based on user authentication status.
   * Guest users are directed to authentication modal, while authenticated
   * users are redirected to their dashboard.
   * 
   * @function handleCTA
   * 
   * Logic:
   * - If user is not authenticated: Show login/signup modal
   * - If user is authenticated: Navigate to dashboard
   */
  const handleCTA = () => {
    if (!user) {
      // Guest user - show authentication modal
      setOpenAuthModal(true);
    } else {
      // Authenticated user - go to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className={landingPageStyles.container}>
      {/* 
        HEADER SECTION
        Contains logo, navigation, and authentication buttons
        Responsive design with mobile hamburger menu
      */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          {/* Brand Logo and Name */}
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>Resume Maker</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className={landingPageStyles.mobileMenuIcon} size={24} />
            ) : (
              <MenuIcon className={landingPageStyles.mobileMenuIcon} size={24} />
            )}
          </button>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center">
            {user ? (
              // Authenticated user - show profile card
              <ProfileInfoCard />
            ) : (
              // Guest user - show get started button
              <button
                className={landingPageStyles.desktopAuthButton}
                onClick={() => setOpenAuthModal(true)}
                aria-label="Open authentication modal"
              >
                <div className={landingPageStyles.desktopAuthButtonOverlay} />
                <span className={landingPageStyles.desktopAuthButtonText}>
                  Get Started
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu - Collapsible */}
        {mobileMenuOpen && (
          <div className={landingPageStyles.mobileMenu}>
            <div className={landingPageStyles.mobileMenuContainer}>
              {user ? (
                // Authenticated user mobile menu
                <div className={landingPageStyles.mobileUserInfo}>
                  <div className={landingPageStyles.mobileUserWelcome}>
                    Welcome Back
                  </div>
                  <button
                    className={landingPageStyles.mobileDashboardButton}
                    onClick={() => {
                      navigate('/dashboard');
                      setMobileMenuOpen(false); // Close menu after navigation
                    }}
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                // Guest user mobile menu
                <button
                  className={landingPageStyles.mobileAuthButton}
                  onClick={() => {
                    setOpenAuthModal(true);
                    setMobileMenuOpen(false); // Close menu after opening auth modal
                  }}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* 
        MAIN CONTENT AREA
        Contains hero section, features, and call-to-action sections
      */}
      <main className={landingPageStyles.main}>
        {/* 
          HERO SECTION
          Primary landing area with main value proposition and visual elements
        */}
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
            {/* Left Content - Text and CTAs */}
            <div className={landingPageStyles.heroLeft}>
              {/* Tagline - Brief brand description */}
              <div className={landingPageStyles.tagline}>
                Professional Resume Builder
              </div>

              {/* Main Heading - Primary value proposition */}
              <h1 className={landingPageStyles.heading}>
                <span className={landingPageStyles.headingText}>
                  Craft
                </span>
                <span className={landingPageStyles.headingGradient}>
                  Professional
                </span>
                <span className={landingPageStyles.headingText}>
                  Resumes
                </span>
              </h1>

              {/* Description - Supporting details about the service */}
              <p className={landingPageStyles.description}>
                Create job-winning resumes with expertly designed templates.
                ATS-friendly, recruiter-approved, and tailored to your career goals.
              </p>

              {/* Call-to-Action Buttons */}
              <div className={landingPageStyles.ctaButtons}>
                {/* Primary CTA - Main action button */}
                <button
                  className={landingPageStyles.primaryButton}
                  onClick={handleCTA}
                  aria-label="Start building your resume"
                >
                  <div className={landingPageStyles.primaryButtonOverlay}></div>
                  <span className={landingPageStyles.primaryButtonContent}>
                    Start Building
                    <ArrowRight
                      className={landingPageStyles.primaryButtonIcon}
                      size={18}
                    />
                  </span>
                </button>

                {/* Secondary CTA - Alternative action */}
                <button
                  className={landingPageStyles.secondaryButton}
                  onClick={handleCTA}
                  aria-label="View available resume templates"
                >
                  View Templates
                </button>
              </div>

              {/* 
                STATISTICS GRID
                Displays key metrics to build trust and credibility
                Shows social proof and service quality indicators
              */}
              <div className={landingPageStyles.statsContainer}>
                {[
                  { 
                    value: '50K+', 
                    label: 'Resumes Created', 
                    gradient: 'from-cyan-500 to-indigo-600' 
                  },
                  { 
                    value: '4.9★', 
                    label: 'User Rating', 
                    gradient: 'from-blue-500 to-purple-500' 
                  },
                  { 
                    value: '5 Min', 
                    label: 'Build Time', 
                    gradient: 'from-teal-400 to-emerald-500' 
                  }
                ].map((stat, idx) => (
                  <div className={landingPageStyles.statItem} key={idx}>
                    {/* Statistic Number with gradient styling */}
                    <div className={`${landingPageStyles.statNumber} ${stat.gradient}`}>
                      {stat.value}
                    </div>
                    {/* Statistic Label */}
                    <div className={landingPageStyles.statLabel}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 
              Right Content - SVG Illustration
              Visual representation of a resume with animated elements
            */}
            <div className={landingPageStyles.heroIllustration}>
              <div className={landingPageStyles.heroIllustrationBg}></div>
              <div className={landingPageStyles.heroIllustrationContainer}>
                <svg
                  viewBox="0 0 400 500"
                  className={landingPageStyles.svgContainer}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="resume-illustration"
                  role="img"
                >
                  <title id="resume-illustration">Resume template illustration</title>
                  
                  {/* SVG Gradient Definitions */}
                  <defs>
                    {/* Background gradient for modern look */}
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />  {/* Indigo-500 */}
                      <stop offset="100%" stopColor="#8b5cf6" /> {/* Violet-500 */}
                    </linearGradient>

                    {/* Card gradient for subtle depth */}
                    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fdf4ff" />   {/* Fuchsia-50 */}
                      <stop offset="100%" stopColor="#f3e8ff" /> {/* Purple-50 */}
                    </linearGradient>
                  </defs>

                  {/* Static SVG Elements - Resume Structure */}
                  {/* Main resume container */}
                  <rect x="50" y="50" width="300" height="400" rx="20" className={landingPageStyles.svgRect} />
                  
                  {/* Profile picture placeholder */}
                  <circle cx="120" cy="120" r="25" className={landingPageStyles.svgCircle} />
                  
                  {/* Name and title lines */}
                  <rect x="160" y="105" width="120" height="8" rx="4" className={landingPageStyles.svgRectPrimary} />
                  <rect x="160" y="120" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                  
                  {/* Content lines - representing resume text */}
                  <rect x="70" y="170" width="260" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="185" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="200" width="240" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  
                  {/* Section header */}
                  <rect x="70" y="230" width="60" height="6" rx="3" className={landingPageStyles.svgRectPrimary} />
                  
                  {/* Skills badges */}
                  <rect x="70" y="250" width="40" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <rect x="120" y="250" width="50" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <rect x="180" y="250" width="45" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  
                  {/* Experience section */}
                  <rect x="70" y="290" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                  <rect x="70" y="310" width="180" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="325" width="150" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="340" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />

                  {/* 
                    Animated Elements - Add life to the illustration
                    These elements move to catch user attention and demonstrate interactivity
                  */}
                  
                  {/* Floating circle - gentle up/down motion */}
                  <circle cx="320" cy="100" r="15" className={landingPageStyles.svgAnimatedCircle}>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 0,-10; 0,0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Side rectangle - left/right motion */}
                  <rect x="30" y="300" width="12" height="12" rx="6" className={landingPageStyles.svgAnimatedRect}>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 5,0; 0,0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  
                  {/* Triangle - rotating motion */}
                  <polygon points="360,200 370,220 350,220" className={landingPageStyles.svgAnimatedPolygon}>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 360 210; 360 360 210; 0 360 210"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 
          FEATURES SECTION
          Showcases key application features with interactive cards
        */}
        <section className={landingPageStyles.featuresSection}>
          <div className={landingPageStyles.featuresContainer}>
            {/* Section Header */}
            <div className={landingPageStyles.featuresHeader}>
              <h2 className={landingPageStyles.featuresTitle}>
                Why Choose <span className={landingPageStyles.featuresTitleGradient}>Resume Maker?</span>
              </h2>
              <p className={landingPageStyles.featuresDescription}>
                Everything you need to create a Professional resume that stands out
              </p>
            </div>

            {/* Features Grid - Interactive feature cards */}
            <div className={landingPageStyles.featuresGrid}>
              {[
                {
                  icon: <Zap className={landingPageStyles.featureIcon} />,
                  title: "Lightning Fast",
                  description: "Create professional resumes in under 5 minutes with our streamlined process",
                  gradient: landingPageStyles.featureIconViolet,
                  bg: landingPageStyles.featureCardViolet
                },
                {
                  icon: <LayoutTemplate className={landingPageStyles.featureIcon} />,
                  title: "Pro Templates",
                  description: "Choose from dozens of recruiter-approved, industry-specific templates",
                  gradient: landingPageStyles.featureIconFuchsia,
                  bg: landingPageStyles.featureCardFuchsia
                },
                {
                  icon: <Download className={landingPageStyles.featureIcon} />,
                  title: "Instant Export",
                  description: "Download high-quality PDFs instantly with perfect formatting",
                  gradient: landingPageStyles.featureIconOrange,
                  bg: landingPageStyles.featureCardOrange
                }
              ].map((feature, index) => (
                <div className={`${landingPageStyles.featureCard} ${feature.bg}`} key={index}>
                  {/* Hover effect overlay */}
                  <div className={landingPageStyles.featureCardHover}></div>
                  
                  {/* Card content */}
                  <div className={landingPageStyles.featureCardContent}>
                    {/* Feature icon with gradient background */}
                    <div className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}>
                      {feature.icon}
                    </div>
                    
                    {/* Feature title */}
                    <h3 className={landingPageStyles.featureTitle}>{feature.title}</h3>
                    
                    {/* Feature description */}
                    <p className={landingPageStyles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
          CALL-TO-ACTION SECTION
          Final conversion section encouraging user sign-up
        */}
        <section className={landingPageStyles.ctaSection}>
          <div className={landingPageStyles.ctaContainer}>
            <div className={landingPageStyles.ctaCard}>
              {/* Background gradient overlay */}
              <div className={landingPageStyles.ctaCardBg}></div>
              
              {/* CTA content */}
              <div className={landingPageStyles.ctaCardContent}>
                <h2 className={landingPageStyles.ctaTitle}>
                  Ready to Build Your <span className={landingPageStyles.ctaTitleGradient}>Standout Resume?</span>
                </h2>
                <p className={landingPageStyles.ctaDescription}>
                  Join thousands of professionals who have landed their dream jobs with our easy-to-use resume builder.
                </p>
                
                {/* Final CTA button */}
                <button
                  className={landingPageStyles.ctaButton}
                  onClick={handleCTA}
                  aria-label="Start building your resume now"
                >
                  <div className={landingPageStyles.ctaButtonOverlay}></div>
                  <span className={landingPageStyles.ctaButtonText}>
                    Start Building Now 
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 
        FOOTER SECTION
        Simple footer with attribution and social links
      */}
      <footer className={landingPageStyles.footer}>
        <div className={landingPageStyles.footerContainer}>
          <p className={landingPageStyles.footerText}>
            Crafted with <span className={landingPageStyles.footerHeart}>❤️</span> by{'  '}
            <a 
              href="https://www.linkedin.com/in/manish-kumar-123456789/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={landingPageStyles.footerLink}
              aria-label="Visit Manish Kumar's LinkedIn profile"
            >
              Manish Kumar
            </a>
          </p>
        </div>
      </footer>

      {/* 
        AUTHENTICATION MODAL
        Overlays for login and signup forms
        Controlled by openAuthModal state
      */}
      <Modal 
        isOpen={openAuthModal} 
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage('login'); // Reset to login form when closing
        }}
        hideHeader
        aria-labelledby="auth-modal-title"
      >
        <div>
          {/* Conditional rendering based on current auth page */}
          {currentPage === 'login' && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'signup' && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;

/**
 * Component Usage Notes:
 * 
 * 1. Responsive Design:
 *    - Mobile-first approach with responsive breakpoints
 *    - Touch-friendly interactions for mobile users
 *    - Hamburger menu for mobile navigation
 *    - Optimized layouts for different screen sizes
 * 
 * 2. Authentication Flow:
 *    - Dynamic content based on user authentication status
 *    - Seamless modal-based authentication (no page redirects)
 *    - Form switching between login and signup
 *    - Proper state cleanup when closing modals
 * 
 * 3. Visual Design:
 *    - Modern gradient styling throughout
 *    - Animated SVG illustration for engagement
 *    - Interactive hover effects on cards and buttons
 *    - Consistent color scheme with brand identity
 * 
 * 4. Performance:
 *    - Efficient re-renders with proper state management
 *    - Lazy loading potential for heavy graphics
 *    - Optimized SVG illustrations
 *    - Minimal external dependencies
 * 
 * 5. Accessibility:
 *    - ARIA labels for screen readers
 *    - Semantic HTML structure
 *    - Keyboard navigation support
 *    - High contrast ratios for text readability
 * 
 * 6. SEO Optimization:
 *    - Proper heading hierarchy (h1, h2, h3)
 *    - Descriptive alt text for images/illustrations
 *    - Semantic markup for better indexing
 *    - Meta-friendly content structure
 * 
 * 7. User Experience:
 *    - Clear value propositions in hero section
 *    - Progressive disclosure of information
 *    - Multiple conversion opportunities (CTAs)
 *    - Trust signals through statistics and features
 */

