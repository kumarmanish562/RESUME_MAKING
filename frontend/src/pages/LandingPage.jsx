import React from 'react'
import { landingPageStyles } from '../assets/dummystyle'

const LandingPage = () => {
  return (
    <div className={landingPageStyles.container}>

      {/* Header  */}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoIcon}>

          </div>
        </div>
        </header>
    </div>
  )
}

export default LandingPage