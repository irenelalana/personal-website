import Link from 'next/link';

export default function TermsAndConditionsPage() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        
        {/* Botón para volver */}
        <Link href="/activate-brisbane" className="back-link">
          &larr; Back to Event Page
        </Link>

        {/* SECCIÓN 1: TERMS AND CONDITIONS */}
        <section className="legal-section">
          <h1 className="legal-title">Terms & Conditions</h1>
          <h2 className="legal-subtitle">ACTÍVATE BRISBANE 2026</h2>
          
          <p className="legal-intro">
            By purchasing or registering for a ticket to ACTÍVATE BRISBANE 2026 (“the Event”), you agree to the following Terms and Conditions:
          </p>

          <div className="legal-content">
            <h3>1. Ticket Access</h3>
            <p>1.1 A valid ticket grants the holder entry to ACTÍVATE BRISBANE 2026 on 12 July 2026 at Yeronga Eagles F.C, Brisbane.</p>
            <p>1.2 Your ticket provides access to all general activities scheduled during the Event, including race, soccer tournament (Soccer Team Pack Needed), fitness classes, sports activities, family games, entertainment and community activations.</p>
            <p>1.3 Your ticket includes eligibility to participate in raffles and prize draws conducted during the Event (subject to draw times and availability).</p>
            <p>1.4 Some activities may have capacity limits and operate on a first-come, first-served basis for safety and operational reasons.</p>

            <h3>2. Health & Participation</h3>
            <p>2.1 Participation in physical activities (including but not limited to running, football, fitness classes, martial arts demonstrations and children’s activities) involves inherent physical risks.</p>
            <p>2.2 By attending, you confirm that you are physically fit and medically able to participate in the activities you choose to undertake.</p>
            <p>2.3 You participate at your own risk. To the extent permitted by Australian law, ACTÍVATE BRISBANE 2026, its organisers, volunteers, contractors and venue partners are not liable for any injury, loss or damage sustained during participation, except where liability cannot be excluded by law.</p>
            <p>2.4 Parents or legal guardians are responsible for supervising children under 18 at all times.</p>

            <h3>3. Event Changes, Transfers & Refund Policy</h3>
            <p>3.1 The organisers reserve the right to modify the event program, schedule, activity lineup, presenters or site layout if necessary due to operational or safety requirements.</p>
            <p>3.2 All ticket sales are final. No refunds will be provided for change of mind, scheduling conflicts, non-attendance or personal circumstances.</p>
            <p>3.3 Refunds will only be issued if the Event is cancelled in full due to force majeure circumstances beyond the organisers’ control (including but not limited to extreme weather, government directives, or safety emergencies).</p>
            <p>3.4 Tickets may be transferred to another person. It is the responsibility of the original ticket holder to ensure the new attendee receives all relevant event information and agrees to these Terms and Conditions.</p>

            <h3>4. Photography & Media</h3>
            <p>4.1 By attending the Event, you consent to being photographed or filmed.</p>
            <p>4.2 Images and video footage may be used for promotional, marketing and reporting purposes across websites, social media, grant reporting and future event promotions.</p>
            <p>4.3 If you do not wish to appear in media content, you must notify event staff upon arrival.</p>

            <h3>5. Code of Conduct</h3>
            <p>5.1 ACTÍVATE BRISBANE 2026 is an inclusive, family-friendly event. Discriminatory, aggressive, unsafe or inappropriate behaviour will not be tolerated.</p>
            <p>5.2 The Event welcomes attendees of all backgrounds. While programming may be delivered in Spanish and English (with some Portuguese-speaking presenters), participation is open to everyone.</p>
            <p>5.3 The organisers reserve the right to refuse entry or remove any attendee who compromises the safety, wellbeing or enjoyment of others.</p>

            <h3>6. Sustainability, Safety & Prohibited Items</h3>
            <p>6.1 The Event supports Brisbane City Council’s environmental priorities and promotes responsible community participation.</p>
            <p>6.2 No external alcohol may be brought into the Event. Alcohol consumption is strictly limited to beverages purchased from the licensed bar operated by Yeronga Eagles Football Club, in accordance with Queensland liquor licensing laws.</p>
            <p>6.3 Bags may be subject to inspection in accordance with venue policies. The organisers reserve the right to refuse entry to anyone bringing prohibited or unsafe items.</p>
            <p>6.4 Attendees are encouraged to dispose of waste responsibly and use recycling facilities provided onsite.</p>
            <p>6.5 To ensure a safe and enjoyable experience, attendees are encouraged to bring:</p>
            <ul className="legal-list">
              <li>Sun protection (hat, sunscreen, sunglasses)</li>
              <li>A reusable water bottle (refill stations will be available)</li>
              <li>Towel</li>
              <li>Exercise or yoga mat (for fitness sessions)</li>
              <li>Comfortable sportswear and appropriate footwear</li>
              <li>Any necessary personal medication</li>
              <li><strong>Refrain from bringing any type of chair, as they are not allowed in the soccer field</strong></li>
            </ul>
            <p>6.6 Single-use plastics are discouraged.</p>
            <p>6.7 The Event supports Brisbane City Council’s environmental priorities.</p>
            <p>6.8 Attendees are responsible for their personal belongings at all times.</p>

            <h3>7. Liability</h3>
            <p>To the fullest extent permitted by Australian law, the organisers disclaim liability for any personal injury, loss, theft or damage to personal property occurring at the Event, except where such liability cannot be excluded by law.</p>
            
            <p className="legal-highlight">
              <strong>By purchasing or holding a ticket, you acknowledge that you have read, understood and agreed to these Terms and Conditions.</strong>
            </p>
          </div>
        </section>

        <hr className="legal-divider" />

        {/* SECCIÓN 2: SUSTAINABILITY */}
        <section className="legal-section">
          <h1 className="legal-title">Sustainability & Environmental Commitment Statement</h1>
          <h2 className="legal-subtitle">ACTÍVATE BRISBANE 2026</h2>
          
          <p className="legal-intro">
            ACTÍVATE BRISBANE 2026 is committed to delivering a clean, environmentally responsible and sustainable community event aligned with Brisbane City Council’s environmental priorities and Brisbane Vision 2031.
          </p>
          <p>
            We recognise that large community gatherings carry environmental responsibilities, and we are committed to minimising our footprint through the following actions:
          </p>

          <div className="legal-content">
            <h3>Waste Reduction & Single-Use Plastic Elimination</h3>
            <ul className="legal-list">
              <li>No single-use plastic water bottles will be purchased or distributed.</li>
              <li>Attendees will be encouraged to bring reusable water bottles, with access to on-site refill stations.</li>
              <li>Vendors will be required to avoid single-use plastics, plastic straws and non-compostable packaging.</li>
              <li>Compostable or recyclable food packaging will be prioritised.</li>
              <li>Clearly labelled waste, recycling and compost stations will be available throughout the venue.</li>
            </ul>

            <h3>Sustainable Vendor & Supplier Practices</h3>
            <ul className="legal-list">
              <li>Preference will be given to local Brisbane-based suppliers and small businesses to reduce transport-related emissions.</li>
              <li>Vendors will be encouraged to minimise packaging and avoid disposable promotional materials.</li>
              <li>Digital marketing will replace printed materials wherever possible.</li>
            </ul>

            <h3>Active & Sustainable Transport</h3>
            <ul className="legal-list">
              <li>Attendees will be encouraged to walk, cycle or use public transport to attend the event.</li>
              <li>Event communications will include information about nearby public transport options.</li>
              <li>Bicycle access to the venue will be promoted.</li>
            </ul>

            <h3>Community Environmental Responsibility</h3>
            <ul className="legal-list">
              <li>Volunteers will support a “leave no trace” approach to ensure the venue remains clean.</li>
              <li>Participants will be encouraged to respect parklands and public facilities.</li>
              <li>Post-event clean-up procedures will ensure the site is restored to its original condition.</li>
            </ul>

            <h3>Long-Term Impact</h3>
            <p>
              Beyond a single-day event, ACTÍVATE BRISBANE promotes sustainable lifestyle habits by encouraging outdoor physical activity, use of public green spaces and community engagement in local sports clubs.
            </p>
            <p>
              We are committed to demonstrating that multicultural community events can be inclusive, vibrant and environmentally responsible, contributing positively to Brisbane’s vision as a clean, green and sustainable city.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}