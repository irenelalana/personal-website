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
            The Actívate Brisbane Soccer Tournament is designed to promote community, sportsmanship, and healthy competition. While rules are based on Futsal, they are adapted for grass and a fast-paced format, ensuring an exciting experience for players and spectators alike.
          </p>
          <p>
            Please note: By registering, you are not just signing up for the soccer tournament; your ticket grants you full access to the entire event. You'll be able to enjoy all the other activities scheduled throughout the day, soak up the vibrant atmosphere, and connect with our wonderful community.
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

      {/* --- 2. TOURNAMENT FORMAT & TIMING --- */}
      <section className="content-section alt-bg">    
          <h2>2. Tournament Format & Timing</h2>
          <div className="card_single">
          <ul className="rules-list">
            <li><strong>Structure:</strong> Group Stage (4 teams per group) followed by Quarter-finals, Semi-finals, and Final.</li>
            <li><strong>Advancement:</strong> The <strong>top 2 teams</strong> from each group advance to the Knockout phase.</li>
            <li><strong>Group Stage Timing:</strong> 16-minute matches (Two halves of 8 mins). There is a 4-minute transition before the next match starts.</li>
            <li><strong>Knockout Phase Timing:</strong> Quarter-finals, Semis, and Final are 20-minute matches (Two halves of 10 mins).</li>
            <li><strong>Scoring (Group Stage):</strong> Win = 3 pts, Draw = 1 pt, Loss = 0 pts.</li>
            <li><strong>Tie-break (Knockout only):</strong> If level at full time, 3 penalties per team, then sudden death.</li>
            <li><strong>Schedule:</strong> The tournament starts at 9:00 am and will finish approximately at 2:00 pm.</li>
          </ul>
          </div>
      </section>

      {/* --- 3. GAMEPLAY --- */}
      <section className="content-section alt-bg">
        <h2>3. Gameplay Rules</h2>
        <div className="card_single">
          <ul className="rules-list">
            <li><strong>Team:</strong> All players must be adults (18+), from 5 to 8 players per team.</li>
            <li><strong>Kit:</strong> All players must wear the same coloured jersey.</li>
            <li><strong>On the field:</strong> One goalkeeper and four outfield players.</li>
            <li><strong>Subs:</strong> Unlimited rolling subs (must be authorized by Referee).</li>
            <li><strong>Throw-ins:</strong> Taken with <strong>hands</strong>.</li>
            <li><strong>Corners:</strong> Taken with the <strong>foot</strong>.</li>
            <li><strong>Fouls:</strong> All are <strong>Direct Free Kicks</strong>.</li>
            <li><strong>Penalties:</strong> Fouls inside the rival area result in a penalty kick.</li>
            <li><strong>Diversity:</strong> Male, female, and mixed teams are welcome.</li>
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
          <p style={{fontStyle: 'italic', color: '#02678F'}}>Winners and runners-up awards will be announced soon.</p>
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
