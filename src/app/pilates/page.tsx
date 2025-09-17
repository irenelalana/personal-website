// pages/pilates.js
import React from "react";

export default function Pilates() {
  return (
    <section id="services">
      <div className="card_single">
        <div className="card-top">
          <img
            src="/images/Irela_online_fitness_recovery_from_injuries23.jpg"
            alt="Pilates"
          />
          <div>
            <h1>Pilates-Inspired Core & Mobility</h1>
             <h2>Who it’s for</h2>
              <ul>
                <li>Are you desperately looking to strengthen your core safely and effectively?</li>
                <li>Anyone with lower back pain, poor posture, or desk-related stiffness in the room?</li>
                <li>Over-35s wanting to maintain mobility and flexibility as they age?</li>
                <li>Are you recovering from injury or needing a gentler yet powerful workout option?</li>
              </ul>
              <p>You are in the right place!</p>

              <h2>What it is:</h2>
              <p>
                Our <strong>Pilates Program</strong> combines controlled movements, 
                deep core activation, and stretching to improve posture, flexibility, and stability. 
                Classes are mat-based, low-impact, and tailored to suit all levels.
              </p>

              <h2>What results you’ll get</h2>
              <ul>
                <li>Stronger core muscles that support the spine and improve posture</li>
                <li>Greater flexibility and joint mobility</li>
                <li>Reduced tension, stiffness, and back discomfort</li>
                <li>Improved balance and coordination</li>
                <li>Relaxed, focused mind with reduced stress</li>
              </ul>

              <h2>Why now</h2>
              <ul>
                <li>Many daily aches and pains stem from weak core muscles and tight joints</li>
                <li>Early correction prevents long-term issues with back, hips, and shoulders</li>
                <li>Building mobility and strength now means staying active, independent, and pain-free as you age</li>
              </ul>  
            </div>
          </div>
        <div className="caption">
          <section id="training_program">
            <ul>
              <li>10 Weeks personalised program.</li>
              <li>45-60min sessions.</li>
              <li>$665 - $825.</li>
              <li>Budget option: sharing lessons.</li>
              <li>Welcome package.</li>
              <li>Discounts with local partners.</li>
              <li>try first for free!</li>
              <li>Early bird at home? Join our Online Smart Pilates online group, Tuesdays 6.15am (10 sessions $300)</li>
            </ul>
          </section>
          <iframe
            src="https://www.youtube.com/embed/_1VywCHlfIY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ marginTop: "1rem", height: "315px" }}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
