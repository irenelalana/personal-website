import Image from "next/image";

export default function FAQPage() {
  return (
    <section id="faq">
      <div className="card_single_h">
        <div className="FAQ_image">
          <img
            src="/images/Irela_handstand_strength_core.jpg"
            alt="Swimming Lessons"
          />
        </div>

        <h1>FAQ</h1>

        <p className="question">Do have any group sessions available now?</p>
        <p>
          Yes!! Online live fitness sessions: Monday (strength, weekly special), Tuesday
          (Mat Pilates) and Friday (fitness, full body), 6.15am. Aquafitness sessions at
          Musgrave Park Pool: Tuesday and Thursday 9.00am, Monday and Wednesday 5.30pm.
          Swimming Smart Strokes at Musgrave Park Pool: Monday and Wednesday 6.30pm.
          *Brisbane time.
        </p>

        <p className="question">
          How can I follow an online workout if I am not good with technology?
        </p>
        <p>
          I will help you with the easy set up. You just need to download Zoom app on
          your device and place it on a spot where I can see you training to check your
          body position and technique.
        </p>

        <p className="question">
          How can I join an online session if I don&apos;t have much place and any
          equipment at home?
        </p>
        <p>
          We don&apos;t need more than 2 square meters and easy equipment as an elastic
          band (that I give to you as a welcoming pack), a chair, a cushion, a stick, and
          containers, bricks or a backpack full of books to start with.
        </p>

        <p className="question">How can I book a training session?</p>
        <p>
          You can book a session through my website, by the &apos;contact me&apos; button.
          For in-person sessions, we will coordinate time and dates that work best for
          you.
        </p>

        <p className="question">Can you create a customized workout plan for me?</p>
        <p>
          Yes! I offer personalized workout plans that are tailored to your specific
          goals and needs, for fitness, swimming...
        </p>

        <p className="question">How long are the training sessions?</p>
        <p>
          Training sessions typically last between 45 to 60 minutes, but can be customized
          to fit your schedule and needs, according to your level.
        </p>

        <p className="question">
          What if I need to cancel or reschedule a session?
        </p>
        <p>
          I understand that life can get in the way sometimes, so I offer flexible
          cancellation and rescheduling policies. Please let me know as soon as possible
          if you need to cancel or reschedule a session.
        </p>

        <p className="question">What should I wear for a training session?</p>
        <p>
          Wear comfortable workout clothes and athletic shoes for fitness sessions. For
          swimming sessions, swimsuit and goggles. Swimming cap also recommended. For all
          of them, I recommend bringing a water bottle and towel as well.
        </p>

        <p className="question">Do you offer nutrition coaching?</p>
        <p>
          No, I&apos;m sorry, I am not a qualified nutrition professional. However, I can
          offer you some tips to help you develop healthier habits.
        </p>

        <p className="question">
          I don&apos;t know how to swim and I can not afford private lessons. What can I
          do?
        </p>
        <p>
          Contact me and I will find the perfect buddy for you to share the lessons and
          make it more affordable and fun.
        </p>

        <p className="question">
          Can you offer Wellness and Fitness programs for companies?
        </p>
        <p>
          Sure thing! Contact me through the contact form on this website and tell me
          what kind of activities you would like to enjoy with your mates. Offering
          exercise at workplaces improves productivity, motivation and relationships.
        </p>
      </div>
    </section>
  );
}