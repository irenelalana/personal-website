import React from "react";
// Importamos los estilos del módulo
import styles from "./corporate.module.css";

export default function CorporateEvents() {
  return (
    <main className={styles.corpPageWrapper}>
      <section>
        <div className={styles.corpContainer}>
          
          {/* BLOQUE 1: Imagen Portrait + Texto Principal */}
          <div className={styles.corpIntroGrid}>
            <div className={styles.corpImagePortrait}>
              <img
                src="/images/Irela_Functional_fitness_online23.jpg"
                alt="Corporate Wellness Team Building"
              />
            </div>
            
            <div className={styles.corpTextContent}>
              <span className={styles.corpBadge}>Business Solutions</span>
              <h1>Corporate Wellness</h1>
              <p className={styles.corpLead}>
                We specialise in providing customised wellbeing plans and 
                team-building events for companies, catering to the physical needs 
                of your employees.
              </p>
              <p>
                We promote a healthy lifestyle, boost motivation, and enhance
                productivity. Our exciting team-building events create a positive 
                work environment and foster happier teamwork.
              </p>
              <p>
                We also offer specific workshops for non-profits and communities 
                looking to promote a sustainable, active lifestyle.
              </p>
            </div>
          </div>

          {/* BLOQUE 2: Servicios + Imagen Landscape */}
          <div className={styles.corpServicesGrid}>
            <div className={styles.corpServicesList}>
              <h2>Our Programs Include:</h2>
              <ul>
                <li>Customised Aqua & Fitness sessions.</li>
                <li>Ticketing for pre-existing groups.</li>
                <li>Online live fitness for remote teams.</li>
                <li>Mid and end-of-year healthy team building.</li>
                <li>Fully tailored options for your company's needs.</li>
                <li>Exclusive discounts with local partners.</li>
              </ul>
              
              <div className={styles.corpCtaSimple}>
                <p>Invest in your team's health today. Contact me in the button below to request a proposal.</p>
              </div>
            </div>

            <div className={styles.corpImageLandscape}>
              <img
                src="/images/Wellness_corporate_program_benefits.jpg"
                alt="Wellness corporate program benefits"
              />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}