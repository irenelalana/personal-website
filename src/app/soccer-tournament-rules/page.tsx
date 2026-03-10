'use client'

import { useState } from 'react';
import Link from 'next/link';

// Definimos la estructura para que TypeScript no se queje
interface Translation {
  title: string;
  subtitle: string;
  navBack: string;
  sections: {
    spirit: { title: string; p1: string; p2: string };
    field: { title: string; dim: string; bound: string; area: string; spot: string };
    format: { 
      title: string; struct: string; adv: string; timeG: string; timeK: string; 
      score: string; tieTitle: string; tie1: string; tie2: string; tie3: string; 
      tieKO: string; schedule: string;
    };
    table: { phase: string; start: string; gStage: string; qFinal: string; sFinal: string; gFinal: string };
    gameplay: { 
      title: string; team: string; kit: string; field: string; subs: string; 
      throwIns: string; corners: string; fouls: string; penalties: string; diversity: string;
    };
    discipline: { title: string; p1: string; item1: string; item2: string; item3: string };
    prizes: { title: string; p1: string; p2: string };
  }
}

const content: Record<'en' | 'es', Translation> = {
  en: {
    title: "Soccer 5-a-side Tournament Rules",
    subtitle: "Actívate Brisbane 2026",
    navBack: "BACK TO REGISTRATION",
    sections: {
      spirit: {
        title: "General Spirit",
        p1: "The Actívate Brisbane Soccer Tournament is designed to promote community, sportsmanship, and healthy competition. While rules are based on Futsal, they are adapted for grass and a fast-paced format, ensuring an exciting experience for players and spectators alike.",
        p2: "Please note: By registering, you are not just signing up for the soccer tournament; your ticket grants you full access to the entire event. You'll be able to enjoy all the other activities scheduled throughout the day, soak up the vibrant atmosphere, and connect with our wonderful community."
      },
      field: {
        title: "1. Field & Equipment",
        dim: "Dimensions: 30m x 20m grass pitch.",
        bound: "Boundaries: All lines delimited by cones.",
        area: "Penalty Area: Full width and 6m deep.",
        spot: "Penalty Spot: 6m from centre of the goal."
      },
      format: {
        title: "2. Tournament Format & Timing",
        struct: "Structure: Group Stage (4 teams per group) followed by Quarter-finals, Semi-finals, and Final.",
        adv: "Advancement: The top 2 teams from each group advance to the Knockout phase.",
        timeG: "Group Stage Timing: 16-minute matches (Two halves of 8 mins). 4-minute transition.",
        timeK: "Knockout Phase Timing: Quarter-finals, Semis, and Final are 20-minute matches (Two halves of 10 mins).",
        score: "Scoring (Group Stage): Win = 3 pts, Draw = 1 pt, Loss = 0 pts.",
        tieTitle: "Group Stage Tie-breakers:",
        tie1: "1. Head-to-head: Result of the match between the tied teams.",
        tie2: "2. Goal Difference: Highest overall goal difference.",
        tie3: "3. Goals For: Most goals scored throughout the group stage.",
        tieKO: "Tie-break (Knockout only): If level at full time, 3 penalties per team, then sudden death.",
        schedule: "Schedule: The tournament starts at 9:00 am and will finish approximately at 4:00 pm."
      },
      table: {
        phase: "Tournament Phase",
        start: "Start Time",
        gStage: "Group Stage",
        qFinal: "Quarter-finals",
        sFinal: "Semi-finals",
        gFinal: "Grand Final"
      },
      gameplay: {
        title: "3. Gameplay Rules",
        team: "Team: All players must be adults (18+), from 5 to 8 players per team.",
        kit: "Kit: All players must wear the same coloured jersey.",
        field: "On the field: One goalkeeper and four outfield players.",
        subs: "Subs: Unlimited rolling subs (must be authorised by Referee).",
        throwIns: "Throw-ins: Taken with hands.",
        corners: "Corners: Taken with the foot.",
        fouls: "Fouls: All are Direct Free Kicks.",
        penalties: "Penalties: Fouls inside the rival area result in a penalty kick.",
        diversity: "Diversity: Male, female, and mixed teams are welcome."
      },
      discipline: {
        title: "4. Discipline",
        p1: "No yellow/red cards. The Referee will expel players for unsportsmanlike conduct.",
        item1: "Expelled players cannot play the remainder of the current match.",
        item2: "The team must play with one less player for that match.",
        item3: "Expulsion results in a 1-match ban for the next round."
      },
      prizes: {
        title: "🏆 Prizes & Awards",
        p1: "We are currently finalising our sponsors to bring you the best rewards!",
        p2: "Winners and runners-up awards will be announced soon."
      }
    }
  },
  es: {
    title: "Reglamento del Torneo de Fútbol 5",
    subtitle: "Actívate Brisbane 2026",
    navBack: "VOLVER AL REGISTRO",
    sections: {
      spirit: {
        title: "Espíritu General",
        p1: "El Torneo de Fútbol Actívate Brisbane está diseñado para promover la comunidad, el espíritu deportivo y la competencia sana. Aunque las reglas se basan en el Futsal, están adaptadas para césped y un formato rápido, asegurando una experiencia emocionante para jugadores y espectadores.",
        p2: "Nota: Al registrarte, no solo te apuntas al torneo; tu entrada te da acceso completo a todo el evento. Podrás disfrutar de todas las actividades programadas, el ambiente y conectar con nuestra comunidad."
      },
      field: {
        title: "1. Campo y Equipamiento",
        dim: "Dimensiones: Campo de césped de 30m x 20m.",
        bound: "Límites: Todas las líneas delimitadas por conos.",
        area: "Área de Penalti: Ancho total y 6m de profundidad.",
        spot: "Punto de Penalti: a 6m del centro de la portería."
      },
      format: {
        title: "2. Formato y Tiempos",
        struct: "Estructura: Fase de Grupos (4 equipos por grupo) seguida de Cuartos, Semifinales y Final.",
        adv: "Clasificación: Los 2 mejores de cada grupo pasan a la fase eliminatoria.",
        timeG: "Fase de Grupos: Partidos de 16 min (dos partes de 8 min). Transición de 4 min entre partidos.",
        timeK: "Eliminatorias: Cuartos, Semis y Final son partidos de 20 min (dos partes de 10 min).",
        score: "Puntuación (Grupos): Victoria = 3 pts, Empate = 1 pt, Derrota = 0 pts.",
        tieTitle: "Desempate en Fase de Grupos:",
        tie1: "1. Enfrentamiento directo: Resultado del partido entre los equipos empatados.",
        tie2: "2. Diferencia de Goles (Gol Average): Mejor diferencia total.",
        tie3: "3. Goles a Favor: Más goles marcados en toda la fase de grupos.",
        tieKO: "Desempate (Solo Eliminatorias): Si hay empate, 3 penaltis por equipo, luego muerte súbita.",
        schedule: "Horario: El torneo comienza a las 9:00 am y finalizará sobre las 4:00 pm."
      },
      table: {
        phase: "Fase del Torneo",
        start: "Hora de Inicio",
        gStage: "Fase de Grupos",
        qFinal: "Cuartos de Final",
        sFinal: "Semifinales",
        gFinal: "Gran Final"
      },
      gameplay: {
        title: "3. Reglas de Juego",
        team: "Equipo: Todos los jugadores deben ser adultos (18+), de 5 a 8 por equipo.",
        kit: "Equipación: Todos los jugadores deben vestir el mismo color de camiseta.",
        field: "En el campo: Un portero y cuatro jugadores de campo.",
        subs: "Cambios: Ilimitados y rotativos (deben ser autorizados por el árbitro).",
        throwIns: "Saques de banda: Se realizan con las manos.",
        corners: "Córners: Se realizan con el pie.",
        fouls: "Faltas: Todas son Tiros Libres Directos.",
        penalties: "Penaltis: Las faltas dentro del área rival resultan en penalti.",
        diversity: "Diversidad: Bienvenidos equipos masculinos, femeninos y mixtos."
      },
      discipline: {
        title: "4. Disciplina",
        p1: "Sin tarjetas amarillas/rojas. El árbitro expulsará a jugadores por conducta antideportiva.",
        item1: "Jugadores expulsados no pueden jugar el resto del partido actual.",
        item2: "El equipo debe jugar con un jugador menos ese partido.",
        item3: "La expulsión conlleva un partido de sanción para la siguiente ronda."
      },
      prizes: {
        title: "🏆 Premios",
        p1: "Estamos finalizando los patrocinadores para traeros las mejores recompensas.",
        p2: "Los premios para ganadores y subcampeones se anunciarán pronto."
      }
    }
  }
};

