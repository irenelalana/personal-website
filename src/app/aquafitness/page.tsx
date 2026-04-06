import React from "react";
import Link from "next/link";
import styles from "./aquafitness.module.css";

export default function AquafitnessPage() {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.cardSingle}>
        
        {/* --- CABECERA DE LA PÁGINA --- */}
        <div className={styles.cardTop}>
          <img
            src="/images/Irela_swimming_confidence23.jpg"
            alt="Aquafitness Brisbane"
            className={styles.heroImage}
          />
          <div className={styles.textContent}>
            <h1 className={styles.mainTitle}>
              AQUAFITNESS - AQUAEROBICS - AQUAGYM
            </h1>
            <p className={styles.tagline}>Low-Impact, High-Results Training in the Water</p>

            <h2 className={styles.subTitle}>What it is:</h2>
            <p className={styles.paragraph}>
              Our <strong>Aquafitness Program</strong> delivers a fun, energising, and joint-friendly workout 
              in the pool. Combining cardio, strength, and mobility exercises, water resistance 
              makes every movement more effective while reducing stress on your joints.
            </p>

            <h2 className={styles.subTitle}>Who it’s for:</h2>
            <ul className={styles.list}>
              <li>Adults over 30 looking for a safe and enjoyable way to stay fit.</li>
              <li>Anyone managing joint pain, arthritis, or recovering from injury.</li>
              <li>People wanting a low-impact alternative to gym workouts.</li>
              <li>Beginner swimmers or returning exercisers who want a supportive environment and gain confidence.</li>
            </ul>
          </div>
        </div>

        {/* --- DETALLES Y BENEFICIOS --- */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailBox}>
            <h2 className={styles.subTitle}>What results you’ll get:</h2>
            <ul className={styles.list}>
              <li>Improved cardiovascular health, endurance and stamina.</li>
              <li>Increased strength and muscle tone without heavy weights.</li>
              <li>Better flexibility, mobility, coordination, agility and balance.</li>
              <li>Reduced impact on joints, with less pain and stiffness.</li>
              <li>A fun, social environment that keeps you motivated.</li>
              <li>Reduced blood pressure and mitigate stress.</li>
            </ul>
          </div>

          <div className={styles.detailBox}>
            <h2 className={styles.subTitle}>Why now:</h2>
            <ul className={styles.list}>
              <li>Water-based workouts protect your joints while building strength.</li>
              <li>Outdoor heated pools (33 degrees) to stay fit and tanned all year.</li>
              <li>Reduces long-term risk of mobility loss and stiffness.</li>
              <li>A welcoming option if you’ve struggled with traditional gyms.</li>
              <li>Research shows water activities significantly reduce stress and improve mood.</li>
            </ul>
          </div>
        </div>

        {/* --- PROGRAMAS Y VÍDEO --- */}
        <div className={styles.caption}>
          <section id="training_program" className={styles.trainingProgram}>
            <h2 className={styles.subTitle}>JOIN NOW THE AQUA CHALLENGE SUMMER 2026:</h2>
            <ul className={styles.list}>
              <li>10 weeks challenge 07/04/2026 - 11/06/2026</li>
              <li>Tuesdays 9.00am (Deep water) / Wednesdays 5.30pm / Wednesdays 9.00am</li>
              <li>60 min sessions.</li>
              <li>$150 per slot (10 sessions).</li>
              <li>Discounts with local partners.</li>
            </ul>

            <h2 className={styles.subTitle}>CASUAL AQUA OPTIONS:</h2>
            <ul className={styles.list}>
              <li>$20 casual</li>
              <li>Mondays* and Wednesdays 5.30pm. Tuesdays (deep water) and Thursdays 9.00am. Fridays* 12.30pm.</li>
              <li className={styles.bccNote}>
                *Monday and Friday are <strong>FREE</strong> as part of BCC Active and Healthy program 
                (click <Link href="/brisbane_city_council">here</Link> to join).
              </li>
            </ul>
            
            <p className={styles.locationNote}>
              Our sessions are at <strong>Musgrave Park Pool</strong>, in West End, Brisbane. 
              Multicultural environment, tunes and vibes. All levels welcome!
            </p>
            <p className={styles.neighborhoodNote}>
              You want to train in your building? Let´s organise something cool with your neighbours! 
              One to one also available.
            </p>
          </section>

          <div className={styles.videoContainer}>
            <iframe
              className={styles.videoIframe}
              src="https://www.youtube.com/embed/KUogIKsmdsc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
