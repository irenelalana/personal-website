import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer className={styles.footer}>
      {/* Iconos en línea horizontal */}
      <div className={styles.socialMedia}>
        <a href="https://www.instagram.com/irela_aquaandfitness/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src="/images/instagram_exercise_online_100x100.png" alt="Instagram logo Irela13Coach" />
        </a>
        <a href="https://www.facebook.com/IrelaAquaAndFitness" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <img src="/images/facebook_personaltrainer_in_brisbane_100x100.png" alt="Facebook logo Irela13Coach" />
        </a>
        <a href="https://www.youtube.com/@irelaaquaandfitness" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <img src="/images/Youtube_logo_onlineworkouts_100x100.png" alt="YouTube logo Irela13Coach" />
        </a>
        <a href="https://www.linkedin.com/in/irene-lalana-mu%C3%B1oz-3964a527/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="/images/linkedin_50x50.png" alt="LinkedIn logo Irela13Coach" />
        </a>
      </div>

      {/* Info en línea vertical */}
      <div className={styles.infoContainer}>
        <a href="./privacy-policy" className={styles.link} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <a href="./sustainability" className={styles.link} target="_blank" rel="noopener noreferrer">
          Sustainability and Net Zero Intent
        </a>
        <div className={styles.copyright}>
          ©{currentYear} Irela Aqua & Fitness
        </div>
      </div>
    </footer>
  );
};

export default Footer;