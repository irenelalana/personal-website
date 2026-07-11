'use client';
import EventRegistrationForm from '@/components/EventRegistrationForm'; // Ajusta la ruta
import Countdown from '@/components/Countdown';
import Image from 'next/image';
import { Link } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TRAINERS } from '@/data/trainers'; // Importamos la constante
import { SPONSORS } from '@/data/sponsors';
import { VENDORS } from '@/data/vendors';

// --- FUNCIÓN PARA MEZCLAR ARRAYS ---
const shuffleArray = (array: any) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// --- CONFIGURACIÓN DE LAS AGENDAS ---
const AGENDAS = [
  { id: 'kickoff', label: 'Kick-off', color: '#FF5E52', image: '/images/EVENT AGENDAS.png' },
  { id: 'fitness', label: 'Fitness', color: '#116490', image: '/images/FITNESS.png' },   // Rojo vibrante
  { id: 'wellness', label: 'Wellness', color: '#688A57', image: '/images/WELLNESS.png' }, // Morado bienestar
  { id: 'kids', label: 'Kids', color: '#E7A129', image: '/images/KIDS.png' },         // Azul celeste divertido
  { id: 'soccer', label: 'Soccer', color: '#E4CC32', image: '/images/Soccer_cruces.png' },     // Verde césped
];

