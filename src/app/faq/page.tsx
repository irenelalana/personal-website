'use client';
import { useState } from "react";
import Image from "next/image";
import styles from "./faq.module.css";

const FAQ_DATA = [
  {
    question: "Do you have any group sessions available now?",
    answer: (
      <>
        <p><strong>Yes!! Online live fitness sessions:</strong> Monday (strength, weekly special), Tuesday (Mat Pilates) and Friday (fitness, full body), 6.15am.</p>
        <p><strong>Aquafitness - Musgrave Park Pool:</strong> Tuesday and Thursday 9.00am, Monday and Wednesday 5.30pm. Fridays 12.30pm.</p>
        <p><strong>Fitness in the park - Toowong:</strong> Thursday 6.00am and Friday 9.45am.</p>
        <p><strong>Swimming - Smart Strokes at Musgrave Park Pool:</strong> Monday and Wednesday 6.30pm.</p>
        <p><em>*All times are Brisbane time (AEST).</em></p>
      </>
    )
  },
  {
    question: "How can I follow an online workout if I am not good with technology?",
    answer: "Our live online workouts are conducted via the Zoom app. I will help you with a simple setup. You just need to download the app on your device and position it so I can see you training. This allows me to check your body position and technique in real time, ensuring a safe and effective workout."
  },
  {
    question: "What is the difference between Aquafitness and a regular gym workout?",
    answer: "Aquafitness and a regular gym workout both provide effective training, but the key difference lies in the medium: water. The natural buoyancy of water supports your body, making movements low-impact and gentle on your joints. This significantly reduces the risk of injury while providing natural resistance training. A regular gym workout, on the other hand, relies on gravity and weights, which can put more stress on the body."
  },
  {
    question: "How can I join an online session if I don´t have much space or equipment at home?",
    answer: "You don't need a lot! We only need about two square meters of space. The workouts use easy-to-find equipment, such as an elastic band (which I provide as a welcoming pack), a chair, a cushion, a stick, and household items like containers, bricks, or a backpack full of books."
  },
  {
    question: "How can I book a training session?",
    answer: "You can book a session through my website, by using the 'Contact Me' button. For in-person sessions, we will coordinate times and dates that work best for you."
  },
  {
    question: "Can you create a customized workout plan for me?",
    answer: "Yes! I offer personalized workout plans that are tailored to your specific goals and needs, whether for general fitness, swimming, or specific conditioning."
  },
  {
    question: "How long are the training sessions?",
    answer: "Classes typically last between 45 to 60 minutes, but can be customized to fit your schedule, needs, and fitness level."
  },
  {
    question: "What if I need to cancel or reschedule a session?",
    answer: "I understand that life can get in the way sometimes, so I offer flexible cancellation and rescheduling policies. Please let me know as soon as possible if you need to cancel or reschedule a session."
  },
  {
    question: "What should I wear for a training session?",
    answer: "Wear comfortable workout clothes and athletic shoes for land-based fitness sessions. For swimming sessions, bring a swimsuit and goggles (a swimming cap is highly recommended). For all sessions, I recommend bringing a water bottle and a towel."
  },
  {
    question: "Who are your Adults Swimming Lessons for?",
    answer: (
      <>
        <p>Our swimming lessons are for all adults, regardless of their current level. We specialize in helping a diverse group of people, including:</p>
        <ul className={styles.list}>
          <li>Adults from a multicultural background who never learned to swim as a child.</li>
          <li>New triathletes who want to improve their technique before starting a training plan.</li>
          <li>Swimmers who need to fix their stroke technique or build confidence before joining a squad.</li>
        </ul>
        <p>Our goal is to help you feel strong and confident in the water, whether you're just learning or refining your skills.</p>
      </>
    )
  },
  {
    question: "What is the difference between Aquafitness, Aquaerobics, and Aquagym?",
    answer: "There is no difference! These are simply different names for the same thing: exercise in the water. Whether you call it Aquafitness, Aquaerobics, or Aquagym, the goal is the same—to use the benefits of water to get a fun, effective, and full-body workout."
  },
  {
    question: "Where are the Aquafitness and Swimming classes held?",
    answer: "Our classes are held in two convenient locations in Brisbane: Musgrave Park Swimming Pool in West End and the QUT Kelvin Grove campus."
  },
  {
    question: "Can I try a class before committing to a full program?",
    answer: "Yes, you can! I offer trial classes for my Aquagym, Smart Fitness, and Smart Strokes programs. This is a great way to experience a session firsthand and decide if it's the right fit for you before committing to a full program."
  },
  {
    question: "Do you offer nutrition coaching?",
    answer: "No, I am not a qualified nutrition professional. However, I can offer you some general tips to help you develop healthier lifestyle habits alongside your training."
  },
  {
    question: "What if I have an injury or a specific health concern?",
    answer: "All of my programs can be adapted to your needs. As a coach, my goal is to provide safe workouts that improve your quality of life, not cause pain. I will customize the program for your specific needs, adapting exercises on hard days or working around existing injuries to help you build strength and move with confidence."
  },
  {
    question: "I don´t know how to swim and I cannot afford private lessons. What can I do?",
    answer: "Contact me! I will help find the perfect 'swim buddy' for you so you can share the lessons. This makes it much more affordable and twice as fun."
  },
  {
    question: "Do you offer Wellness and Fitness programs for companies?",
    answer: "Sure thing! Contact me through the contact form on this website and tell me what kind of activities you would like to enjoy with your team. Offering exercise at workplaces improves productivity, motivation, and team relationships."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); 

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-modern" className={styles.container}>
      
      {/* HEADER DE LA PÁGINA */}
      <div className={styles.header}>
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about my training sessions, locations, and methodology.</p>
      </div>

      <div className={styles.contentWrapper}>
        
        {/* IMAGEN LATERAL */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/Irela_handstand_strength_core.jpg"
            alt="Coach Irela performing a handstand, showcasing strength and core"
            width={700}
            height={900}
            className={styles.heroImg}
            priority
          />
        </div>

        {/* LISTA DE PREGUNTAS (ACORDEÓN) */}
        <div className={styles.accordionContainer}>
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}
              >
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <h3>{item.question}</h3>
                  <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
                </button>
                
                <div className={styles.accordionBody}>
                  <div className={styles.accordionContent}>
                    {/* Almacenamos texto o JSX según corresponda */}
                    <p>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
