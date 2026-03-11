import React from "react";
import Link from "next/link";
import styles from "./programs.module.css";

const programList = [
  { href: "/functional", title: "FUNCTIONAL FITNESS", img: "/images/Functionaltraininginbrisbane.jpeg" },
  { href: "/aquafitness", title: "AQUAFITNESS", img: "/images/Aquaerobics_westend.jpg" },
  { href: "/swimming", title: "ADULTS SWIMMING LESSONS", img: "/images/Swimming_lessons_for_adult.jpeg" },
  { href: "/pilates", title: "PILATES", img: "/images/Pilates_classes_online.jpeg" },
  { href: "/triathlon", title: "SWIMMING FOR TRIATHLETES", img: "/images/Triathlon.jpg" },
  { href: "/brisbane_city_council", title: "BCC ACTIVE AND HEALTHY", img: "/images/Brisbane_city_council.png" },
  { href: "/planning", title: "PLANNING", img: "/images/Planning_for_triathlon_run_swim_strength.jpeg" },
  { href: "/corporate_events", title: "CORPORATE WELLNESS", img: "/images/Irela13coach_teambuilding_forcompanies.jpeg" },
];

export default function Programs() {
  return (
    <div className={styles.container}>
      <section className={styles.grid}>
        {programList.map((program, index) => (
          <Link href={program.href} key={index} className={styles.cardLink}>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <img 
                  src={program.img} 
                  alt={program.title} 
                  className={styles.image} 
                />
              </div>
              <div className={styles.cardOverlay}>
                <h2 className={styles.cardTitle}>{program.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
