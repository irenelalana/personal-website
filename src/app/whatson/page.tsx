import Image from "next/image";

export default function WhatsOnPage() {
  return (
    <main className="wo-page-container">
      <section id="whatson">
        {/* CABECERA */}
        <div className="wo-header">
          <h1>What's On</h1>
          <div className="wo-intro-text">
            <p>Personal training is not for you? Social Sport is what you are made for!</p>
            <p>Work out with a community that shares your goals. Whether in person or online, distance is no longer an obstacle.</p>
          </div>
        </div>

        {/* SECCIÓN DEL HORARIO (TIMETABLE) */}
        <div className="wo-timetable-section">
          <div className="wo-badge">Current Schedule</div>
          <h2>Weekly Timetable</h2>
          <div className="wo-img-wrapper">
            <img
              src="/images/Timetable_swimming_aquaerobics_fitness.jpg"
              alt="Weekly timetable for swimming, aquaerobics and fitness"
              className="wo-timetable-img"
            />
          </div>
          <p className="wo-update-note">Work-outs in progress! New sessions added regularly.</p>
        </div>

        {/* SECCIÓN DESTACADA: CHALLENGE */}
        <section className="wo-challenge-card">
          <div className="wo-challenge-content">
            <span className="wo-partner-label">Special Partnership</span>
            <h2>Mind & Body Challenge</h2>
            <p className="wo-challenge-subtitle">In collaboration with <strong>Latin Temple Beauty</strong></p>
            
            <div className="wo-challenge-features">
              <div className="wo-feature-item">
                <span className="wo-feature-icon">✨</span>
                <p>Latin Temple Beauty Body Contouring treatments.</p>
              </div>
              <div className="wo-feature-item">
                <span className="wo-feature-icon">💪</span>
                <div>
                  <p><strong>Tailored Fitness Program:</strong></p>
                  <ul className="wo-inner-list">
                    <li><strong>Smart Fitness:</strong> Online group fitness & Pilates.</li>
                    <li><strong>Smart Strokes:</strong> Targeted swimming sessions.</li>
                    <li><strong>Aquafitness:</strong> High-energy group sessions.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="wo-cta-wrapper">
              <p>Ready to transform? Join the challenge here:</p>
              <a 
                href="https://latintemplebeauty.com.au/project/beauty-challenge-body-and-mind/?et_fb=1&PageSpeed=off" 
                target="_blank" 
                rel="noopener noreferrer"
                className="wo-primary-button"
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