export default function ActivateBrisbanePage() {
  // --- ESTADO PARA LA AGENDA ACTIVA ---
  const [activeAgenda, setActiveAgenda] = useState('kickoff');

  // --- ESTADOS DE DATOS MEZCLADOS ---
  const [displayTrainers, setDisplayTrainers] = useState(TRAINERS);
  const [displaySponsors, setDisplaySponsors] = useState(SPONSORS);
  const [displayVendors, setDisplayVendors] = useState(VENDORS);

  useEffect(() => {
    setDisplayTrainers(shuffleArray(TRAINERS));
    setDisplaySponsors(shuffleArray(SPONSORS));
    setDisplayVendors(shuffleArray(VENDORS));
  }, []);

  // --- LÓGICA DEL CARRUSEL DE TRAINERS ---
  const [currentTrainerIndex, setCurrentTrainerIndex] = useState(0);

  const nextTrainer = () => {
    setCurrentTrainerIndex((prevIndex) => 
      prevIndex === displayTrainers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTrainer = () => {
    setCurrentTrainerIndex((prevIndex) => 
      prevIndex === 0 ? displayTrainers.length - 1 : prevIndex - 1
    );
  };

  const currentTrainer = displayTrainers[currentTrainerIndex];

  // --- LÓGICA DE SPONSORS Y VENDORS ---
  const [sponsorIndex, setSponsorIndex] = useState(0);
  const [vendorIndex, setVendorIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setItemsToShow(4);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextTrainer();
      handleNextSponsor();
      handleNextVendor();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, displayTrainers, displaySponsors, displayVendors, itemsToShow]);

  const handleNextSponsor = () => {
    setSponsorIndex((prev) => {
      if (prev >= displaySponsors.length - itemsToShow) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrevSponsor = () => {
    setSponsorIndex((prev) => {
      if (prev === 0) {
        return Math.max(0, displaySponsors.length - itemsToShow);
      }
      return prev - 1;
    });
  };

  const handleNextVendor = () => {
    setVendorIndex((prev) => {
      if (prev >= displayVendors.length - itemsToShow) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrevVendor = () => {
    setVendorIndex((prev) => {
      if (prev === 0) {
        return Math.max(0, displayVendors.length - itemsToShow);
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
    <div className="landing-page" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 className="sr-only" style={{ display: 'none' }}>Actívate Brisbane</h1>
            <Image 
              src="/images/activate-brisbane.png"
              alt="Actívate Brisbane Logo"
              width={500}
              height={100}
              priority
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
            <p>📍<a href='https://www.google.com/maps/place/Yeronga+Eagles+Football+Club/@-27.5095064,153.0124028,17z/data=!3m1!4b1!4m6!3m5!1s0x6b915b28bd4f65cd:0x12cd3765e151ac6f!8m2!3d-27.5095064!4d153.0149831!16s%2Fg%2F11n0c49qd_?entry=ttu&g_ep=EgoyMDI2MDMyMi4wIKXMDSoASAFQAw%3D%3D' target="_blank" rel="noopener noreferrer">
                Yeronga Eagles Football Club
              </a>
            </p>
            <p>⏰ 8:00AM – 5:00PM</p>
            <p>
              <Image 
                src="/images/instagram_exercise_online_100x100.png"
                alt="Instagram logo" 
                width={20}
                height={20}
              />
              <a href="https://www.instagram.com/activatebrisbane" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
                Follow us for updates and exclusive content!
              </a>
            </p>
          </div>
          
          <div className="cta-container">
            <button className="cta-button pulse" onClick={scrollToForm}>
              Tickets Available!
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
          <h2>What is ACTÍVATE BRISBANE?</h2>
          <p>
            ACTÍVATE BRISBANE is a one-day immersive fitness and sports experience created to inspire people of all ages and fitness levels to move more, connect more and feel stronger together.
          </p>
          <p>
            This event brings together group fitness, family runs, a <a href="/inti-soccer-tournament-rules" target="_blank" rel="noopener noreferrer">soccer 5-a-side tournament</a>, and wellness workshops.
          </p>
          <p style={{ marginTop: '20px', fontStyle: 'italic', fontWeight: 'bold' }}>
            "This is not a passive event. You don't just attend — you participate."
          </p>

          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            gap: '15px', 
            marginTop: '25px', 
            paddingTop: '15px', 
            borderTop: '1px solid #eee'
          }}>
            <p style={{ margin: 0, lineHeight: '1.4' }}>
              The event will take place at the home of <a href='https://www.yerongaefc.com.au/' target='_blank' rel='noopener noreferrer'>Yeronga Eagles Football Club</a>, their soccer fields and amenities provide a professional and energetic environment for all our activities.
            </p>
            <Image 
              src="/images/yeronga-logo.jpg"
              alt="Yeronga Eagles FC Logo"
              width={150} 
              height={150}
              style={{ opacity: 0.8, flexShrink: 0, borderRadius: '50%' }}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            gap: '20px', 
            marginTop: '25px', 
            paddingTop: '15px', 
            borderTop: '1px solid #eee'
          }}>
            <Image 
              src="/images/Joe.png"
              alt="Joe Kelly, proudly supporting Actívate Brisbane"
              width={360}
              height={180}
              style={{ opacity: 0.8, flexShrink: 0, borderRadius: '5%' }}
            />
            <Image 
              src="/images/Activate Brisbane - Nicole Johnston Supporter Logo 2025.png"
              alt="Nicole Johnston, proudly supporting Actívate Brisbane"
              width={360}
              height={198}
              style={{ opacity: 0.8, flexShrink: 0, borderRadius: '5%' }}
            />
          </div>
        </div>
      </section>

      {/* --- WHO IS IT FOR --- */}
      <section className="content-section alt-bg">
        <h2>Who is it for?</h2>
        <div className="features-grid">
          <div className="feature-item">✔ Multicultural Communities in Brisbane</div>
          <div className="feature-item">✔ Fitness lovers</div>
          <div className="feature-item">✔ Soccer lovers</div>
          <div className="feature-item">✔ Runners</div>
          <div className="feature-item">✔ Exercise passionates</div>
          <div className="feature-item">✔ Active Families</div>
          <div className="feature-item">✔ Spanish-Speaking Communities</div>
          <div className="feature-item">✔ Pet Friendly!</div>
        </div>
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          No elite level required. Just bring your energy.
        </p>
      </section>

      {/* --- WHATS INCLUDED --- */}
      <section className="content-section">
        <h2>What's Included in Your Ticket?</h2>
        <div className="desktop-inclusions">
          <img src="/images/ticket-inclusions.png" alt="Ticket Inclusions" style={{maxWidth: "100%"}} />
        </div>
        <div className="mobile-inclusions">
          <img src="/images/ticket-inclusions-mobile.png" alt="Ticket Inclusions" style={{maxWidth: "100%"}} />
        </div>
        <div className="cta-container" style={{marginTop: '30px'}}>
            <button className="cta-button" onClick={scrollToForm}>
              Purchase Your Ticket Now
            </button>
        </div>
      </section>

      {/* --- EVENT AGENDAS (NUEVA SECCIÓN RECOMENDADA) --- */}
      <section className="content-section alt-bg">
        <h2 style={{ marginBottom: '10px' }}>Event Agendas</h2>
        <p style={{ textAlign: 'center', marginBottom: '25px', color: '#64748b' }}>
          Explore our tailored lineups. Click on any category to see its full schedule!
        </p>

        {/* Línea horizontal de opciones con colores diferenciados */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '30px', 
          flexWrap: 'wrap',
          padding: '0 10px'
        }}>
          {AGENDAS.map((agenda) => {
            const isSelected = activeAgenda === agenda.id;
            return (
              <button
                key={agenda.id}
                onClick={() => setActiveAgenda(agenda.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '30px',
                  border: isSelected ? `2px solid ${agenda.color}` : '2px solid #cbd5e1',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? agenda.color : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                  outline: 'none'
                }}
              >
                {agenda.label}
              </button>
            );
          })}
        </div>

        {/* Contenedor de las imágenes Portrait (Solo una visible a la vez) */}
        <div style={{ 
          maxWidth: '480px', 
          margin: '0 auto', 
          padding: '0 15px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {AGENDAS.map((agenda) => (
            <div 
              key={agenda.id} 
              style={{ 
                display: activeAgenda === agenda.id ? 'block' : 'none',
                width: '100%',
                animation: 'fadeIn 0.4s ease'
              }}
            >
              <Image
                src={agenda.image}
                alt={`Agenda ${agenda.label}`}
                width={450}
                height={630} // Proporción portrait estándarizada
                style={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  display: 'block'
                }}
              />
            </div>
          ))}
        </div>
        {/* --- MAPA --- */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.15rem', margin: '0 0 12px', color: '#0f172a' }}>Event Map</h2>
                  <Image
                    src="/images/event-map.jpg"
                    alt="Actívate Brisbane Event Map"
                    width={500}
                    height={400}
                    style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                  />
              </div>
      </section>

      {/* --- WHY MATTERS (Le quitamos alt-bg para mantener la alternancia limpia) --- */}
      <section className="content-section">
        <div className="card-activate">
            <h2>Why This Event Matters</h2>
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
         {/* TARJETA MODIFICADA CON CARRUSEL DE TRAINERS (Aleatorio) */}
         <div className="card-activate trainers-carousel-card">
            <h2>Confirmed Sport and Health Professionals</h2>
            <p className="section-subtitle">Qualified bilingual professionals leading high-energy sessions and workshops.</p>
            
            <div className="carousel-container">
              <button onClick={prevTrainer} className="carousel-btn prev-btn photo-aligned-btn" aria-label="Previous trainer">
                ❮
              </button>
              
              <div className="trainer-slide">
                <div className="trainer-photo-wrapper">
                  <a href={currentTrainer.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={currentTrainer.image} 
                    alt={`Trainer ${currentTrainer.name}`}
                    width={300}
                    height={300}
                    className="trainer-photo-round"
                  />
                  </a>
                </div>
                <div className="trainer-text">
                  <h3>{currentTrainer.name}</h3>
                  <h4>{currentTrainer.role}</h4>
                  <p>{currentTrainer.description}</p>
                </div>
              </div>

              <button onClick={nextTrainer} className="carousel-btn next-btn photo-aligned-btn" aria-label="Next trainer">
                ❯
              </button>
            </div>
            
            <div className="carousel-dots">
              {displayTrainers.map((_, index) => (
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
            <a href="https://welcomestudentsgroup.com/" target="_blank" rel="noopener noreferrer">
              <Image 
                src="/images/welcome_main_sponsor_logo.png" 
                alt="Welcome Main Sponsor of Actívate Brisbane" 
                width={400} 
                height={400} 
                className="main-sponsor-logo-img"
            />
            </a>
          </div>

          <p style={{ marginTop: '40px', marginBottom: '0px' }}><strong>Additional Sponsors</strong></p>
          
          <div className="carousel-main-container">
            <button onClick={handlePrevSponsor} className="carousel-btn prev-btn photo-aligned-btn" aria-label="Previous">
              ❮
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
                {displaySponsors.map((sponsor, i) => (
                  <div 
                    className="carousel-item" 
                    key={i}
                    style={{ flex: `0 0 ${100 / itemsToShow}%` }}
                  >
                    <div className="secondary-sponsor-wrapper">
                      <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                        <Image 
                          src={sponsor.logo} 
                          alt={sponsor.name}
                          width={300}
                          height={200}
                          className="sponsor-logo-img"
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleNextSponsor} className="carousel-btn next-btn photo-aligned-btn" aria-label="Next">
              ❯
            </button>
          </div>

          <div className="carousel-dots">
            {displaySponsors.slice(0, displaySponsors.length - (itemsToShow - 1)).map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i === sponsorIndex ? 'active' : ''}`}
                onClick={() => setSponsorIndex(i)}
              ></span>
            ))}
          </div>

          <p style={{ marginTop: '40px', marginBottom: '0px' }}><strong>Vendors</strong></p>
          
          <div className="carousel-main-container">
            <button onClick={handlePrevVendor} className="carousel-btn prev-btn photo-aligned-btn" aria-label="Previous">
              ❮
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
                {displayVendors.map((vendor, i) => (
                  <div 
                    className="carousel-item" 
                    key={i}
                    style={{ flex: `0 0 ${100 / itemsToShow}%` }}
                  >
                    <div className="secondary-sponsor-wrapper">
                      <a href={vendor.url} target="_blank" rel="noopener noreferrer">
                        <Image 
                          src={vendor.logo} 
                          alt={vendor.name}
                          width={300}
                          height={200}
                          className="vendor-logo-img"
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleNextVendor} className="carousel-btn next-btn photo-aligned-btn" aria-label="Next">
              ❯
            </button>
          </div>

          <div className="carousel-dots">
            {displayVendors.slice(0, displayVendors.length - (itemsToShow - 1)).map((_, i) => (
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
            <h1 style={{color: '#f39304'}}>🎟 Tickets</h1>
            <h2 style={{ color: '#94a3b8', textDecoration: 'line-through' }}>Launch Special Offer!! Best price before April 15th!!</h2>
            <h2 style={{color: '#94a3b8', textDecoration: 'line-through'}}>Volando voy!! Until May 31st (Adults $29, Soccer Team $250)</h2>
            <h2 style={{color: '#94a3b8', textDecoration: 'line-through'}}>Falto yo, contad conmigo!! Until July 10th (Adults $39, Soccer Team $325)</h2>
            <h2 style={{color: '#b95a02', fontSize: '1.2rem', border: '2px solid #d97803', padding: '10px', borderRadius: '5px'}}>Me pilla el toro!! (Adults $49, Soccer Team $410)</h2>
            <EventRegistrationForm />  
        </div>
      </section>

      {/* Banner flotante */}
      <div className="fixed-banner">
        <span>Me pilla el toro!</span>
        <button onClick={scrollToForm} style={{fontSize: '0.8em', margin: 0, padding: '5px 10px'}}>
            Buy Now
        </button>
      </div>

    </div>
  );
}