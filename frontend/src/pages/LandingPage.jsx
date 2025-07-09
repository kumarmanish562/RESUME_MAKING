import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { landingPageStyles } from '../assets/dummystyle'
import { LayoutTemplate, MenuIcon, X } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { ProfileInfoCard } from '../components/Cards';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={landingPageStyles.container}>

      {/* Header  */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>
              Resume Maker
            </span>
          </div>

          {/* Mobile Menu BTN */}
          <button className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className={landingPageStyles.mobileMenuIcon} size={24} />
            ) : (
              <MenuIcon className={landingPageStyles.mobileMenuIcon} size={24} />
            )}
          </button>

          {/* Desktop Navigation */}
         <div className=' hidden md:flex items-center'>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button className={landingPageStyles.desktopAuthButton} onClick={() => setOpenAuthModal(true)}>
              <div className={landingPageStyles.desktopAuthButtonOverlay}>
              </div>
              <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
            </button>
          )}
         </div>
        </div>
      </header>
    </div>
  )
}

export default LandingPage