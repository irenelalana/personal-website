import React from "react";
import styles from "./pilates.module.css";

export default function Pilates() {
  return (
    <main className={styles.pilatesWrapper}>
      <div className={styles.container}>
        
        {/* HERO: Portrait Image + Who it's for */}
        <section className={styles.heroSection}>
          <div className={styles.imageSide}>
            <img
              src="/images/Irela_online_fitness_recovery_from_injuries23.jpg"
              alt="Pilates and Core Mobility Training"
              className={styles.portraitImg}
            />
          </div>
          
          <div className={styles.textContent}>
            <span className={styles.badge}>Core & Mobility</span>
            <h1>Pilates-Inspired Training</h1>
            
            <h2>Who it’s for:</h2>
            <ul className={styles.questionList}>
              <li>Looking to strengthen your core safely and effectively?</li>
              <li>Suffering from back pain, poor posture, or desk-stiffness?</li>
              <li>Over-35 and wanting to maintain flexibility as you age?</li>
              <li>Recovering from injury and need a gentle yet powerful workout?</li>
            </ul>
            <p><strong>You are in the right place!</strong> Our programme combines controlled movements and deep core activation to improve your daily life.</p>
          </div>
        </section>

        {/* INFO GRID: Results & Why Now */}
        <section className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h2>Expected Results</h2>
            <ul className={styles.checkList}>
              <li>Stronger core muscles to support your spine.</li>
              <li>Greater flexibility and joint mobility.</li>
              <li>Reduced tension, stiffness, and back discomfort.</li>
              <li>Improved balance and coordination.</li>
              <li>A relaxed mind and reduced stress levels.</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h2>Why start now?</h2>
            <ul className={styles.checkList}>
              <li>Correction now prevents long-term hip and shoulder issues.</li>
              <li>Most daily pains stem from weak core muscles.</li>
              <li>Staying mobile now ensures independence as you age.</li>
              <li>Mat-based and low-impact: safe for all levels.</li>
            </ul>
          </div>
        </section>

        {/* PRICING & PROGRAMMES */}
        <section className={styles.programSection}>
          <h2>Programme Options</h2>
          <div className={styles.programGrid}>
            
            <div className={styles.priceCard}>
              <h3>10-Week Personalised Plan</h3>
              <ul>
                <li>45-60 minute tailored sessions</li>
                <li>Investment: $665 - $825</li>
                <li>Includes Welcome Package</li>
                <li>Budget option: Sharing lessons available</li>
                <li><strong>Try your first session for free!</strong></li>
              </ul>
            </div>

            <div className={`${styles.priceCard} ${styles.onlineHighlight}`}>
              <h3>Online Smart Pilates</h3>
              <ul>
                <li><strong>Tuesday morning group: 6:15 am</strong></li>
                <li>Perfect for "early birds" at home</li>
                <li>10-Session pass: $250</li>
                <li>Live expert supervision online</li>
                <li>Discounts with our local partners included</li>
              </ul>
            </div>

          </div>
        </section>

        {/* VIDEO SECTION */}
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/_1VywCHlfIY"
            title="Pilates Technique Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </main>
  );
}