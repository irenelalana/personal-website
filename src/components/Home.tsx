import React from "react";
import '../app/style.css'
const Home: React.FC = () => {
  return (
    <>
      <div className="irela-header-phone">
        <img src="/images/Irela_swimming_pool.JPG" alt="Swimming Pool" />
      </div>
      <div className="irela-header">
        <img src="/images/Fit_happy1.JPG" alt="Fit happy 1" />
        <img src="/images/Fit_happy2.JPG" alt="Fit happy 2" />
        <img src="/images/Fit_happy3.JPG" alt="Fit happy 3" />
        <img src="/images/Fit_happy4.JPG" alt="Fit happy 4" />
      </div>
      <main>
        <p className="irela-intro">
          Ready for an effective and fun fitness experience?
        </p>
        <p className="irela-intro">
          Hi! I'm Irene Lalana, Australian Master swimming Champion 2025,
          Spanish Lifesaving National records and Silver medal in World
          Championship 2024, sports science graduate, and your go-to coach for
          adult swimming, aquafitness, and functional fitness. With over 20
          years of experience, I am dedicated to making fitness enjoyable and
          accessible, especially for my amazing over-40 crew. Whether you're
          diving into the pool for the first time or looking to enhance your
          fitness routine, I'm here to help you make some enjoyable waves and
          moves on your health journey.
        </p>

        <div className="home-programs">
          <a href="./functional">
            <img
              src="/images/Irela_functional_training_program.png"
              alt="Functional Training Program"
            />
          </a>
          <a href="./aquafitness">
            <img
              src="/images/Aquafitness_stretching21_program.png"
              alt="Aquafitness Stretching Program"
            />
          </a>
          <a href="swimming">
            <img
              src="/images/Irela_swimming_brisbane21_program.png"
              alt="Swimming Brisbane Program"
            />
          </a>
        </div>

        <div className="other-programs">
          <div className="sub-others">
            <a href="./pilates">
              <img
                src="/images/Pilates_core_balance_program.png"
                alt="Pilates Core Balance Program"
              />
            </a>
            <a href="./planning">
              <img
                src="/images/triathlon_Planning_program.png"
                alt="Triathlon Planning Program"
              />
            </a>
          </div>
          <div className="sub-others">
            <a href="corporate_events">
              <img
                src="/images/Corporate_wellness_program.png"
                alt="Corporate Wellness Program"
              />
            </a>
            <a href="brisbane_city_council">
              <img
                src="/images/Aquafitness_program.png"
                alt="Aquafitness Program"
              />
            </a>
          </div>
        </div>

        <section className="home-fluidx">
          <div>
            <h1>Fluid X</h1>
            <p>
              Adjustable, water-filled weights. Like a sandbag or medicine ball
              to squat, press, swing, or lift. Unstable water weight trains
              every muscle. Empty and recycle the water, pack it, and don't
              miss a work out anywhere.
            </p>
            <p>
              Get a 20% discount{" "}
              <a
                href="https://www.thefluidx.com/discount/FXIRENE?sca_ref=7425059.1DaTlk8GtBsENr&utm_source=uppromote&utm_medium=affiliate&utm_campaign=default"
                target="_blank"
                rel="noopener noreferrer"
              >
                clicking here
              </a>{" "}
              (2 items min) and using this code: FXIRENE
            </p>
          </div>
          <div>
            <iframe
              src="https://www.youtube.com/embed/kLAhHFxThc8?si=cEA97BaaA7Xl2v1I"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section className="home-fluidx">
          <div>
            <h1>Evervessel</h1>
            <p>
              Quality sustainable stainless drinking Vessels💧. Easy to clean,
              easy to carry, easy to fit. Designed in Australia.
            </p>
            <p>
              Free whisk balls with any drinking vessel purchased.{" "}
              <a
                href="https://evervessel.sjv.io/aOevdY"
                target="_blank"
                rel="noopener noreferrer"
              >
                clicking here
              </a>
            </p>
          </div>
          <div>
            <iframe
              src="https://www.youtube.com/embed/T1Migxs1fY4?si=WJUIFIfxd4fWG_Tz"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section id="gift-cards">
          <h1>Vouchers</h1>
          <p>Is there anything better in life that gifting Health to your loved ones?</p>

          <p>
            Contact me to customise your Gift Card with Swimming Lessons,
            Personal Trainer Sessions, Triathlon plans, Online Work Outs... for
            Christmas presents, Birthdays gifts, Mother's day creative
            present, Father's day different gift... You book them, we design
            your voucher and they enjoy their present.
          </p>
          <div className="voucher">
            <img
              src="/images/Irela_Fitness_voucher.jpg"
              alt="Voucher card image"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
