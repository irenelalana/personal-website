'use client'

import Link from 'next/link';

export default function TournamentRulesPage() {
  return (
    <main className="landing-page">
      {/* --- HERO SECTION --- */}
      <section className="hero-section small-hero">
        <div className="hero-content">
          <h1>Soccer 5-a-side Tournament Rules</h1>
          <p className="hero-subtitle">Actívate Brisbane 2026</p>
        </div>
      </section>

      {/* --- INTRO --- */}
      <section className="content-section">
        <div className="card-activate">
          <h2>General Spirit</h2>
          <p>
            The Actívate Brisbane Soccer Tournament is designed to promote community, sportsmanship, and healthy competition. While rules are based on Futsal, they are adapted for grass and a fast-paced knockout format, ensuring an exciting experience for players and spectators alike.
            </p>

            <p>
              Please note: By registering, you are not just signing up for the soccer tournament; your ticket grants you full access to the entire event. You'll be able to enjoy all the other activities scheduled throughout the day (yout tournament matches permitting), soak up the vibrant atmosphere, and connect with our wonderful community. It’s more than a competition—it’s a complete day out for everyone!
          </p>
        </div>
      </section>

      {/* --- 1. FIELD & EQUIPMENT --- */}
      <section className="content-section alt-bg">
        <h2>1. Field & Equipment</h2>
        <div className="features-grid">
          <div className="feature-item"><strong>Dimensions:</strong> 30m x 20m grass pitch.</div>
          <div className="feature-item"><strong>Boundaries:</strong> All lines delimited by cones.</div>
          <div className="feature-item"><strong>Penalty Area:</strong> Full width and 6m deep.</div>
          <div className="feature-item"><strong>Penalty Spot:</strong> 6m from center of the goal.</div>
        </div>
      </section>

      {/* --- 2. FORMAT & TIMING --- */}
      <section className="content-section alt-bg">    
          <h2>2. Tournament Format & Timing</h2>
          <div className="card_single">
          <ul className="rules-list">
            <li><strong>Bracket:</strong> 16 teams max. Direct knockout format.</li>
            <li><strong>Match Time:</strong> Two halves of 10 mins (No half-time break).</li>
            <li><strong>Tie-break:</strong> 3 penalties per team, then sudden death.</li>
            <li><strong>Duration:</strong> The tournament will start at 9:00am and will finish approximately at 2:00pm.</li>
          </ul>
          </div>
      </section>

      {/* --- 3. GAMEPLAY --- */}
      <section className="content-section alt-bg">
        <h2>3. Gameplay Rules</h2>
        <div className="card_single">
          <ul className="rules-list">
            <li><strong>Team:</strong> 1 Goalkeeper + 4 Outfielders.</li>
            <li><strong>Subs:</strong> Unlimited rolling subs (must be authorized by Referee).</li>
            <li><strong>Throw-ins:</strong> Taken with <strong>hands</strong>.</li>
            <li><strong>Corners:</strong> Taken with the <strong>foot</strong>.</li>
            <li><strong>Fouls:</strong> All are <strong>Direct Free Kicks</strong>.</li>
            <li><strong>Penalties:</strong> Fouls inside the rival area result in a penalty kick.</li>
          </ul>
        </div>
      </section>

      {/* --- 4. DISCIPLINE --- */}
      <section className="content-section">
        <div className="card-activate red-border">
          <h2 style={{ color: '#d9534f' }}>4. Discipline</h2>
          <p>No yellow/red cards. The Referee will expel players for unsportsmanlike conduct.</p>
          <ul className="rules-list" style={{marginTop: '10px'}}>
            <li>Expelled players cannot play the remainder of the current match.</li>
            <li>The team must play with <strong>one less player</strong> for that match.</li>
            <li>Expulsion results in a <strong>1-match ban</strong> for the next round.</li>
          </ul>
        </div>
      </section>

      {/* --- 5. PRIZES & AWARDS --- */}
      <section className="content-section alt-bg">
        <div className="card" style={{textAlign: 'center', border: '2px dashed #ccc'}}>
          <h2>🏆 Prizes & Awards</h2>
          <p>We are currently finalizing our sponsors to bring you the best rewards!</p>
          <p style={{fontStyle: 'italic', color: '#02678F'}}>Winners, runners-up, and top scorer awards will be announced soon.</p>
        </div>
      </section>

      <section className="form-section">
        <div className="cta-container">
          <Link href="/activate-brisbane#registration-form" className="cta-button">
            BACK TO REGISTRATION
          </Link>
        </div>
      </section>
    </main>
  );
}