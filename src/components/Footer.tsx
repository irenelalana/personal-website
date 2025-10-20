import React from 'react';
import '../app/style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media">
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
      <div className="footer-links">
        <a href="./privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
      </div>
      <div className="footer-links">
        <a href="./sustainability" target="_blank" rel="noopener noreferrer">Sustainability and Net Zero Intent</a>
      </div>
      <div className="copyright">©2025 Irela Aqua & Fitness</div>
    </footer>
  );
};

export default Footer;
