import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <main className="about-modern-container">
      <section id="about-hero" className="about-split-container">
        
        {/* COLUMNA IZQUIERDA: Texto Principal */}
        <div className="about-content">
          <h1 className="about-title">Why Choose Irela Aqua & Fitness?</h1>
          <h2 className="about-greeting">Welcome! I'm Irene Lalana.</h2>
          
          <div className="about-intro-text">
            <p>
              I am passionate about helping you achieve your fitness and health goals. With over 20 years of experience as a coach, manager, and instructor across different sports, levels, and countries, I bring a goal-driven mindset and exceptional organisational skills to every session.
            </p>
            <p>
              My background as a professional swimmer and rescuer, combined with a degree in Sport Science, ensures that your training is both safe and highly effective.
            </p>
          </div>

          {/* LISTA DE LOGROS DESTACADOS */}
          <div className="about-achievements">
            <h3>🏆 Career Highlights</h3>
            <ul>
              <li><strong>Group Exercise Leader & Instructor of the Year (2025)</strong> - National Fitness Awards by Ausactive.</li>
              <li><strong>Lord Mayor Emerging Leader of the Year (2025)</strong>.</li>
              <li><strong>Aquaprofessional of the Year (2024)</strong>.</li>
              <li><strong>Australian Swimming Master Champion (2025)</strong> & Lifesaving World Silver Medal (2024).</li>
            </ul>
          </div>
        </div>

        {/* COLUMNA DERECHA: Galería de Retratos (Portrait Optimized) */}
        <div className="about-gallery-portrait">
          <div className="img-portrait-wrapper item-1">
            <img
              src="/images/Irela_swimming_teacher.jpeg"
              alt="Irene Lalana teaching swimming (Swim Teacher)"
            />
          </div>
          <div className="img-portrait-wrapper item-2">
            <img
              src="/images/Irela_fitness_coach23.JPG"
              alt="Irene Lalana as fitness coach (Coach)"
            />
          </div>
          <div className="img-portrait-wrapper item-3">
            <img
              src="/images/Triathlon_plan.jpg"
              alt="Triathlon training plan and athlete life"
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN INFERIOR: Especialidad y Misión */}
      <section className="about-details-section">
        <div className="detail-card">
          <h3>My Specialisation</h3>
          <p>
            My expertise lies in working with diverse groups, with a strong focus on supporting <strong>women over 40</strong> through the physical and emotional changes experienced during menopause. I understand the impact of fluctuating hormone levels and create programs to build lasting strength and resilience.
          </p>
          <p>
            Additionally, my multicultural background allows me to effectively teach swimming and survival skills to adults from over 30 different nationalities.
          </p>
        </div>

        <div className="detail-card highlight-card">
          <h3>The Irela Difference</h3>
          <p>
            At Irela Aqua & Fitness, I offer unique, comprehensive programs combining fitness, low-impact aquaerobics, and swimming—available in both <strong>Spanish and English</strong>. This integrated approach makes me uniquely positioned as potentially the only provider of this service in Brisbane.
          </p>
          <p className="mission-statement">
            <strong>My Mission:</strong> To empower everyone in Brisbane to enjoy Australia's aquatic treasures safely, and to support those who value their well-being in achieving a sustainable lifestyle through enjoyable activity.
          </p>
        </div>
      </section>

      {/* SECCIÓN BADGES (Mantenida como solicitaste) */}
      <section className="badges">
        <div className="badges-container">
          <img src="/images/lord_mayor_awards.jpg" alt="Lord Mayor Award" />
          <img src="/images/Aquaprofessional_of_the_year_2024.png" alt="Aquaprofessional of the year 2024" />
          <img src="/images/Group_exercise_leader_instructor_of_the_year_2025.png" alt="Group Exercise leader of the year 2025" />
          <img src="/images/ausactive.jpeg" alt="Ausactive" />
          <img src="/images/europeactive.png" alt="Europeactive" />
          <img src="/images/austswim.png" alt="Austswim" />
          <img src="/images/swimaustralia.jpeg" alt="SwimAustralia" />
          <img src="/images/CC - Brand - Council Logo - centre - Colour.PNG" alt="Brisbane City Council partnership" />
        </div>
      </section>
    </main>
  );
}