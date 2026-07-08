'use client';
import Image from 'next/image';
import { useState } from 'react';

// --- CONFIGURACIÓN DE LAS AGENDAS (misma data que la landing page) ---
const AGENDAS = [
  { id: 'kickoff', label: 'Kick-off', color: '#FF5E52', image: '/images/EVENT AGENDAS.png' },
  { id: 'fitness', label: 'Fitness', color: '#116490', image: '/images/FITNESS.png' },   // Rojo vibrante
  { id: 'wellness', label: 'Wellness', color: '#688A57', image: '/images/WELLNESS.png' }, // Morado bienestar
  { id: 'kids', label: 'Kids', color: '#E7A129', image: '/images/KIDS.png' },         // Azul celeste divertido
  { id: 'soccer', label: 'Soccer', color: '#E4CC32', image: '/images/SOCCER.png' },     // Verde césped
];
export default function MapAndAgendaPage() {
  const [activeAgenda, setActiveAgenda] = useState('kickoff');

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', padding: '20px 16px 60px' }}>
      {/* --- HEADER --- */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Image
          src="/images/activate-brisbane.png"
          alt="Actívate Brisbane"
          width={280}
          height={56}
          priority
          style={{ maxWidth: '80%', height: 'auto', margin: '0 auto', display: 'block' }}
        />
        <p style={{ margin: '10px 0 0', color: '#64748b', fontSize: '0.95rem' }}>
          Sunday 12 July 2026 · Yeronga Eagles FC
        </p>
      </div>

      {/* --- MAPA --- */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.15rem', margin: '0 0 12px', color: '#0f172a' }}>📍 Event Map</h2>
          <Image
            src="/images/event-map.jpg"
            alt="Actívate Brisbane Event Map"
            width={500}
            height={400}
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
      </section>

      {/* --- AGENDA --- */}
      <section>
        <h2 style={{ fontSize: '1.15rem', margin: '0 0 6px', color: '#0f172a' }}>🗓 Today's Agenda</h2>
        <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '0.9rem' }}>
          Tap a category to see its schedule.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            marginBottom: '20px'
          }}
        >
          {AGENDAS.map((agenda) => {
            const isSelected = activeAgenda === agenda.id;
            return (
              <button
                key={agenda.id}
                onClick={() => setActiveAgenda(agenda.id)}
                style={{
                  padding: '12px 6px',
                  borderRadius: '10px',
                  border: isSelected ? `2px solid ${agenda.color}` : '2px solid #e2e8f0',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? agenda.color : '#ffffff',
                  color: isSelected ? '#ffffff' : '#475569',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                {agenda.label}
              </button>
            );
          })}
        </div>

        {/* Imagen de agenda activa */}
        {AGENDAS.map((agenda) => (
          <div
            key={agenda.id}
            style={{
              display: activeAgenda === agenda.id ? 'block' : 'none',
              width: '100%'
            }}
          >
            <Image
              src={agenda.image}
              alt={`Agenda ${agenda.label}`}
              width={450}
              height={630}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                display: 'block'
              }}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
