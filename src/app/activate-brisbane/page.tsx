'use client';
import EventRegistrationForm from '@/components/EventRegistrationForm'; // Ajusta la ruta
import Countdown from '@/components/Countdown';
import Image from 'next/image';

export default function ActivateBrisbanePage() {
  
  const scrollToForm = () => {
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="landing-page">
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>ACTÍVATE BRISBANE 2026</h1>
          <p className="hero-subtitle">Move. Connect. Celebrate.</p>
          <div className="hero-details">
            <p>📅 12 July 2026</p>
            <p>📍 Yeronga Eagles Football Club</p>
            <p>⏰ 8:00AM – 5:00PM</p>
          </div>
          
          <div className="cta-container">
            <button onClick={scrollToForm} className="cta-button pulse">
              GET TICKETS NOW
            </button>
          </div>
        </div>
      </section>

      {/* --- COUNTDOWN --- */}
      <section className="countdown-section">
        <h3>Event starts in:</h3>
        <Countdown targetDate="2026-07-12T08:00:00" />
      </section>

      {/* --- WHAT IS IT --- */}
      <section className="content-section">
        <div className="card">
          <h2>💥 What is ACTÍVATE BRISBANE?</h2>
          <p>
            ACTÍVATE BRISBANE is a one-day immersive fitness and sports in Spanish experience created to inspire people of all ages and fitness levels to move more, connect more and feel stronger together.
          </p>
          <p>
            Founded by <strong>Irene Lalana</strong> (Irela Aqua & Fitness) and <strong>Belén Roldán</strong>, this event brings together group fitness, family runs, mini football, and wellness workshops.
          </p>
          <p style={{ marginTop: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>
            "This is not a passive event. You don’t just attend — you participate."
          </p>
        </div>
      </section>

      {/* --- WHO IS IT FOR --- */}
      <section className="content-section alt-bg">
        <h2>🎯 Who is it for?</h2>
        <div className="features-grid">
          <div className="feature-item">✔ Spanish Spoken Community in Brisbane</div>
          <div className="feature-item">✔ Fitness lovers</div>
          <div className="feature-item">✔ Soccer lovers</div>
          <div className="feature-item">✔ Runners</div>
          <div className="feature-item">✔ Exercise passionate</div>
          <div className="feature-item">✔ Active Families</div>
          <div className="feature-item">✔ Multicultural community</div>
        </div>
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          No elite level required. Just bring your energy.
        </p>
      </section>

      {/* --- WHATS INCLUDED --- */}
      <section className="content-section">
        <h2>🏃 What’s Included in Your Ticket?</h2>
        <div className="card_single">
            <ul>
              <li>Multiple 30-minute stage fitness sessions</li>
              <li>Entry to the Family Run / Walk</li>
              <li>Access to mini football tournament</li>
              <li>Free fitness assessment opportunities</li>
              <li>Sponsor goodie bag</li>
              <li>Food trucks and licensed bar access</li>
            </ul>
        </div>
        <div className="cta-container" style={{marginTop: '30px'}}>
            <button onClick={scrollToForm}>SECURE YOUR SPOT</button>
        </div>
      </section>

      {/* --- WHY MATTERS --- */}
      <section className="content-section alt-bg">
        <div className="card">
            <h2>🤝 Why This Event Matters</h2>
            <p>
                Research shows that culturally inclusive, community-led events significantly increase participation in physical activity.
            </p>
            <p>
                ACTÍVATE BRISBANE creates a <strong>culturally safe space</strong>, movement in your own language, and real connection. This is about long-term impact — not just one day.
            </p>
        </div>
      </section>

      {/* --- EVENT DETAILS --- */}
      <section className="content-section details-grid">
         <div className="card">
            <h2>👩‍🏫 Meet the Trainers</h2>
            <p>Qualified bilingual fitness professionals leading high-energy sessions.</p>
         </div>
         <div className="card">
            <h2>🍴 Food & Community</h2>
            <p>Enjoy food vendors, healthy options, community stalls and a licensed bar.</p>
         </div>
      </section>

      {/* --- FINAL CTA & FORM --- */}
      <section id="registration-form" className="form-section">
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{color: '#f39304'}}>🎟 TICKETS NOW AVAILABLE</h2>
            <p>Spots are limited to approximately 700 participants.</p>
            
            {/* AQUÍ CARGAMOS TU FORMULARIO EXISTENTE */}
            <EventRegistrationForm />
        </div>
      </section>

      {/* Banner flotante (Solo visible al hacer scroll hacia abajo si lo deseas, o fijo siempre) */}
      <div className="fixed-banner">
        <span>12 July 2026 – Tickets Selling Now</span>
        <button onClick={scrollToForm} style={{fontSize: '0.8em', margin: 0, padding: '5px 10px'}}>
            Buy Now
        </button>
      </div>

    </main>
  );
}