import Image from "next/image";

export default function WhatsOnPage() {
  return (
    <main>
      <section id="pilates" className="parrafos">
        <p><strong>Experience a journey to a holistic Wellness IV: 22/112025.</strong></p>

        <div className="whatson-img">
          <div className="whatson-row">
            <img
              src="/images/Journey_to_a_holistic_wellness.png"
              alt="Picture about Holistic Wellness"
            />
          </div>
        </div>

        <p>
          This project is about transformational half-day wellness workshops, designed for Latin migrant women looking to achieve balance, renewal, and empowerment through a holistic perspective.
        </p>
        <p>
          This immersive experience will allow you to rotate through different workshops, each focusing on a key area of well-being, ensuring a comprehensive mind-body transformation.
        </p>
        <p>
          This is a time to honor yourself—to step into a space of self-discovery, self-care, and connection, knowing that the collective energy of women coming together can be truly transformative.
        </p>
        <p>What Awaits You on the 22nd November: <strong>Roots and Spaces: Order, Emotions, and Sustainability</strong></p>
        <p>
          This quarterly women's empowerment and wellness program, organized in collaboration with Angie Mckay and Irela Aqua & Fitness, offers a unique opportunity to connect with holistic health. With a special focus on the Hispanic migrant women's community in Brisbane, our goal is to create a supportive space for learning and connection.        </p>
        <p>
          Welcome to the fourth and final 2025 edition of "Experience the Journey to Holistic Wellness"! This time, we're diving into a crucial theme: Sustainability. We will explore how your relationship with the environment impacts not only the planet but also your overall well-being. Through practical and reflective workshops, we'll provide you with the tools to nourish yourself while caring for the world around you.
        </p>
        <p>
          In this edition, you will immerse yourself in a journey of connection with your roots and the planet. You'll learn to transform your environment and your life through sustainability, from conscious fashion to emotional healing through art. Plus, you'll enjoy delicious and healthy snacks from Latin Manna, included for all attendees.        </p>

        <ul>
          <li>
            <strong>Irene Lalana (Irela Aqua & Fitness)</strong>: : Founder of Irela Aqua & Fitness, a leader in the sustainable, local, and low-environmental-impact fitness sector. Irene will facilitate the workshop "Habits that Activate You and Sustain the Planet," promoting a circular and conscious lifestyle—an excellent way to start applying change in your life.
          </li>
          <li>
            <strong>Paula Garcés (Tribu Mujer Latina)</strong>: From her creative and therapeutic space, Paula will lead the workshop "Traveling Roots, Sustaining Emotions." Using sustainable art and natural materials, she will guide you in creating a personal amulet that represents your ability to flourish anywhere, transforming emotions into resilience and creativity.
          </li>
          <li>
            <strong>Sol Espinosa (Home Wellness organisers)</strong>: As a Professional Wellness Organizer & Holistic Health Coach, Sol will present the workshop "The Closet as a Mirror: Roots, Identity, and Sustainability." You will explore how your clothing choices can reflect your well-being and values, transforming your closet into a conscious, meaningful space.
          </li>
        </ul>

        <p><strong>Agenda:</strong></p>
        <ul>
          <li>8:00 AM - 8:15 AM: Welcome & Introduction.</li>
          <li>8:15 AM - 9:00 AM: Workshop 1: "Habits that Activate You and Sustain the Planet" with Irene Lalana.</li>
          <li>9:00 AM - 9:15 AM: Break.</li>
          <li>9:15 AM - 10:15 AM: Workshop 2: "Traveling Roots, Sustaining Emotions" with Paula Garcés.</li>
          <li>10:15 AM - 10:30 AM: Break & Healthy Snacks.</li>
          <li>10:30 AM - 11:30 AM: Workshop 3: "The Closet as a Mirror: Roots, Identity, and Sustainability" with Sol Espinosa.</li>
          <li>11:30 AM - 12:00 PM: Final Reflections, Sponsors, Raffle, Networking, and Farewell.</li>
        </ul>

        <p>Location: Latin Manna, South Brisbane.</p>
        <form
          action="https://events.humanitix.com/experience-a-journey-to-holistic-wellness-iv/tickets"
          target="_blank"
        >
          <button className="form-button">Enrol here. Limited spots.</button>
        </form>
      </section>

      <section id="whatson">
        <h1>What's On</h1>
        <div className="parrafos">
          <p>Personal training is not for you? Social Sport is what you are made for? Need something more affordable?</p>
          <p>Work out with more people looking for the same goals as you...</p>
          <p>Do you have a group of people you would love to work out with? Distance is not a problem...</p>
          <p>Work-outs in progress!</p>
        </div>

        <div className="whatson-img">
          <div className="whatson-row">
            <img
              src="/images/Timetable_swimming_aquaerobics_fitness.jpg"
              alt="Picture about timetable"
            />
          </div>
        </div>

        <section id="pilates" className="parrafos">
          <p><strong>New Mind Body Challenge partnership with Latin Temple Beauty</strong>:</p>
          <p>What is included:</p>
          <ul>
            <li>Latin Temple Beauty Body Contouring treatments.</li>
            <li>
              + Fitness program tailored to your needs.
              <ul>
                <li>SMART FITNESS PROGRAM: Group online fitness and pilates sessions</li>
                <li>SMART STROKES PROGRAM: Swimming sessions.</li>
                <li>AQUAFITNESS PROGRAM: Group sessions</li>
              </ul>
            </li>
          </ul>

          <p>Join the challenge here:</p>
          <form
            action="https://latintemplebeauty.com.au/project/beauty-challenge-body-and-mind/?et_fb=1&PageSpeed=off"
            target="_blank"
          >
            <button className="form-button">Latin Temple Beauty website</button>
          </form>
        </section>
      </section>
    </main>
  );
}