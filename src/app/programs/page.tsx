// pages/programs.js
import React from "react";

export default function Programs() {
  return (
    <section id="services">
      <a href="/functional">
        <div className="card">
          <img src="/images/Functionaltraininginbrisbane.jpeg" alt="Functional Training" />
          <h2>FUNCTIONAL FITNESS</h2>
        </div>
      </a>

      <a href="/aquafitness">
        <div className="card">
          <img src="/images/Aquaerobics_westend.jpg" alt="Aquafitness" />
          <h2>AQUAFITNESS</h2>
        </div>
      </a>

      <a href="/swimming">
        <div className="card">
          <img src="/images/Swimming_lessons_for_adult.jpeg" alt="Swimming Lessons" />
          <h2>ADULTS SWIMMING LESSONS</h2>
        </div>
      </a>

      <a href="/pilates">
        <div className="card">
          <img src="/images/Pilates_classes_online.jpeg" alt="Pilates" />
          <h2>PILATES</h2>
        </div>
      </a>

      <a href="/triathlon">
        <div className="card">
          <img src="/images/Triathlon.jpg" alt="Swimming Lessons" />
          <h2>SWIMMING FOR TRIATHLETES</h2>
        </div>
      </a>

      <a href="/brisbane_city_council">
        <div className="card">
          <img src="/images/Brisbane_city_council.png" alt="Swimming Lessons" />
          <h2>BCC ACTIVE AND HEALTY</h2>
        </div>
      </a>

      <a href="/planning">
        <div className="card">
          <img src="/images/Planning_for_triathlon_run_swim_strength.jpeg" alt="Planning" />
          <h2>PLANNING</h2>
        </div>
      </a>

      <a href="/corporate_events">
        <div className="card">
          <img src="/images/Irela13coach_teambuilding_forcompanies.jpeg" alt="Team_building" />
          <h2>CORPORATE WELLNESS</h2>
        </div>
      </a>
    </section>
  );
}