export default function TournamentRulesPage() {
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const t = content[lang];

  return (
    <main className="landing-page">
      <div style={{ 
        position: 'fixed', top: '20px', right: '20px', zIndex: 1000, 
        display: 'flex', gap: '10px', backgroundColor: 'rgba(255,255,255,0.9)',
        padding: '10px', borderRadius: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <button onClick={() => setLang('en')} style={{ border: 'none', background: lang === 'en' ? '#02678F' : 'transparent', color: lang === 'en' ? '#fff' : '#02678F', padding: '5px 12px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>EN</button>
        <button onClick={() => setLang('es')} style={{ border: 'none', background: lang === 'es' ? '#02678F' : 'transparent', color: lang === 'es' ? '#fff' : '#02678F', padding: '5px 12px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>ES</button>
      </div>

      <section className="hero-section small-hero">
        <div className="hero-content">
          <h1>{t.title}</h1>
          <p className="hero-subtitle">{t.subtitle}</p>
        </div>
      </section>

      <section className="content-section">
        <div className="card-activate">
          <h2>{t.sections.spirit.title}</h2>
          <p>{t.sections.spirit.p1}</p>
          <p>{t.sections.spirit.p2}</p>
        </div>
      </section>

      <section className="content-section alt-bg">
        <h2>{t.sections.field.title}</h2>
        <div className="features-grid">
          <div className="feature-item"><strong>{t.sections.field.dim}</strong></div>
          <div className="feature-item"><strong>{t.sections.field.bound}</strong></div>
          <div className="feature-item"><strong>{t.sections.field.area}</strong></div>
          <div className="feature-item"><strong>{t.sections.field.spot}</strong></div>
        </div>
      </section>

      <section className="content-section alt-bg">    
          <h2>{t.sections.format.title}</h2>
          <div className="card_single">
          <ul className="rules-list">
            <li><strong>{t.sections.format.struct}</strong></li>
            <li><strong>{t.sections.format.adv}</strong></li>
            <li>{t.sections.format.timeG}</li>
            <li>{t.sections.format.timeK}</li>
            <li>{t.sections.format.score}</li>
            <li style={{ listStyle: 'none', marginTop: '10px' }}>
              <strong>{t.sections.format.tieTitle}</strong>
              <ul style={{ marginLeft: '20px', fontSize: '0.95rem', color: '#555' }}>
                  <li>{t.sections.format.tie1}</li>
                  <li>{t.sections.format.tie2}</li>
                  <li>{t.sections.format.tie3}</li>
              </ul>
            </li>
            <li>{t.sections.format.tieKO}</li>
            <li>{t.sections.format.schedule}</li>
          </ul>
          </div>

          <div style={{ marginTop: '25px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ backgroundColor: '#02678F', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px' }}>{t.table.phase}</th>
                  <th style={{ padding: '12px 15px' }}>{t.table.start}</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 15px' }}>{t.table.gStage}</td>
                  <td style={{ padding: '10px 15px' }}>9:00 am</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 15px' }}>{t.table.qFinal}</td>
                  <td style={{ padding: '10px 15px' }}>1:30 pm</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px 15px' }}>{t.table.sFinal}</td>
                  <td style={{ padding: '10px 15px' }}>2:45 pm</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 15px', fontWeight: 'bold', color: '#f39304' }}>{t.table.gFinal}</td>
                  <td style={{ padding: '10px 15px', fontWeight: 'bold', color: '#f39304' }}>3:30 pm</td>
                </tr>
              </tbody>
            </table>
          </div>
      </section>

      <section className="content-section alt-bg">
        <h2>{t.sections.gameplay.title}</h2>
        <div className="card_single">
          <ul className="rules-list">
            <li><strong>{t.sections.gameplay.team}</strong></li>
            <li><strong>{t.sections.gameplay.kit}</strong></li>
            <li><strong>{t.sections.gameplay.field}</strong></li>
            <li><strong>{t.sections.gameplay.subs}</strong></li>
            <li><strong>{t.sections.gameplay.throwIns}</strong></li>
            <li><strong>{t.sections.gameplay.corners}</strong></li>
            <li><strong>{t.sections.gameplay.fouls}</strong></li>
            <li><strong>{t.sections.gameplay.penalties}</strong></li>
            <li>{t.sections.gameplay.diversity}</li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="card-activate red-border">
          <h2 style={{ color: '#d9534f' }}>{t.sections.discipline.title}</h2>
          <p>{t.sections.discipline.p1}</p>
          <ul className="rules-list" style={{marginTop: '10px'}}>
            <li>{t.sections.discipline.item1}</li>
            <li>{t.sections.discipline.item2}</li>
            <li>{t.sections.discipline.item3}</li>
          </ul>
        </div>
      </section>

      <section className="content-section alt-bg">
        <div className="card" style={{textAlign: 'center', border: '2px dashed #ccc'}}>
          <h2>{t.sections.prizes.title}</h2>
          <p>{t.sections.prizes.p1}</p>
          <p style={{fontStyle: 'italic', color: '#02678F'}}>{t.sections.prizes.p2}</p>
        </div>
      </section>

      <section className="form-section">
        <div className="cta-container">
          <Link href="/activate-brisbane#registration-form" className="cta-button">
            {t.navBack}
          </Link>
        </div>
      </section>
    </main>
  );
}
