import Image from "next/image";
import React from "react";
import styles from "./whatson.module.css";

export default function WhatsOnPage() {
  return (
    <main className={styles.container}>
      <section id="whatson">
        {/* CABECERA */}
        <div className={styles.header}>
          <h1>What's On</h1>
          <div className={styles.introText}>
            <p>Personal training is not for you? Social Sport is what you are made for!</p>
            <p>Work out with a community that shares your goals. Whether in person or online, distance is no longer an obstacle.</p>
          </div>
        </div>

        {/* SECCIÓN DESTACADA: BIENESTAR 360 WELLNESS */}
        <section className={styles.challengeCard}>
          <div className={styles.challengeContent}>
            <span className={styles.partnerLabel}>BIENESTAR, 360 DOWNUNDER WELLNESS</span>
            <h2>IWD SELFCARE EVENT: CORE, CYCLE, GLOW</h2>
            <p className={styles.challengeSubtitle}>In collaboration with <strong>Latin Temple Beauty</strong></p>
            
            <div className={styles.imgWrapper}>
              <Image
                src="/images/15thMarch2026Bienestar360.jpg"
                alt="IWD Selfcare Event Poster"
                width={1000}
                height={600}
                className={styles.timetableImg}
                priority
              />
            </div>

            <div className={styles.challengeFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✨</span>
                <p>Our first edition of 2026 is officially here, and it’s a special one. This is a journey designed for YOU—the incredible migrant women of Brisbane. And because we want our community to be more inclusive than ever, this event will be held entirely in English for the very first time! 🌏💖 Whether you’ve been here a week or a decade, this is your space to connect and thrive.</p>
              </div>
              
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔍</span>
                <div>
                  <p><strong>What’s the journey about?</strong></p>
                  <ul className={styles.innerList}>
                    <li><strong>CORE:</strong> Master your inner foundation with a Pelvic Floor focused Pilates masterclass by Irene Lalana</li>
                    <li><strong>CYCLE:</strong> Learn the link between nutrition and your hormonal health (including the secrets of Seed Cycling!) with Dr. Karina Ruiz.</li>
                    <li><strong>GLOW:</strong> Reclaim your radiance with practical facial self-care and natural rejuvenation techniques by Angie Mackay.</li>
                  </ul>
                </div>
              </div>

              <div className={styles.ctaWrapper}>
                <p>📅 When: Sunday, 15th March | 8:00 AM – 12:00 PM</p>
                <p>📍 Where: Coorparoo School of Arts</p>
              </div>
            </div>

            <div className={styles.ctaWrapper}>
              <p>Expect more than just workshops—we’re talking nourishing snacks, a high-value raffle, and the chance to meet a diverse group of inspiring women just like you.</p>
              <a 
                href="https://events.humanitix.com/experience-a-journey-to-holistic-wellness-v-2026-iwd-edition" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                Buy your tickets!
              </a>
            </div>
          </div>
        </section>

        {/* SECCIÓN DEL HORARIO (TIMETABLE) */}
        <div className={styles.timetableSection}>
          <div className={styles.badge}>Current Schedule</div>
          <h2>Weekly Timetable</h2>
          <div className={styles.imgWrapper}>
            <Image
              src="/images/Timetable_swimming_aquaerobics_fitness.jpg"
              alt="Weekly timetable for swimming, aquaerobics and fitness"
              width={1000}
              height={700}
              className={styles.timetableImg}
            />
          </div>
          <p className={styles.updateNote}>Work-outs in progress! New sessions added regularly.</p>
        </div>

        {/* SECCIÓN DESTACADA: CHALLENGE */}
        <section className={styles.challengeCard}>
          <div className={styles.challengeContent}>
            <span className={styles.partnerLabel}>Special Partnership</span>
            <h2>Mind & Body Challenge</h2>
            <p className={styles.challengeSubtitle}>In collaboration with <strong>Latin Temple Beauty</strong></p>
            
            <div className={styles.challengeFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✨</span>
                <p>Latin Temple Beauty Body Contouring treatments.</p>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>💪</span>
                <div>
                  <p><strong>Tailored Fitness Program:</strong></p>
                  <ul className={styles.innerList}>
                    <li><strong>Smart Fitness:</strong> Online group fitness & Pilates.</li>
                    <li><strong>Smart Strokes:</strong> Targeted swimming sessions.</li>
                    <li><strong>Aquafitness:</strong> High-energy group sessions.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.ctaWrapper}>
              <p>Ready to transform? Join the challenge here:</p>
              <a 
                href="https://latintemplebeauty.com.au/project/beauty-challenge-body-and-mind/?et_fb=1&PageSpeed=off" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                Visit Latin Temple Beauty
              </a>
            </div>
          </div>
        </section>

      </section>
    </main>
  );
}
