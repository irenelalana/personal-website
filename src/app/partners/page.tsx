import React from "react";
import styles from "./Partners.module.css";

// --- DATOS DE VENUES ---
const VENUES_DATA = [
  {
    id: 1,
    name: "Musgrave Park Pool",
    logo: "/images/brand_logo_musgrave_aquaerobics.jpg",
    url: "https://www.musgraveparkaquaticcentre.com.au/",
    description: ["West End.", "50m pool and LTS pools.", "Swimming lessons and Aquafitness sessions."]
  },
  {
    id: 2,
    name: "QUT Aquatic Centre",
    logo: "/images/QUT_VENUE.png",
    url: "https://www.qut.edu.au/study/student-life/qut-sport-fitness-and-aquatic-centres",
    description: ["Kelvin Grove campus.", "25m indoor pool.", "Swimming lessons and Aquafitness sessions."]
  },
  {
    id: 3,
    name: "Riverside Fitness",
    logo: "/images/brand_logo_riversidefitness.jpg",
    url: "https://www.riversidefitness.com.au/",
    description: ["Toowong.", "Fully equipped gym.", "Personal Training and small fitness group sessions."]
  }
];

// --- DATOS DE PARTNERS ---
const PARTNERS_DATA = [
  {
    id: 1,
    name: "The Fluid X",
    logo: "/images/brand_logo_xfluid.jpg",
    url: "https://www.thefluidx.com/discount/FXIRENE?sca_ref=7425059.1DaTlk8GtBsENr&utm_source=uppromote&utm_medium=affiliate&utm_campaign=default",
    description: "Adjustable, water-filled weights. Like a sandbag or medicine ball to squat, press, swing, or lift. Unstable water weight trains every muscle. Empty and recycle the water, pack it, and don’t miss a work out anywhere.",
    benefit: "20% off using the link on this logo (2 items min) and code: FXIRENE"
  },
  {
    id: 2,
    name: "Evervessel",
    logo: "/images/brand_logo_evervessel.jpg",
    url: "https://evervessel.sjv.io/aOevdY",
    description: "Quality Drinking Vessels 💧 Easy Clean, Easy Carry, Easy Fit | Designed in Australia.",
    benefit: "Free whisk balls with any drinking vessel purchased."
  },
  {
    id: 3,
    name: "Intimassage",
    logo: "/images/brand_logo_intimassage.jpg",
    url: "https://www.intimassage.com.au/",
    description: "Remedial, Sport Massage & Myotherapy in Coorparoo.",
    benefit: "10% off your first appointment."
  },
  {
    id: 4,
    name: "Latin Temple Beauty",
    logo: "/images/brand_logo_latintemplebeauty.jpg",
    url: "https://latintemplebeauty.com.au/",
    description: "A wide range of non-surgical beauty treatments including facial treatments, body treatments, cosmetic procedures, and advanced skincare therapies. Enhance your natural beauty and address specific skin concerns.",
    benefit: "10% off skin treatments and a FREE facial first consultation."
  },
  {
    id: 5,
    name: "Verdemente Wellness",
    logo: "/images/brand_logo_verdemente.jpg",
    url: "https://www.fresha.com/a/verdemente-wellness-by-maria-celeste-grisendi-mcdowall-6-de-vito-place-cqam71rk/booking?menu=true",
    description: "Remedial massage, pregnancy massage, and pelvic floor therapy, to relieve pain, recover, and feel their best. Deep passion for women’s health and postpartum recovery, holistic and evidence-based approach.",
    benefit: "10% off treatments. Feel better, move better, live better!"
  },
  {
    id: 6,
    name: "Chef Angelica R.M.",
    logo: "/images/brand_logo_ange_cook.png",
    url: "https://www.instagram.com/angelica.r.m.chef?igsh=em9wdXlld3NhcGlu",
    description: "Private culinary expert drawing upon international experience, from cafes to Qantas Lounge. She excels at fusing global methods and ingredients. Offers: private chef at home, private event with cooking class, and workshops.",
    benefit: "40% off a private event with cooking class."
  },
  {
    id: 7,
    name: "NutriWellness",
    logo: "/images/brand_logo_nutriwellness.jpg",
    url: "https://Www.nutriwellness.com.au",
    description: "Guide to build a healthy relationship with food and your body. Tools, strategies, and knowledge to help you make informed choices and achieve your goals, creating sustainable changes for long-term well-being.",
    benefit: "$20 OFF your initial consultation."
  },
  {
    id: 8,
    name: "Latin Books",
    logo: "/images/brand_logo_latinbooks.jpg",
    url: "https://www.latinbooks.com.au",
    description: "Spanish books for children and adults. Stock of new and bestselling books across a wide range of categories. Special order service, with many years’ experience to track down specific titles.",
    benefit: "Special Gift Card."
  },
  {
    id: 9,
    name: "Navarvilla Beauty Salon",
    logo: "/images/brand_logo_navarvilla.jpg",
    url: "https://navarvilla.com.au/",
    description: "Navarvilla Beauty Salon is a boutique hair salon in West End, specialised in keratin and nanoplasty treatments.",
    benefit: "Free blow dry."
  }
];

export default function PartnersPage(): React.JSX.Element {
  return (
    <section id="partners-modern" className={styles.pageContainer}>
      
      {/* --- SECCIÓN VENUES --- */}
      <div className={styles.sectionHeader}>
        <h1>Venues</h1>
        <p>You can find me training and coaching here:</p>
      </div>

      <div className={styles.grid}>
        {VENUES_DATA.map((venue) => (
          <div key={venue.id} className={styles.card}>
            <a href={venue.url} target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <img src={venue.logo} alt={`${venue.name} logo`} />
              </div>
            </a>
            <div className={styles.cardContent}>
              <h3>{venue.name}</h3>
              {venue.description.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.divider}></div>

      {/* --- SECCIÓN PARTNERS --- */}
      <div className={styles.sectionHeader}>
        <h1>Partners</h1>
        <p>
          Very special partnerships with all these fabulous local collaborators.<br/>
          <strong>Do you want to join the community? Contact me to become a partner!</strong>
        </p>
      </div>

      <div className={styles.grid}>
        {PARTNERS_DATA.map((partner) => (
          <div key={partner.id} className={styles.card}>
            <a href={partner.url} target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <img src={partner.logo} alt={`${partner.name} logo`} />
              </div>
            </a>
            <div className={`${styles.cardContent} ${styles.flexGrow}`}>
              <h3>{partner.name}</h3>
              <p>{partner.description}</p>
            </div>
            {/* Esta caja se quedará siempre pegada abajo gracias al flex-grow de arriba */}
            <div className={styles.benefitBox}>
              <span className={styles.benefitTitle}>✨ Irela Clients Benefit:</span>
              <p>{partner.benefit}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
