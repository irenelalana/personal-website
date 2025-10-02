// app/about/page.tsx
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <main className="about-container">
      <section id="about-me">
        <h1>Why are you choosing Irela Aqua and Fitness?</h1>

        <div className="about-me">
          <div className="about-images">
            <img
              src="/images/Irela_swimming_teacher.jpeg"
              alt="Picture about Irela Aqua and Fitness"
            />
            <img
              src="/images/Triathlon_plan.jpg"
              alt="Picture about Irela Aqua and Fitness"
            />
            <img
              src="/images/Irela_fitness_coach23.JPG"
              alt="Picture about Irela Aqua and Fitness"
            />
          </div>

          <div className="about-text">
            <p>
              Welcome to Irela Aqua & Fitness, your ultimate partner in achieving
              your fitness and health goals!
            </p>
            <p>
              I'm Irene Lalana, Aquaprofessional of the year (National Fitness awards 2024 - Ausactive) and I'm passionate about helping you achieve your
              fitness and health goals. As a professional swimmer and rescuer
              (Australian Master Champion 2025 and Lifesaving World silver Medal
              2024 and National records), I bring over 20 years of experience, a
              goal-driven mindset, and exceptional organisational skills to every
              session. I'm a certified Fitness and Swimming coach with a degree in
              Sport Science and recognised qualifications in both Europe and
              Australia.
            </p>
            <p>
              But you may still be wondering why you should choose me. My
              expertise lies in working with diverse groups, with a specialization
              in supporting women over 40 through the physical and emotional
              changes they experience through menopause. I understand the impact
              of fluctuating hormone levels and create programs to build strength
              and resilience. My multicultural background has also allowed me to
              teach swimming and survival skills to adults from over 30 different
              nationalities.
            </p>
            <p>
              My over 20 years of experience have included roles as a coach,
              manager, and instructor in different sports, levels, clubs and
              companies.
            </p>
            <p>
              At Irela Aqua & Fitness, I offer unique, comprehensive programs
              combining fitness, low impact aquaerobics, and swimming—available in both
              Spanish and English - making me potentially the only provider of
              this integrated approach in Brisbane, what sets me apart.
            </p>
            <p>
              <strong>My mission is twofold:</strong> to empower and equip
              everyone living in Brisbane to enjoy Australia's aquatic treasures
              safely and confidently, and to support everyone who values their
              well-being in achieving a sustainable and healthy lifestyle through
              enjoyable activity.
            </p>
            <p>
              Whether your goal is weight loss, learning to swim, creating a
              personalized routine, or simply enhancing your overall well-being,
              I'm dedicated to your success.
            </p>
            <p>
              Thank you for visiting my website and Social Media. I look forward
              to embarking on this journey with you soon!
            </p>
          </div>
        </div>
      </section>

      <section id="Certified">
        <div className="Certified">
          <img
            src="/images/Aquaprofessional_of_the_year.jpeg"
            alt="Aquaprofessional of the year award"
          />
          <img
            src="/images/GROUP_EXERCISE_LEADER_INSTRUCTOR_OF_THE_YEAR_2025.png"
            alt="Group Exercise leader and Instructor of the year award"
          />
          <img
            src="/images/ausactive.jpeg"
            alt="Picture about Ausactive"
          />
          <img
            src="/images/europeactive.png"
            alt="Picture about Europeactive"
          />
          <img
            src="/images/austswim.png"
            alt="Picture about Austswim"
          />
          <img
            src="/images/swimaustralia.jpeg"
            alt="Picture about SwimAustralia"
          />
          <img
            src="/images/CC - Brand - Council Logo - centre - Colour.PNG"
            alt="Picture about Brisbane City Council partnership"
          />
        </div>
      </section>
    </main>
  );
}
