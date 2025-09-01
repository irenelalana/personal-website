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
            <h2>PILATES</h2>
            <p>
              Online and face to face group and one to one sessions, focused on
              improving flexibility, strength, and body awareness through
              controlled movements.
            </p>
            <p>
              Following the Pilates principles: Centering, concentration,
              control, precision breath and flow you will feel your core
              engagement which helps you achieve functional movements and
              stability.
            </p>
            <p>
              You can join us on Tuesdays 6.15am Online small group, 10 weeks for
              $300 or...:
            </p>
          </div>
        </div>
        <div className="caption">
          <section id="training_program">
            <ul>
              <li>10 Weeks personalised program.</li>
              <li>45-60min sessions.</li>
              <li>$665 - $825.</li>
              <li>Budget option: sharing lessons.</li>
              <li>Follow ups, reports and analysys.</li>
              <li>Discounts with local partners.</li>
              <li>Casual, P.T. options in Toowong (try first!).</li>
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
