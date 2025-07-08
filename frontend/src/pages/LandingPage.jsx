import React, { useState } from 'react'
import { landingPageStyles } from '../assets/dummystyle'
import { LayoutTemplate } from 'lucide-react';
import { MenuIcon, X } from 'lucide-react';

const LandingPage = () => {

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
          {user}
         </div>
        </div>
      </header>
    </div>
  )
}

export default LandingPage