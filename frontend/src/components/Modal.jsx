import React from 'react'
import { modalStyles as styles } from '../assets/dummystyle'
import { X } from 'lucide-react'

const Modal = ({ 
  children, isOpen, onClose, title, hideHeader 
}) => {
  if (!isOpen) return null
  return (
    <div className={styles.overlay}>
      <div className={styles.container} >
        {!hideHeader && (
          <div className={styles.header}>
            <h3 className={styles.title}>
              {title}
            </h3>
          </div>
        )}
        <button type='button' className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

export default Modal