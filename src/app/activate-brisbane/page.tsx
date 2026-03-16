'use client';
import EventRegistrationForm from '@/components/EventRegistrationForm'; // Ajusta la ruta
import Countdown from '@/components/Countdown';
import Image from 'next/image';
import { Link } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TRAINERS } from '@/data/trainers'; // Importamos la constante
import { SPONSORS } from '@/data/sponsors';
import { VENDORS } from '@/data/vendors';

export default function ActivateBrisbanePage() {



  // --- LÓGICA DEL CARRUSEL ---
  const [currentTrainerIndex, setCurrentTrainerIndex] = useState(0);

  const nextTrainer = () => {
    setCurrentTrainerIndex((prevIndex) => 
      prevIndex === TRAINERS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTrainer = () => {
    setCurrentTrainerIndex((prevIndex) => 
      prevIndex === 0 ? TRAINERS.length - 1 : prevIndex - 1
    );
  };

  const currentTrainer = TRAINERS[currentTrainerIndex];

  const [sponsorIndex, setSponsorIndex] = useState(0);


  // Estados del carrusel
const [itemsToShow, setItemsToShow] = useState(1); // 1 por defecto (móvil)

// useEffect para detectar el ancho de la pantalla
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setItemsToShow(4); // Laptop / Desktop
    } else if (window.innerWidth >= 768) {
      setItemsToShow(2); // Tablet (opcional)
    } else {
      setItemsToShow(1); // Móvil
    }
  };

  // Ejecutar al montar el componente
  handleResize();

  // Escuchar cambios de tamaño
  window.addEventListener('resize', handleResize);
  
  // Limpiar el evento al desmontar
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Funciones de navegación corregidas
const handleNextSponsor = () => {
  setSponsorIndex((prev) => {
    // Si ya no hay más "páginas" completas para mostrar, volvemos al principio
    if (prev >= SPONSORS.length - itemsToShow) {
      return 0;
    }
    return prev + 1;
  });
};

const handlePrevSponsor = () => {
  setSponsorIndex((prev) => {
    // Si estamos en el inicio, vamos al último grupo posible
    if (prev === 0) {
      return Math.max(0, SPONSORS.length - itemsToShow);
    }
    return prev - 1;
  });
};

const [vendorIndex, setVendorIndex] = useState(0);
const handleNextVendor = () => {
  setVendorIndex((prev) => {
    // Si ya no hay más "páginas" completas para mostrar, volvemos al principio
    if (prev >= VENDORS.length - itemsToShow) {
      return 0;
    }
    return prev + 1;
  });
};

const handlePrevVendor = () => {
  setVendorIndex((prev) => {
    // Si estamos en el inicio, vamos al último grupo posible
    if (prev === 0) {
      return Math.max(0, VENDORS.length - itemsToShow);
    }
    return prev - 1;
  });
};
  
  const scrollToForm = () => {
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* H1 oculto para SEO (opcional pero recomendado) */}
        <h1 className="sr-only" style={{ display: 'none' }}>Actívate Brisbane</h1>
  
        <Image 
          src="/images/activate-brisbane.png"          // Ruta a tu imagen en la carpeta public
          alt="Actívate Brisbane Logo"
          width={500}              // Ajusta el tamaño según tu diseño
          height={100}             // Ajusta el tamaño según tu diseño
          priority                 // Indica a Next.js que cargue esta imagen primero
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            display: 'block',
            margin: '0 auto'
          }}
        />
        </div>
          <p className="hero-subtitle">Move. Connect. Celebrate.</p>
          <div className="hero-details">
            <p>📅 Sunday 12 July 2026</p>
            <p>📍 Yeronga Eagles Football Club</p>
            <p>⏰ 8:00AM – 5:00PM</p>
            <p>📸 <a href="https://www.instagram.com/activatebrisbane" target="_blank"  style={{ textDecoration: 'underline', color: 'inherit' }}>
              Follow us for updates and exclusive content!
            </a></p>
          </div>
          
          <div className="cta-container">
            <button className="cta-button pulse" onClick={scrollToForm}>
              Tickets Coming Soon
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
        <div className="card-activate">
          <h2>💥 What is ACTÍVATE BRISBANE?</h2>
          <p>
            ACTÍVATE BRISBANE is a one-day immersive fitness and sports in Spanish experience created to inspire people of all ages and fitness levels to move more, connect more and feel stronger together.
          </p>
          <p>
            Founded by <strong>Irene Lalana</strong> (Irela Aqua & Fitness) and <strong>Belén Roldán</strong>, this event brings together group fitness, family runs, a soccer 5-a-side tournament, and wellness workshops.
          </p>
          <p style={{ marginTop: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>
            "This is not a passive event. You don't just attend — you participate."
          </p>
        </div>
      </section>

      {/* --- WHO IS IT FOR --- */}
      <section className="content-section alt-bg">
        <h2>🎯 Who is it for?</h2>
        <div className="features-grid">
          <div className="feature-item">✔ Spanish-Speaking Community in Brisbane</div>
          <div className="feature-item">✔ Fitness lovers</div>
          <div className="feature-item">✔ Soccer lovers</div>
          <div className="feature-item">✔ Runners</div>
          <div className="feature-item">✔ Exercise passionate</div>
          <div className="feature-item">✔ Active Families</div>
          <div className="feature-item">✔ Multicultural community</div>
          <div className="feature-item">✔ Pet Friendly!</div>
        </div>
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          No elite level required. Just bring your energy.
        </p>
      </section>

      {/* --- WHATS INCLUDED --- */}
      <section className="content-section">
        <h2>🏃 What's Included in Your Ticket?</h2>
        <div className="card_single">
            <ul>
              <li>Multiple 30-minute stage fitness sessions</li>
              <li>Entry to the Family Run / Walk</li>
              <li>Free fitness assessment opportunities</li>
              <li>Traditional games and activities</li>
              <li>Sponsor goodie bag</li>
              <li>Access to <a href="/soccer-tournament-rules" target="_blank">soccer 5-a-side tournament</a> (Soccer Team Pack Needed)</li>
              <li>Social soccer matches for kids, teens and families</li>
              <li>Food trucks and licensed bar access</li>
              <li>Raffle tickets</li>
              <li>Bibs</li>
            </ul>
        </div>
        <div className="cta-container" style={{marginTop: '30px'}}>
            <button className="cta-button" onClick={scrollToForm}>
              Tickets coming soon
            </button>
        </div>
      </section>

      {/* --- WHY MATTERS --- */}
      <section className="content-section alt-bg">
        <div className="card-activate">
            <h2>🤝 Why This Event Matters</h2>
            <p>
                Research shows that culturally inclusive, community-led events significantly increase participation in physical activity.
            </p>
            <p>
                ACTÍVATE BRISBANE creates a <strong>culturally safe space</strong>, movement in your own language, and real connection. This is about long-term impact — not just one day.
            </p>
        </div>
      </section>

      {/* --- EVENT DETAILS (Sección modificada) --- */}
      <section className="content-section details-grid">
         
         {/* TARJETA MODIFICADA CON CARRUSEL */}
         <div className="card-activate trainers-carousel-card">
            <h2>👩‍🏫 Confirmed Coaches</h2>
            <p className="section-subtitle">Qualified bilingual professionals leading high-energy sessions.</p>
            
            <div className="carousel-container">
              {/* Botón Anterior */}
              <button onClick={prevTrainer} className="carousel-btn prev-btn" aria-label="Previous trainer">
                &#10094; {/* Icono < */}
              </button>
              
              {/* Contenido del Entrenador Actual */}
              <div className="trainer-slide">
                <div className="trainer-photo-wrapper">
                  <Image 
                    src={currentTrainer.image} 
                    alt={`Trainer ${currentTrainer.name}`}
                    width={300} // Ajusta según diseño
                    height={300} // Ajusta según diseño
                    className="trainer-photo-round"
                  />
                </div>
                <div className="trainer-text">
                  <h3>{currentTrainer.name}</h3>
                  <h4>{currentTrainer.role}</h4>
                  <p>{currentTrainer.description}</p>
                </div>
              </div>

              {/* Botón Siguiente */}
              <button onClick={nextTrainer} className="carousel-btn next-btn" aria-label="Next trainer">
                &#10095; {/* Icono > */}
              </button>
            </div>
            
            {/* Indicadores de puntos (Dots) */}
            <div className="carousel-dots">
              {TRAINERS.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${index === currentTrainerIndex ? 'active' : ''}`}
                  onClick={() => setCurrentTrainerIndex(index)}
                ></span>
              ))}
            </div>
         </div>

        <div className="card-activate sponsors-card fade-in">
          <h2>🤝 Our Sponsors & Vendors</h2>
          <p>Proudly supported by local organisations committed to our community.</p>
          
          <p><strong>Main Sponsor</strong></p>
          <div className="main-sponsor-wrapper">
            <Image 
              src="/images/Art_House_logo.png" 
              alt="Art House" 
              width={400} 
              height={400} 
              className="main-sponsor-logo-img"
            />
          </div>

          <p style={{ marginTop: '20px' }}><strong>Additional Sponsors</strong></p>
          
          <div className="carousel-main-container">
            {/* Botón Anterior */}
            <button onClick={handlePrevSponsor} className="carousel-btn prev-btn" aria-label="Previous">
              &#10094;
            </button>

            <div className="carousel-window">
              <div 
                className="carousel-track" 
                style={{ 
                  transform: `translateX(-${sponsorIndex * (100 / itemsToShow)}%)`,
                  display: 'flex',
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {SPONSORS.map((sponsor, i) => (
                  <div 
                    className="carousel-item" 
                    key={i}
                    style={{ flex: `0 0 ${100 / itemsToShow}%` }} // Esto fuerza el ancho exacto
                  >
                    <div className="secondary-sponsor-wrapper">
                      <Image 
                        src={sponsor.logo} 
                        alt={sponsor.name}
                        width={300}
                        height={300}
                        className="sponsor-logo-img"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Siguiente */}
            <button onClick={handleNextSponsor} className="carousel-btn next-btn" aria-label="Next">
              &#10095;
            </button>
          </div>

          {/* Dots Dinámicos: solo mostramos dots hasta donde empieza el último grupo */}
          <div className="carousel-dots">
            {SPONSORS.slice(0, SPONSORS.length - (itemsToShow - 1)).map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i === sponsorIndex ? 'active' : ''}`}
                onClick={() => setSponsorIndex(i)}
              ></span>
            ))}
          </div>
          <p style={{ marginTop: '20px' }}><strong>Vendors</strong></p>
          
          <div className="carousel-main-container">
            {/* Botón Anterior */}
            <button onClick={handlePrevVendor} className="carousel-btn prev-btn" aria-label="Previous">
              &#10094;
            </button>

            <div className="carousel-window">
              <div 
                className="carousel-track" 
                style={{ 
                  transform: `translateX(-${vendorIndex * (100 / itemsToShow)}%)`,
                  display: 'flex',
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {VENDORS.map((vendor, i) => (
                  <div 
                    className="carousel-item" 
                    key={i}
                    style={{ flex: `0 0 ${100 / itemsToShow}%` }} // Esto fuerza el ancho exacto
                  >
                    <div className="secondary-sponsor-wrapper">
                      <Image 
                        src={vendor.logo} 
                        alt={vendor.name}
                        width={300}
                        height={300}
                        className="sponsor-logo-img"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Siguiente */}
            <button onClick={handleNextVendor} className="carousel-btn next-btn" aria-label="Next">
              &#10095;
            </button>
          </div>

          {/* Dots Dinámicos: solo mostramos dots hasta donde empieza el último grupo */}
          <div className="carousel-dots">
            {VENDORS.slice(0, VENDORS.length - (itemsToShow - 1)).map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i === vendorIndex ? 'active' : ''}`}
                onClick={() => setVendorIndex(i)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA & FORM --- */}
      <section id="registration-form" className="form-section">
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{color: '#f39304'}}>🎟 TICKETS WILL BE AVAILABLE SOON</h2>
            {/* <p>Early bird ends in...</p> */}
            
            {/* AQUÍ CARGAMOS TU FORMULARIO EXISTENTE */}
            <EventRegistrationForm />  
        </div>
      </section>

      {/* Banner flotante (Solo visible al hacer scroll hacia abajo si lo deseas, o fijo siempre) */}
      <div className="fixed-banner">
        <span>12 July 2026 - Tickets Selling Soon</span>
        {/* <button onClick={scrollToForm} style={{fontSize: '0.8em', margin: 0, padding: '5px 10px'}}>
            Buy Now
        </button> */}
      </div>

    </div>
  );
}