'use client'

import React, { useState, useEffect } from "react";
import styles from "./ActivatePopup.module.css";
import Link from "next/link";

const ActivatePopup: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // sessionStorage es compartido por todas las páginas del mismo dominio
    const hasSeenPopup = sessionStorage.getItem("activateBrisbanePopup");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    sessionStorage.setItem("activateBrisbanePopup", "true");
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">×</button>
        
        <div className={styles.modalBody}>
          <img 
            src="/images/activate-brisbane-light.png" 
            width={300}              // Ajusta el tamaño según tu diseño
            height={200}
            alt="Activate Brisbane Logo" 
            className={styles.modalLogo}
          />
          <h3>Launch Special Offer !</h3>
          <p>
            Join Brisbane’s most exciting Spanish-speaking fitness event.
            Secure your spot at our <strong>lowest price ever</strong>!
          </p>
          <div className={styles.deadlineBadge}>
            Offer ends 15 April 2026
          </div>
          
          <Link href="/activate-brisbane#registration-form" className={styles.modalCTA} onClick={closeModal}>
            DISCOUNTED TICKETS HERE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivatePopup;