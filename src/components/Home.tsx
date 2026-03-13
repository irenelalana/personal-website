import React from "react";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      {/* HEADER MOBILE */}
      <div className={styles.headerPhone}>
        <img src="/images/Irela_swimming_pool.JPG" alt="Swimming Pool" />
      </div>

      {/* HEADER DESKTOP */}
      <div className={styles.headerDesktop}>
        <img src="/images/Fit_happy1.JPG" alt="Fit happy 1" />
        <img src="/images/Fit_happy2.JPG" alt="Fit happy 2" />
        <img src="/images/Fit_happy3.JPG" alt="Fit happy 3" />
        <img src="/images/Fit_happy4.JPG" alt="Fit happy 4" />
      </div>

      <main className={styles.content}>
        <h2 className={styles.intro} style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
          Ready for an effective and fun fitness experience?
        </h2>
        
        <p className={styles.intro}>
          Hi! I'm <strong>Irene Lalana</strong>, Australian Master swimming Champion 2025, 
          Spanish Lifesaving National records and Silver medal in World Championship 2024, 
          Australian Aquaprofessional of the year 2024 and Group Exercise Leader and Instructor 
          of the year 2025, sports science graduate, and your go-to coach...
          {/* (He acortado el texto aquí por brevedad, mantén el tuyo completo) */}
        </p>

        {/* PROGRAMAS PRINCIPALES (Landscape) */}
        <div className={styles.homePrograms}>
          <a href="./functional">
            <img src="/images/Irela_functional_training_program.png" alt="Functional Training" />
          </a>
          <a href="./aquafitness">
            <img src="/images/Aquafitness_stretching21_program.png" alt="Aquafitness Stretching" />
          </a>
          <a href="/swimming">
            <img src="/images/Irela_swimming_brisbane21_program.png" alt="Swimming Brisbane" />
          </a>
        </div>

        {/* OTROS PROGRAMAS (Square - 2x2 en móvil, 4x1 en desktop) */}
        <div className={styles.otherPrograms}>
          <a href="./pilates">
            <img src="/images/Pilates_core_balance_program.png" alt="Pilates Core" />
          </a>
          <a href="./planning">
            <img src="/images/triathlon_Planning_program.png" alt="Triathlon Planning" />
          </a>
          <a href="/corporate_events">
            <img src="/images/Corporate_wellness_program.png" alt="Corporate Wellness" />
          </a>
          <a href="/brisbane_city_council">
            <img src="/images/Aquafitness_program.png" alt="Aquafitness Program" />
          </a>
        </div>

        {/* SECCIÓN FLUID X */}
        <section className={styles.homeFluidx}>
          <div className={styles.fluidxText}>
            <h2>Fluid X</h2>
            <p>Adjustable, water-filled weights... (squat, press, swing, or lift).</p>
            <p>
              <strong>Get a 20% discount</strong> by{" "}
              <a href="https://www.thefluidx.com/..." target="_blank" rel="noopener noreferrer">
                clicking here
              </a> (2 items min) code: <strong>FXIRENE</strong>
            </p>
          </div>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/kLAhHFxThc8"
              title="Fluid X video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* SECCIÓN EVERVESSEL */}
        <section className={styles.homeFluidx}>
          <div className={styles.fluidxText}>
            <h2>Evervessel</h2>
            <p>Quality sustainable stainless drinking Vessels💧. Designed in Australia.</p>
            <p>
              Free whisk balls with any vessel purchased{" "}
              <a href="https://evervessel.sjv.io/aOevdY" target="_blank" rel="noopener noreferrer">
                clicking here
              </a>
            </p>
          </div>
          <div className={styles.videoWrapper}>
            <iframe
              src="https://www.youtube.com/embed/T1Migxs1fY4"
              title="Evervessel video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* SECCIÓN VOUCHERS */}
        <section className={styles.giftCards} id="gift-cards">
          <h2>Vouchers</h2>
          <p>Is there anything better in life that gifting Health to your loved ones?</p>
          <p>Contact me to customise your Gift Card with Swimming Lessons, Personal Training...</p>
          <img
            className={styles.voucherImg}
            src="/images/Irela_Fitness_voucher.jpg"
            alt="Voucher card"
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
