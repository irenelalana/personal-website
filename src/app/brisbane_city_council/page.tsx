// pages/brisbane_city_council.js
import React from "react";

export default function BrisbaneCityCouncil() {
  return (
    <section id="services">
      <div className="card_single">
        <div className="card-top">
          <img
            src="/images/Irela_Free_aquaerobics_brisbane.jpeg"
            alt="Brisbane City Council"
          />
          <div>
            <h2>BCC Active and Healthy Free Events</h2>
            <p>
              These FREE activities have been funded by Brisbane City Council as
              part of Council's Active and Healthy program.
            </p>
            <p>
              <strong>Aquafitness for adults</strong>: experience an excellent,
              low-impact cross-training workout in the water. Feel the benefits
              of exercise without the pain. Using minimum impact movements,
              participants will develop strength, mobility and cardio with fun
              tunes.
            </p>
            <p>
              Sessions are run at Musgrave Park Pool, in West End, Brisbane.
              Mondays 5.30pm. New group Fridays 12.30pm (from 30th January)
            </p>
            <p>
              Please, note that after filling the initial form out, you will have
              to send an email to the pool, clicking{" "}
              <a href="mailto:info@musgraveparkaquaticcentre.com.au">here</a>{" "}
              every week (before Saturday) to book your spot for the following
              Monday as the spots are limited.
            </p>
            <form action="https://forms.gle/mNK6n5XKE9Fng2Yn9" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>

            <p>
              <strong>Fitness for adults</strong>: Using minimum equipment,
              participants will develop strength, mobility and cardio with fun
              tunes in the park. Just fill the form and show up!
            </p>
            <p>Functional Fitness, Thursdays 6.00am, Moorlands Park, Auchenflower.</p>
            <p>Low Impact Fitness and Pilates, Fridays 9.45am Anzac Park, Toowong.</p>
            <form action="https://forms.gle/XjEFREE7PKHYdn2H8" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>

            <p>
              <strong>Functional training for teens during school holidays</strong>: increases endurance and enhances fitness, boost mobility & flexibility; improves balance, coordination and agility, and makes a fun environment building teamwork.
            </p>
            <p>Sessions were run at Moorlands Park, in Aucheflower, Brisbane. Next dates TBC.</p>
            <p>Just fill the following form out to book your spot</p>
            <form action="https://forms.gle/2sk8tNs5WWCHRHKx9" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>

            <p>
              <strong>Aquafitness for teens during school holidays</strong>: a
              variety of cardio, strength, and games tailored to suit teenage
              fitness levels and needs. Get ready to splash, move, and groove to
              upbeat music while improving your overall fitness and having a blast
              with friends. Participants should be confident in shallow water.
            </p>
            <p>Sessions are run at Musgrave Park Pool, in West End, Brisbane. Next dates TBC.</p>
            <p>Please, note that after filling the form out with preferences, you will be confirmed by email.</p>
            <form action="https://forms.gle/xWXUSxYNzE5X7D6GA" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
