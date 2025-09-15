// pages/swimming.js
import React from "react";

export default function Swimming() {
  return (
    <section id="services">
      <div className="card_single">
        <div className="card-top">
          <img
            src="/images/Irela_swimming_lessons23.jpg"
            alt="Swimming Lessons"
          />
          <div>
            <h1>ADULTS SMART STROKES SWIMMING LESSONS</h1>
            <p>
              Specialised in all levels and ages adults swimming lessons in Brisbane. It is never too late to learn new skills, and enjoy Australian treasures around the water. It doesn't matter how much afraid of water you
              are, we work on your confidence, floating, breathing, propulsion improving your control, technique and fitness level as main goals.
            </p>
            <p>
              We use video recording as a tool to enhance your learning experience when needed, providing personalized feedback to improve your technique. My lessons are designed to help you achieve your goals in a supportive, inclusive and encouraging environment.
            </p>
            <p>Spanish and English options.</p>
            <p>Smart Strokes is a small swimming group for stroke correction in adults - intermediate level.</p>
            <p>Mondays and Wednsedays 6.30pm, we improve technique and endurance and having fun with unique exercises in Musgrave Park Pool, West End.</p>
            <p>5 (45min) session packs, $105.</p>
          </div>
        </div>

        <div className="caption">
          <section id="training_program">
           <h1>ADULTS PRIVATE SWIMMING LESSONS</h1>
            <ul>
              <li>Private and sharing lessons are run in Brisbane, at Musgrave Park Pool (West End) and QUT Kelvin Grove Campus.</li>
              <li>Beginners - Intermediate - advanced - triathletes level.</li>
              <li>10 Weeks program.</li>
              <li>45 - 60min private sessions.</li>
              <li>$665 - $825.</li>
              <li>Budget option: sharing lessons.</li>
              <li>Reschedule within 24h notice.</li>
              <li>Discounts with local partners.</li>
              <li>Preference in spots over casuals.</li>
              <li>Follow ups, reports and analysys.</li>
              <li>Casual options available (try first!).</li>
              <p></p>
              <form action="https://shorturl.at/Doc2b" target="_blank" rel="noopener noreferrer">
                <button className="form-button">See full program</button>
              </form>
            </ul>
          </section>
          <iframe
            src="https://www.youtube.com/embed/MLRn_m7R7KE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
