import Image from "next/image";

export default function WhatsOnPage() {
  return (
    <main>
      <section id="pilates" className="parrafos">
        <p><strong>Experience a journey to a holistic Wellness III: 23/08/2025.</strong></p>

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
        <p>What Awaits You on the 23th August:</p>
        <p>
          'Connect, Nourish, Shine!' At this edition, you'll dive into conscious breathing practices, learn about balanced nutrition, and discover natural facial self-care to boost your beauty from the inside out.
        </p>

        <ul>
          <li>
            <strong>Ale Caicedo</strong>: certified breathwork instructor, will guide you to nurture your feminine energy through transformative breathing, embodiment, and self-care practices. She'll help you connect with your inner wisdom and authentic self.
          </li>
          <li>
            <strong>Karina Ruiz Serkovic (Natura Med)</strong>: naturopath (BHSc Australia), will teach you how to balance your hormones with "Seed Cycling" and which anti-inflammatory foods are your best mates for boosting your immune system.
          </li>
          <li>
            <strong>Angie Mckay (Latin Temple Beauty)</strong>: over 20 years of experience in skin treatments, will show you how to naturally care for your skin, learn to use a gua sha, activate your collagen, and slow down ageing without invasive methods.
          </li>
        </ul>

        <p><strong>Agenda:</strong></p>
        <ul>
          <li>8:00 AM - 8:15 AM: Welcome & Introduction</li>
          <li>8:15 AM - 9:00 AM: Workshop 1: Connect - Conscious Breathing & Feminine Energy with Ale Caicedo</li>
          <li>9:00 AM - 9:15 AM: Break</li>
          <li>9:15 AM - 10:15 AM: Workshop 2: Nourish - Hormonal Balance & Anti-Inflammatory Foods with Karina Ruiz Serkovic</li>
          <li>10:15 AM - 10:30 AM: Break & Healthy Snacks</li>
          <li>10:30 AM - 11:30 AM: Workshop 3: Shine - Natural Facial Self-Care with Gua Sha with Angie Mckay</li>
          <li>11:30 AM - 12:00 PM: Closing Remarks, Networking, Raffle & Farewell</li>
        </ul>

        <p>Location: Latin Manna, South Brisbane.</p>
        <form
          action="https://events.humanitix.com/experience-a-journey-to-holistic-wellness-iii/tickets"
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