// pages/triathlon.js
import React from "react";

export default function Triathlon() {
  return (
    <section id="services">
      <div className="card_single">
        <div className="card-top">
          <img src="/images/Irela_triathlon_swimming.jpg" alt="Triathlon" />
          <div>
            <h1>SWIMMING FOR TRIATHLETES</h1>
            <p>
              We equip you with the skills and confidence needed to thrive in
              the demanding world of triathlon, by teaching you how to exit,
              entry and navigation skills for triathlon environments. Our
              drills will change your mindset and give you tools to swim
              smarter.
            </p>
            <p>
              Seasoned triathlete, conquering races for ages but still finding
              the swimming leg challenging; new triathlete starting your journey
              and feeling uncertain about tackling the swim, this program is
              designed specifically with you in mind.
            </p>
            <p>Lessons are run at Musgrave Park Pool, in West End, Brisbane.</p>
          </div>
        </div>

        <div className="caption">
          <section id="training_program">
            <ul>
              <li>5 Weeks program.</li>
              <li>45min sessions.</li>
              <li>$105.</li>
              <li>4-8 people groups.</li>
              <li>Discounts with local partners.</li>
              <li>Follow ups, reports and analysys.</li>
              <li>Private options available (try first!).</li>
            </ul>
          </section>
          <iframe
            src="https://www.youtube.com/embed/yznrRTc_9vc"
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
