// pages/brisbane_city_council.js
"use client";
import React from "react";
import BookingCalendar from '@/components/BookingCalendar'

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
            <h1>BCC Active and Healthy Free Events</h1>
            <p>
              These FREE activities have been funded by Brisbane City Council as
              part of Council's Active and Healthy program.
            </p>
            <p>
              <strong>Aquafitness for adults</strong>: experience an excellent,
              low-impact workout in the water. Feel the benefits
              of exercise without the pain. Using minimum impact movements,
              participants will develop strength, mobility and cardio with fun tunes.
            </p>
            <p>Sessions are run at Musgrave Park Pool, in West End, Brisbane. Mondays 5.30pm and Fridays 12.30pm (except School Holidays). Resuming on the 30th January</p>
            <p><strong>Step 1</strong>. Fill this initial form out if it is your first time attending.</p>
            <form action="https://forms.gle/mNK6n5XKE9Fng2Yn9" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>
            <p><strong>Step 2</strong>. To join any of these sessions, please make sure to book your spot in advance through the calendar below, as spaces are limited. You will see a "Booking Confirmed" notification on the site when done</p>
            <p>If you are unable to attend, please <strong>cancel your booking as early as possible, via confirmation email (contact me button is not valid to cancel)</strong>, so someone else can take your spot as they are limited and usually quite popular.</p>
            <p>If the session is fully booked, please check back closer to the start time, as spots may open up if participants cancel.</p>
            <BookingCalendar />

            <p>
              <strong>Fitness for adults</strong>: Using minimum equipment,
              participants will develop strength, mobility and cardio with fun
              tunes in the park. Just fill the form and show up!
            </p>
            <p>Functional Fitness, Thursdays 6.00am, Moorlands Park, Auchenflower. (except School Holidays). Resuming on the 29th January</p>
            <p>Low Impact Fitness and Pilates, Fridays 9.45am Anzac Park, Toowong. (except School Holidays). Resuming on the 30th January</p>
            <form action="https://forms.gle/XjEFREE7PKHYdn2H8" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>

            <p>
              <strong>Aquafitness Gold´s & Kids (kid with and adult) during school holidays</strong>: unique and heartwarming Aquafitness class designed for grandparents and children to exercise together! We focus on low-impact, joint-friendly movements and games that improve coordination, balance, and overall fitness. Get ready to splash, play, and work out to a fun mix of classic and modern tunes. This class is a fantastic opportunity to create lasting memories while strengthening family bonds and getting fit as a team! All participants should be confident in shallow water.
            </p>
            <p>Sessions were run at Musgrave Park Pool, in West End, Brisbane. Next dates at 11.00am: 15 Jan, 22 Jan, 9 Apr, 16 Apr 2026.</p>
            <p>Please, note that after filling the form out with preferences, you will be confirmed by email as spots are limited.</p>
            <form action="https://forms.gle/xWXUSxYNzE5X7D6GA" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>

            <p>
              <strong>Aquafitness for teens during school holidays</strong>: a variety of cardio, strength, and team activities tailored to suit teenager fitness levels and needs. Get ready to splash, move, and groove to upbeat music while improving your overall fitness and having a blast with friends. Participants should be confident in shallow water.
            </p>
            <p>Sessions are run at Musgrave Park Pool, in West End, Brisbane. Next dates 10.00 to 11.00am: 13 Jan, 20 Jan, 7 Apr, 14 Apr 2026. Thursdays 25 Sep, 2 Oct, 18 Dec 2025, 15 Jan, 22 Jan, 9 Apr, 16 Apr 2026</p>
            <p>Please, note that after filling the form out with preferences, you will be confirmed by email as spots are limited.</p>
            <form action="https://forms.gle/xWXUSxYNzE5X7D6GA" target="_blank" rel="noreferrer">
              <button className="form-button">Preactivity form</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
