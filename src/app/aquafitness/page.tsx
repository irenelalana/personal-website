// pages/aquafitness.js
import React from "react";

export default function Aquafitness() {
  return (
    <section id="services">
      <div className="card_single">
        <div className="card-top">
          <img
            src="/images/Irela_swimming_confidence23.jpg"
            alt="Aquafitness"
          />
          <div>
            <h1>AQUAFITNESS - AQUAEROBICS - AQUAGYM</h1>
            <p>
              The combination of strength and cardio routines with water resistance ensures that the body receives a complete workout with Low impact, ideal for those with joint injuries and chronic pains.</p>
            <p>
              Aquafitness increases endurance and enhances fitness, reduces blood pressure, boosts mobility & flexibility; improves balance, coordination and agility, mitigates stress and makes a fun environment.</p>
            <p>
              Sessions are run at Musgrave Park Pool, in West End, Brisbane. Multicultural environment, tunes and vibes.
              One to one and group Aqua based training sessions. 
            </p>
          </div>
        </div>

        <div className="caption">
          <section id="training_program">
            <ul>
              <li>Casual sessions for $20.</li>
              <li>10 passes for $180.</li>
              <li>Seasonal deals.</li>
              <li>60 min sessions.</li>
              <li>Mon, Wed 5.30pm. Tue (deep water), Thu 9.00am. Friday 12.30pm.</li>
              <li>Discounts with local partners.</li>
              <li>Monday and Friday FREE as part of BCC Active and Healthy program. Pay only for pool entry.</li>
            </ul>
          </section>
          <iframe
            src="https://www.youtube.com/embed/KUogIKsmdsc"
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
