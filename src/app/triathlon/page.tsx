import React from "react";
import styles from "./triathlon.module.css";

export default function Triathlon() {
  return (
    <main className={styles.triWrapper}>
      <div className={styles.container}>
        
        {/* CABECERA: Imagen y Texto Intro */}
        <section className={styles.triHero}>
          <div className={styles.imageWrapper}>
            <img 
              src="/images/Irela_triathlon_swimming.jpg" 
              alt="Triathlon swimming training" 
              className={styles.heroImg}
            />
          </div>
          
          <div className={styles.heroContent}>
            <span className={styles.badge}>Specialised Coaching</span>
            <h1>Swimming for Triathletes</h1>
            <p>
              We equip you with the skills and confidence needed to thrive in
              the demanding world of triathlon. Our programme focuses on essential
              exit, entry, and navigation skills tailored for open water and race environments.
            </p>
            <p>
              Whether you are a seasoned triathlete looking to optimise your swim leg 
              or a beginner feeling uncertain about the water, our drills will 
              change your mindset and provide the tools to swim smarter.
            </p>
            <p className={styles.location}>
              📍 Lessons held at Musgrave Park Pool, West End, Brisbane.
            </p>
          </div>
        </section>

        {/* CUERPO: Lista de Detalles y Vídeo */}
        <section className={styles.detailsGrid}>
          <div className={styles.programmeInfo}>
            <h2>Programme Highlights</h2>
            <ul className={styles.featureList}>
              <li><strong>5-Week intensive programme</strong></li>
              <li>45-minute focused sessions</li>
              <li>Small groups of <strong>4-8 people</strong> for personal attention</li>
              <li>Comprehensive follow-ups and data analysis</li>
              <li>Exclusive discounts with our local partners</li>
              <li>
                Investment: <span className={styles.priceHighlight}>$105</span>
              </li>
              <li><em>Private options available – perfect for your first time!</em></li>
            </ul>
          </div>

          <div className={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/yznrRTc_9vc"
              title="Triathlon Swimming Drills and Technique"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </section>

      </div>
    </main>
  );
}