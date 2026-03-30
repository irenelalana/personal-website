import React from "react";
import styles from "./functional.module.css";

export default function Functional() {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.cardSingle}>
        
        {/* --- SECCIÓN HERO --- */}
        <div className={styles.cardTop}>
          <img
            src="/images/Irela_fitness_trainer.JPG"
            alt="Smart Fitness Program"
            className={styles.heroImage}
          />
          <div className={styles.textContent}>
            <h1 className={styles.mainTitle}>
              SMART FITNESS Program
            </h1>
            <p className={styles.tagline}>Over 35 High Quality Lifestyle</p>

            <h2 className={styles.subTitle}>Who it’s for</h2>
            <ul className={styles.list}>
              <li>Frustrated with inefficient programs or feeling lost in a gym?</li>
              <li>Tired of not seeing results or embarrassed to work out in public?</li>
              <li>Struggling to find a fitness routine that fits your busy life?</li>
            </ul>
            <p className={styles.highlightText}>Then, my Premium Smart Fitness Program is for you!</p>

            <h2 className={styles.subTitle}>Why now:</h2>
            <ul className={styles.list}>
              <li><strong>Preserve your health:</strong> Muscle and bone density decline after 30 (3-8% per decade).</li>
              <li><strong>Prevention:</strong> Avoid falls, aches, and stiffness before they start.</li>
              <li><strong>Independence:</strong> Sets you up for a healthier, more active future.</li>
              <li><strong>Mental Wellbeing:</strong> Improves mood, concentration, and reduces stress.</li>
            </ul>
          </div>
        </div>

        {/* --- RESULTADOS --- */}
        <div className={styles.resultsSection}>
          <h2 className={styles.subTitle}>What results you’ll get:</h2>
          <div className={styles.resultsGrid}>
            <div className={styles.resultItem}>Improved core strength, posture, and balance.</div>
            <div className={styles.resultItem}>Stronger muscles to protect joints.</div>
            <div className={styles.resultItem}>Easier daily movement (stairs, shopping, family).</div>
            <div className={styles.resultItem}>Increased energy and overall confidence.</div>
            <div className={styles.resultItem}>Support for other sports (swimming, cycling, running).</div>
            <div className={styles.resultItem}>Minimises Menopause symptoms.</div>
          </div>
        </div>

        {/* --- DETALLES DEL PROGRAMA Y VIDEO --- */}
        <div className={styles.caption}>
          <section className={styles.programDetails}>
            <h2 className={styles.subTitle}>SMART FITNESS Program High Results:</h2>
            <ul className={styles.list}>
              <li><strong>Premium group:</strong> Only 8 spots available.</li>
              <li><strong>Structure:</strong> Live online workouts for accountability.</li>
              <li><strong>Duration:</strong> 10 Weeks program ($550).</li>
              <li><strong>Sessions:</strong> 3 fitness live sessions per week (60 min).</li>
              <li><strong>Schedule:</strong> Mon, Tue, Fri 6.15am / 1.30pm (Brisbane time).</li>
              <li><strong>Bonuses:</strong> Access to recorded materials & extra group swimming lessons.</li>
              <li><strong>Try for free:</strong> First week for free! (Contact me now).</li>
            </ul>
            
            <p className={styles.ptNote}>
              <em>Personal training also available in Toowong, CBD and West End. Tailored to your needs.</em>
            </p>

            <form action="https://canva.link/hiohvgr8naoxz52" target="_blank" className={styles.formAction}>
              <button className={styles.formButton}>See full program</button>
            </form>
          </section>

          {/* --- VIDEO SIN RECORTES --- */}
          <div className={styles.videoContainer}>
            <iframe
              className={styles.videoIframe}
              src="https://www.youtube.com/embed/XOcuZt7vKhs"
              title="Smart Fitness Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
