import React from "react";
import styles from "./swimming.module.css";

export default function Swimming() {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.cardSingle}>
        
        {/* --- SECCIÓN SUPERIOR --- */}
        <div className={styles.cardTop}>
          <img
            src="/images/Irela_swimming_lessons23.jpg"
            alt="Swimming Lessons"
            className={styles.heroImage}
          />
          <div className={styles.textContent}>
            <h1 className={styles.mainTitle}>ADULTS SWIMMING LESSONS</h1>
            
            <h2 className={styles.subTitle}>Who it's for</h2>
            <ul className={styles.list}>
              <li>Do you think It is too late to learn new skills, and enjoy Australian treasures around the water?</li>
              <li>You learnt to swim as a child but can't remember much how to perform?</li>
              <li>Are afraid of water or just feel nervous when you have to breath under the water?</li>
              <li>You come from a non aquatic background and feel that nobody understands your needs and your starting point?</li>
              <li>The doctor told you that swimming would be great to reduce your aches but don't know how to do it efficiently and confidently?</li>
            </ul>
            <p className={styles.paragraph}>You are in the right place!</p>
            
            <h2 className={styles.subTitle}>What it is:</h2>
            <p className={styles.paragraph}>
              Our <strong>adults swimming lessons</strong> in Brisbane is a tailored swimming program for all levels and ages adults who want to swim with confidence, improve technique, build endurance, or return to the water after a break. Includes stroke correction, breath control, drills & pacing.
            </p>
            <p className={styles.paragraph}>
              We use video recording as a tool to enhance your learning experience when needed, providing personalized feedback to improve your technique. My lessons are designed to help you achieve your goals in a supportive, inclusive and encouraging environment (I´ll get in the water with you if needed).
            </p>
            <p className={styles.paragraph}>Spanish and English options.</p>
            
            <h2 className={styles.subTitle}>What results you’ll get:</h2>
            <ul className={styles.list}>
              <li>More efficient swimming strokes: less drag, use energy better.</li>
              <li>Increased stamina and ability to swim continuous laps</li>
              <li>Better breathing techniques, less breathlessness</li> 
              <li>Reduced shoulder strain / fatigue</li>
            </ul>
          </div>
        </div>

        {/* --- SECCIÓN INFERIOR (PROGRAMAS Y VÍDEO) --- */}
        <div className={styles.caption}>
          <section id="training_program" className={styles.trainingProgram}>
            <h2 className={styles.subTitle}>SMART STROKES GROUP LESSONS:</h2>
            {/* <ul className={styles.list}>
              <li>Smart Strokes is a swimming premium group for stroke correction in adults - intermediate level, for those wanting to swim longer without fatigue with a fun and unique touch of variety.</li>
              <li>Mondays and Wednsedays 6.30pm, Tuesdyas 12.00pm. We improve technique and endurance in Musgrave Park Pool, West End.</li>
              <li>6 (45min) session packs, $132. At Musgrave Park Pool, West End.</li>
              <li>New Beginners groups! Tuesdays 10.00 am, Thursdays 3.00 pm, Fridays 11.30am.</li>
            </ul> */}
            
            <h2 className={styles.subTitle}>PRIVATE SWIMMING LESSONS</h2>
            <ul className={styles.list}>
              <li>Musgrave Park Pool (West End) and QUT Kelvin Grove Campus, Brisbane.</li>
              <li>Adults Beginners - Intermediate - advanced - triathletes level.</li>
              {/* <li>10 Weeks program.</li> */}
              <li>45 - 60min private sessions.</li>
              <li>$85 - $105 per session</li>
              <li>Budget option: sharing lessons. Bring a friend or I'll find your buddie</li>
              <li>Reschedule within 24h notice.</li>
              <li>Discounts with local partners.</li>
              <li>Follow ups, reports and analysys.</li>
            </ul>
            
            <form action="https://canva.link/9napv4bspbvny9y" target="_blank" rel="noopener noreferrer" className={styles.formContainer}>
              <button className={styles.formButton}>See full program</button>
            </form>
          
          </section>
          
          <div className={styles.videoContainer}>
            <iframe
              className={styles.videoIframe}
              src="https://www.youtube.com/embed/MLRn_m7R7KE"
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
