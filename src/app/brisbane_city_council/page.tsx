"use client";

import React from "react";
import BookingCalendar from '@/components/BookingCalendar';
import styles from './BrisbaneCityCouncil.module.css'; // Ajusta la ruta si es necesario

export default function BrisbaneCityCouncil() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.cardSingle}>
        <div className={styles.cardTop}>
          <img
            src="/images/Irela_Free_aquaerobics_brisbane.jpeg"
            alt="Brisbane City Council Active and Healthy Events"
            className={styles.heroImage}
            style={{ maxWidth: '100%' }} // Refuerzo para evitar el scroll lateral
          />

          <div>
            <h1 className={styles.mainTitle}>BCC Active and Healthy Free Events</h1>
            <p className={styles.introText}>
              These <strong>FREE</strong> activities have been funded by Brisbane City Council as
              part of Council's Active and Healthy program.
            </p>

            {/* --- FITNESS FOR ADULTS --- */}
            <div className={styles.serviceBlock}>
              <h2 className={styles.serviceTitle}>Fitness for Adults (In the Park)</h2>
              <p className={styles.serviceDescription}>
                Using minimum equipment, participants will develop strength, mobility, and cardio 
                with fun tunes in the park. Just fill the form and show up!
              </p>

              <div className={styles.infoBox}>
                <p>🌳 <strong>Functional Fitness:</strong> Thursdays 6:00am, Moorlands Park, Auchenflower (except School Holidays).</p>
                <p>🧘‍♀️ <strong>Low Impact & Pilates:</strong> Fridays 9:45am, Anzac Park, Toowong (except School Holidays).</p>

              </div>

              <form action="https://forms.gle/XjEFREE7PKHYdn2H8" target="_blank" rel="noreferrer">
                <button className={styles.formButton}>Pre-activity form</button>
              </form>
            </div>


            {/* --- AQUAFITNESS FOR ADULTS --- */}
            <div className={styles.serviceBlock}>
              <h2 className={styles.serviceTitle}>Aquafitness for Adults</h2>
              <p className={styles.serviceDescription}>
                Experience an excellent, low-impact workout in the water. Feel the benefits
                of exercise without the pain. Using minimum impact movements,
                participants will develop strength, mobility, and cardio with fun tunes.
              </p>

              <div className={styles.infoBox}>
                <p>📍 <strong>Location:</strong> Musgrave Park Pool, West End, Brisbane.</p>
                <p>⏰ <strong>Schedule:</strong> Mondays 5:30pm & Fridays 12:30pm (except School Holidays).</p>

              </div>

              <div className={styles.stepBlock}>
                <p><span className={styles.stepTitle}>Step 1:</span> Fill out this initial form if it is your first time attending.</p>
                <form action="https://forms.gle/mNK6n5XKE9Fng2Yn9" target="_blank" rel="noreferrer">
                  <button className={styles.formButton}>Pre-activity form</button>
                </form>
              </div>

              <div className={styles.stepBlock}>
                <p><span className={styles.stepTitle}>Step 2:</span> To join any of these sessions, please make sure to <strong>book your spot in advance through <a href="#booking-calendar">the calendar below</a></strong>, as spaces are limited. You will see a "Booking Confirmed" notification on the site when done.</p>
              </div>
            </div>


            {/* --- SCHOOL HOLIDAY SPECIALS --- */}
            <h2 className={styles.mainTitle} style={{ marginTop: '3rem', fontSize: '1.8rem' }}>
              School Holiday Specials
            </h2>

            <div className={styles.serviceBlockHoliday}>
              <h3 className={styles.serviceTitle}>Aquafitness Golds & Kids</h3>
              <p className={styles.serviceDescription}>
                A unique and heartwarming Aquafitness class designed for grandparents and children (kid with an adult) to exercise together! We focus on low-impact, joint-friendly movements and games that improve coordination, balance, and overall fitness. All participants should be confident in shallow water.
              </p>
              <div className={styles.infoBox}>
                <p>📍 <strong>Location:</strong> Musgrave Park Pool, West End.</p>
                <p>⏰ <strong>Next Dates:</strong> 9 Apr & 16 Apr 2026 at 11:00am.</p>
              </div>
              <p><span className={styles.stepTitle}>Step 1:</span> Fill out this initial form if it is your first time attending.</p>
              <form action="https://forms.gle/xWXUSxYNzE5X7D6GA" target="_blank" rel="noreferrer">
                <button className={styles.formButton}>Pre-activity form</button>
              </form>
              <div className={styles.stepBlock}>
                <p><span className={styles.stepTitle}>Step 2:</span> To join any of these sessions, please make sure to <strong>book your spot in advance through <a href="#booking-calendar">the calendar below</a></strong>, as spaces are limited. You will see a "Booking Confirmed" notification on the site when done.</p>
              </div>

            </div>

            <div className={styles.serviceBlockHoliday}>
              <h3 className={styles.serviceTitle}>Aquafitness for Teens</h3>
              <p className={styles.serviceDescription}>
                A variety of cardio, strength, and team activities tailored to suit teenager fitness levels and needs. Get ready to splash, move, and groove to upbeat music while improving your overall fitness and having a blast with friends. Participants should be confident in shallow water.
              </p>
              <div className={styles.infoBox}>
                <p>📍 <strong>Location:</strong> Musgrave Park Pool, West End.</p>
                <p>⏰ <strong>Next Dates:</strong> 7, 9, 14, and 16 Apr 2026 (10:00am to 11:00am).</p>
              </div>
              <p><span className={styles.stepTitle}>Step 1:</span> Fill out this initial form if it is your first time attending.</p>
              <form action="https://forms.gle/xWXUSxYNzE5X7D6GA" target="_blank" rel="noreferrer">
                <button className={styles.formButton}>Pre-activity form</button>
              </form>
              <div className={styles.stepBlock}>
                <p><span className={styles.stepTitle}>Step 2:</span> To join any of these sessions, please make sure to <strong>book your spot in advance through <a href="#booking-calendar">the calendar below</a></strong>, as spaces are limited. You will see a "Booking Confirmed" notification on the site when done.</p>
              </div>
            </div>

            <div id="booking-calendar">
              <div className={styles.calendarWrapper}>
                <p style={{ color: '#f39304' }}>The calendar is not available, sorry for the inconvenience, it will be soon, thanks for you patience!</p>
                  <BookingCalendar />
              </div>
              <div className={styles.disclaimer}>
                  <p><strong>Cancellations:</strong> If you are unable to attend, please cancel your booking as early as possible via your confirmation email (the "contact me" button is not valid to cancel). This allows someone else to take your spot.</p>
                  <p><em>*If a session is fully booked, check back closer to the start time, as spots may open up.</em></p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}