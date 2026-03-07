import React from "react";
import styles from "./planning.module.css";

export default function Planning() {
  return (
    <main className={styles.planningWrapper}>
      <div className={styles.container}>
        
        {/* SECCIÓN HERO: Imagen Landscape + Título */}
        <section className={styles.planningHero}>
          <div className={styles.heroImageWrapper}>
            <img 
              src="/images/Irela_triathlon_plans21.jpeg" 
              alt="Personalised Training Planning" 
              className={styles.landscapeImg}
            />
          </div>
          
          <div className={styles.heroContent}>
            <span className={styles.badge}>High Performance</span>
            <h1>Customised Planning</h1>
            <p className={styles.description}>
              I plan and design personalised training programs to help you reach
              your fitness, running, swimming, or triathlon goals. 
            </p>
            <p className={styles.subDescription}>
              Perform on your own terms—at your place and your pace—under 
              expert supervision and constant progress monitoring.
            </p>
          </div>
        </section>

        {/* SECCIÓN DETALLES: El Plan de 10 Semanas */}
        <section className={styles.planDetailsSection}>
          <div className={styles.planCard}>
            <div className={styles.planCardHeader}>
              <h2>10 Weeks Personal Plan</h2>
              <div className={styles.priceTag}>$350</div>
            </div>
            
            <div className={styles.planCardBody}>
              <ul className={styles.featureList}>
                <li>
                  <strong>Personalised Design:</strong> Tailored to your specific fitness or triathlon goals.
                </li>
                <li>
                  <strong>Monitoring:</strong> Constant follow-ups, detailed reports, and data analysis.
                </li>
                <li>
                  <strong>Local Perks:</strong> Exclusive discounts with our community partners.
                </li>
                <li>
                  <strong>Flexibility:</strong> Training that adapts to your schedule and equipment.
                </li>
              </ul>
              
              <div className={styles.ctaWrapper}>
                <p className={styles.description}>
                  Start your personalised plan by contacting me today to discuss your goals and preferences. 
                </p>
                <p className={styles.helperText}>*Valid for all levels: from beginners to advanced athletes.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}