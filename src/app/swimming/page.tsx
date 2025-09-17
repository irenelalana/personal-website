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
          <h1>ADULTS SWIMMING LESSONS</h1>
            <p>
              All levels and ages adults swimming lessons in Brisbane. It is never too late to learn new skills, and enjoy Australian treasures around the water. It doesn't matter how much afraid of water or nervous you
              are. 
              </p>
             <p>
              This is a tailored swimming program for adults who want to swim with confidence, improve technique, build endurance, or return to the water after a break. Includes stroke correction, breath control, drills & pacing.
            </p>
            <p>
              We use video recording as a tool to enhance your learning experience when needed, providing personalized feedback to improve your technique. My lessons are designed to help you achieve your goals in a supportive, inclusive and encouraging environment.
            </p>
            <p>Spanish and English options.</p>
          <h2>What results you’ll get:</h2>
            <ul>
            <li>More efficient swimming strokes: less drag, use energy better.</li>
            <li>Increased stamina and ability to swim continuous laps</li>
            <li>Better breathing techniques, less breathlessness</li> 
            <li>Reduced shoulder strain / fatigue</li>
            </ul>
          </div>
        </div>

        <div className="caption">
          <section id="training_program">
           <h2>SMART STROKES:</h2>
            <p>Smart Strokes is a swimming premium group for stroke correction in adults - intermediate level, for those wanting to swim longer without fatigue..</p>
            <p>Mondays and Wednsedays 6.30pm, we improve technique and endurance and having fun with unique exercises in Musgrave Park Pool, West End.</p>
            <p>5 (45min) session packs, $105.</p>

           <h2>ADULTS PRIVATE SWIMMING LESSONS</h2>
            <ul>
              <li>Private lessons are run in Brisbane, at Musgrave Park Pool (West End) and QUT Kelvin Grove Campus.</li>
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
