import Image from "next/image";

export default function WhatsOnPage() {
  return (
    <main>
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