import React from "react";
import styles from "./smartStrokes.module.css";

export default function SmartStrokes() {
  return (
    <main className={styles.smartStrokesWrapper}>
      <div className={styles.container}>
        
        <section className={styles.planningHero}>
          <div className={styles.heroImageWrapper}>
            <img 
              src="/images/smart_strokes_hero.jpeg" 
              alt="Online Swim Technique Coaching" 
              className={styles.landscapeImg}
            />
          </div>
          
          <div className={styles.heroContent}>
            <span className={styles.badge}>Expert Video Analysis</span>
            <h1>Smart Strokes Online</h1>
            <p className={styles.description}>
              Stop fighting the water. Start swimming with power, ease, and efficiency.
            </p>
            
            {/* HOOK/PAIN POINTS */}
            <div style={{ textAlign: 'left', marginTop: '30px', backgroundColor: '#f9fbfc', padding: '20px', borderRadius: '15px' }}>
              <p style={{ fontWeight: 'bold', color: '#02678F' }}>Is this you?</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>❌ Exhausted after only 50m despite being fit?</li>
                <li>❌ Feeling like you're "sinking" or fighting the water?</li>
                <li>❌ Training hard but your pace isn't improving?</li>
                <li>❌ Dealing with sore shoulders or a stiff neck after swimming?</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA - Actualizado a 4 pasos con Initial Assessment */}
        <section className={styles.howItWorks}>
          <h2>How it Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepItem}>
              <span className={styles.stepIcon}>🤝</span>
              <h3>1. Initial Assessment</h3>
              <p>A 20-min chat to discuss your goals and get exact instructions on what to film.</p>
            </div>
            <div className={styles.stepItem}>
              <span className={styles.stepIcon}>📱</span>
              <h3>2. Record & Send</h3>
              <p>Film your swim using our recording guide and easily upload your footage. No need of hi-tech devices, your mobile phone can do the job!</p>
            </div>
            <div className={styles.stepItem}>
              <span className={styles.stepIcon}>🔍</span>
              <h3>3. Analyse</h3>
              <p>Receive a detailed video breakdown identifying your specific faults.</p>
            </div>
            <div className={styles.stepItem}>
              <span className={styles.stepIcon}>🏊</span>
              <h3>4. Improve</h3>
              <p>Apply custom drills designed to fix your stroke and build efficiency.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE PLANES / TIERS */}
        <section className={styles.planDetailsSection}>
          <h2 style={{ textAlign: 'center', color: '#02678F', margin: '0 0 40px 0' }}>Choose Your Level of Transformation</h2>
          
          <div className={styles.plansGrid}>
            
            {/* TIER 1: INSIGHT */}
            <div className={styles.planCard}>
              <div className={styles.planCardHeader}>
                <h2>The "Insight"</h2>
                <div className={styles.priceTag}>AUD 179</div>
              </div>
              <div className={styles.planCardBody}>
                <p className={styles.planSummary}>One-off expert assessment.</p>
                <ul className={styles.featureList}>
                  <li>20-min Initial Consultation</li>
                  <li>Detailed Video Analysis (15 min breakdown)</li>
                  <li>Custom Correction Drills Plan</li>
                  <li>15-min Live Q&A Follow-up</li>
                </ul>
                <div className={styles.ctaWrapper}>
                  <a href="#contact" className={styles.mainButton}>Get Your Analysis</a>
                </div>
              </div>
            </div>

            {/* TIER 2: PROGRESSION (Recomendado) */}
            <div className={`${styles.planCard} ${styles.recommended}`}>
              <div className={styles.planCardHeader}>
                <h2>"Progression"</h2>
                <div className={styles.priceTag}>AUD 349</div>
              </div>
              <div className={styles.planCardBody}>
                <p className={styles.planSummary}>Ongoing coaching & accountability.</p>
                <ul className={styles.featureList}>
                  <li><strong>Everything in Insight</strong></li>
                  <li>Custom Weekly Training Plans (6 Weeks)</li>
                  <li>Weekly Check-in & Feedback</li>
                  <li>Progress Video Review (after first month)</li>
                </ul>
                <div className={styles.ctaWrapper}>
                  <a href="#contact" className={styles.mainButton}>Start Training</a>
                </div>
              </div>
            </div>

            {/* TIER 3: TOTAL IMMERSION (Actualizado con métricas) */}
            <div className={styles.planCard}>
              <div className={styles.planCardHeader}>
                <h2>"Immersion"</h2>
                <div className={styles.priceTag}>AUD 649</div>
              </div>
              <div className={styles.planCardBody}>
                <p className={styles.planSummary}>The Premium Experience.</p>
                <ul className={styles.featureList}>
                  <li><strong>Everything in Insight</strong></li>
                  <li>Custom Weekly Training Plans (3 Months)</li>
                  <li>Weekly Check-in & Feedback</li>
                  <li>Monthly Progress Video Review</li>
                  <li><strong>Metric tracking (via Garmin, Strava, etc.)</strong></li>
                </ul>
                <div className={styles.ctaWrapper}>
                  <a href="#contact" className={styles.mainButton}>Go Premium</a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}