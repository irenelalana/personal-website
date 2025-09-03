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
            <h2>Discover the SMART FITNESS Program That Preps You for Life:</h2>
            <p>Frustrated with inefficient programs or feeling lost in a crowded gym full of equipment you don´t know how to use? Tired of not seeing results, or embarrassed to work out in public? If you're struggling to find a fitness routine that fits your busy life, my PREMIUM Smart Fitness Program is for you:</p>
            <h1>Why Choose Functional Training?:</h1>
            <p>This is the effective functional training program that enhance your quality of life and performance. The perfect combination of coordination, balance, mobility, strength, cardio & core, which improves mood, skills, concentration, time management, self-esteem, habits, alleviates body aches, and reduces stress.</p>
            <h1>Real-Life Benefits for Your Body:</h1>
            <p>This training for women over 35 is designed to ready our mid-aged body for our daily activities with no pain and to minimise menopause symptoms. These exercises equip you with improved skills that preps you for real-life, daily living stuff like bending, twisting, lifting, loading, pushing, pulling, squatting and hauling.</p>
            <h1>Start Your Live Online Workouts</h1>
            <p>Our live online workouts provide structure, accountability, and motivation.</p>
            <p>(If you prefer, personal training also available in Toowong, CBD and West End. Tell me what training yiu need and I will tailor it for you) </p>
          </div>
        </div>

        <div className="caption">
          <section id="training_program">
            <h2>What does Irela offer in our SMART FITNESS Program:</h2>
            <ul>
              <li>Premium group, only 8 spots available.</li>
              <li>10 Weeks program.</li>
              <li>60min sessions.</li>
              <li>3 fitness live sessions per week.</li>
              <li>Mon, Tue, Fri 6.15am / 1.30pm (Brisbane time)</li>
              <li>$550. First week for free. (try first!)</li>
              <li>Access to recorded materials.</li>
              <li>Discounts with local partners.</li>
              <li>Extra group swimming lessons included.</li>
              <li>Follow ups, reports and analysys.</li>
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
