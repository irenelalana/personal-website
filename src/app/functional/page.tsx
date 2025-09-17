// pages/functional.js
import React from "react";

export default function Functional() {
  return (
    <section id="services">
      <div className="card_single">
        <div className="card-top">
          <img
            src="/images/Irela_fitness_trainer.JPG"
            alt="Functional Training"
          />
          <div>
            <h1>SMART FITNESS Program Preps You for Over 35 Life:</h1>
            <p>Frustrated with inefficient programs or feeling lost in a crowded gym full of equipment you don´t know how to use? Tired of not seeing results, or embarrassed to work out in public? If you're struggling to find a fitness routine that fits your busy life, my PREMIUM Smart Fitness Program is for you:</p>
            <h2>Why now:</h2>
            <ul>
              <li>Muscle and bone density naturally decline after 30 — the sooner you act, the more you preserve.</li>
              <li>Prevent falls, aches, and stiffness before they become issues.</li>
              <li>Functional training now sets you up for a healthier, more active future.</li> 
              <li>The perfect combination of coordination, balance, mobility, strength, cardio & core, which improves mood, skills, concentration, time management, self-esteem, habits and reduces stress.</li>
            </ul>
            <h2>What results you’ll get:</h2>
            <ul>
              <li>Improved core strength, posture, and balance</li>
              <li>Stronger muscles that protect joints and reduce injury risk</li>
              <li>Easier daily movement (carrying shopping, climbing stairs, playing with kids/grandkids)</li>
              <li>Increased energy, confidence, and overall wellbeing</li>
              <li>Support for other sports/activities (swimming, cycling, running, etc.)</li>
              <li>Minimises Menopause symptoms</li>
            </ul>
          </div>
        </div>

        <div className="caption">
          <section id="training_program">
            <h2>Start now with SMART FITNESS Program offer:</h2>
            <ul>
              <li>Premium group, only 8 spots available.</li>
              <li>Our live online workouts provide structure, accountability, and motivation.</li>
              <li>10 Weeks program for $550.</li>
              <li>60min sessions.</li>
              <li>3 fitness live sessions per week.</li>
              <li>Mon, Tue, Fri 6.15am / 1.30pm (Brisbane time)</li>
              <li>Access to recorded materials.</li>
              <li>Discounts with local partners.</li>
              <li>Extra group swimming lessons included.</li>
              <li>Follow ups, reports and analysys.</li>
              <li>First week for free. (contact me to try first!)</li>

            <p>(If you prefer, personal training also available in Toowong, CBD and West End. Tell me what you need and I will tailor it for you) </p>
              <form
                action="https://shorturl.at/hcCjW"
                target="_blank"
                style={{ marginTop: "1rem" }}
              >
                <button className="form-button">See full program</button>
              </form>
            </ul>
          </section>
          <iframe
            src="https://www.youtube.com/embed/XOcuZt7vKhs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ marginTop: "1rem", height: "315px" }}
          ></iframe>
        </div>
      </div>
    </section>
  );
}
