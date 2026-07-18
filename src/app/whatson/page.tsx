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
            <h2>The Language of the Body: Connection, Art & Inner Sovereignty</h2>
            <p className={styles.challengeSubtitle}>In collaboration with <strong>Latin Temple Beauty</strong></p>
            
            <div className={styles.imgWrapper}>
              <Image
                src="/images/Bienestar-jul-2026.jpeg"
                alt="The Language of the Body: Connection, Art & Inner Sovereignty"
                width={1000}
                height={600}
                className={styles.timetableImg}
                priority
              />
            </div>

            <div className={styles.challengeFeatures}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✨</span>
                <p>This month, we invite you to experience "The Language of the Body: Connection, Art & Inner Sovereignty", a unique journey designed to help you slow down, reconnect with yourself, and experience the healing power of movement, creativity, and mindful connection.</p>
              </div>
              
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🔍</span>
                <div>
                  <p><strong>What's the journey about?</strong></p>
                  <ul className={styles.innerList}>
                    <li><strong>Connection through Art:</strong> Experience a mindful body painting activity where you'll exchange symbolic artwork with a partner as a way of sharing intentions, kindness, and human connection.</li>
                    <li><strong>Conscious Movement & Dance Flow:</strong> Enjoy a guided somatic movement experience with live music designed to regulate the nervous system, release tension, and allow your body to express itself freely—whether dancing, stretching, or simply being present.</li>
                    <li><strong>Reflection & Integration:</strong> Participate in a supportive sharing circle where you'll have the opportunity to reflect on your experience in a safe, judgment-free environment.</li>
                    <li><strong>Clay Creation Workshop:</strong> Reconnect with your creativity by working with clay as a symbol of transformation, resilience, and personal empowerment</li>
                  </ul>
                </div>
              </div>

              <div className={styles.ctaWrapper}>
                <p>📅 When: Sunday, 26th July | 9:00 AM - 1:00 PM</p>
                <p>📍 Where: Coorparoo School of Arts</p>
              </div>
            </div>

            <div className={styles.ctaWrapper}>
              <p>Expect more than just workshops—we're talking nourishing snacks, a high-value raffle, and the chance to meet a diverse group of inspiring women just like you.</p>
              <a 
                href="https://events.humanitix.com/bienestar-360-experience-a-journey-to-holistic-wellness-vi-2026" 
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
        {/* <div className={styles.timetableSection}>
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
        </div> */}

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
