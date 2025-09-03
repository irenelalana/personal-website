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
        <p>Yes!! Online live fitness sessions: Monday (strength, weekly special), Tuesday (Mat Pilates) and Friday (fitness, full body), 6.15am.</p>
          <p>Aquafitness - Musgrave Park Pool: Tuesday and Thursday 9.00am, Monday and Wednesday 5.30pm. Fridays 12.30pm</p>
          <p>Fitness in the park - Toowong: Thursday 6.00am and Friday 9.45am.</p>
          <p>Swimming - Smart Strokes at Musgrave Park Pool: Monday and Wednesday 6.30pm.</p>
          <p>*Brisbane time.</p>
        
        <p className="question">How can I follow an online workout if I am not good with technology?</p>
        <p>Our live online workouts are conducted via the Zoom app. I will help you with a simple setup. You just need to download the app on your device and position it so I can see you training. This allows me to check your body position and technique in real time, ensuring a safe and effective workout.</p>
        <p className="question">What is the difference between Aquafitness and a regular gym workout?</p>
        <p>Aquafitness and a regular gym workout both provide effective training, but the key difference lies in the medium: water. The natural buoyancy of water supports your body, making movements low-impact and gentle on your joints. This significantly reduces the risk of injury while providing natural resistance training. A regular gym workout, on the other hand, relies on gravity and weights, which can put more stress on the body.</p>

        <p className="question">How can I join an online session if I don´t have much place and any equipment at home?</p>
        <p>You don't need a lot! We only need about two square meters of space. The workouts use easy-to-find equipment, such as an elastic band (which I provide as a welcoming pack), a chair, a cushion, a stick, and household items like containers, bricks, or a backpack full of books.</p>
       
        <p className="question">How can I book a training session?</p>
        <p>You can book a session through my website, by the ´contact me´ button. For in-person sessions, we will coordinate time and dates that work best for you.</p>

        <p className="question">Can you create a customized workout plan for me?</p>
        <p>Yes! I offer personalized workout plans that are tailored to your specific goals and needs, for fitness, swimming...</p>

        <p className="question">How long are the training sessions?</p>
        <p>Classes typically last between 45 to 60 minutes, but can be customized to fit your schedule and needs, according to your level.</p>

        <p className="question">What if I need to cancel or reschedule a session?</p>
        <p>I understand that life can get in the way sometimes, so I offer flexible cancellation and rescheduling policies. Please let me know as soon as possible if you need to cancel or reschedule a session.</p>

        <p className="question">What should I wear for a training session?</p>
        <p>Wear comfortable workout clothes and athletic shoes for fitness sessions. For swimming sessions, swimsuit and goggles. Swimming cap also recommended. For all of them, I recommend bringing a water bottle and towel as well.</p>

        <p className="question">Who are your Adults Swimming Lessons for?</p>
        <p>Our swimming lessons are for all adults, regardless of their current level. We specialize in helping a diverse group of people, including:</p>
        <ul>
        <li>Adults from a multicultural background who never learned to swim as a child.</li>
        <li>New triathletes who want to improve their technique before starting a training plan.</li>
        <li>Swimmers who need to fix their stroke technique or build confidence before joining a squad.</li>
        </ul>
        <p>Our goal is to help you feel strong and confident in the water, whether you're just learning or refining your skills.</p>
       
        <p className="question">What is the difference between Aquafitness, Aquaerobics, and Aquagym?</p>
        <p>There is no difference! These are simply different names for the same thing: exercise in the water. Whether you call it Aquafitness, Aquaerobics, or Aquagym, the goal is the same—to use the benefits of water to get a fun, effective, and full-body workout.</p>
        
        <p className="question">Where are the Aquafitness and Swimming classes held?</p>
        <p>Our classes are held in two convenient locations in Brisbane: Musgrave Park Swimming Pool in West End and the QUT Kelvin Grove campus.</p>

        <p className="question">Can I try a class before committing to a full program?</p>
        <p>Yes, you can! I offer trial classes for my Aquagym, Smart Fitness, and Smart Strokes programs. This is a great way to experience a session firsthand and decide if it's the right fit for you before committing to a full program.</p>
       
        <p className="question">Do you offer nutrition coaching?</p>
        <p>No, I´m sorry, I am not a qualified nutrition professional. However, I can offer you some tips to help you develop healthier habits.</p>

        <p className="question">What if I have an injury or a specific health concern?</p>
        <p>All of my programs can be adapted to your needs. As a coach, my goal is to provide safe workouts that improve your quality of life, not cause pain. I will customize the program for your specific needs, adapting exercises on hard days or working around existing injuries to help you build strength and move with confidence.</p>
       
        <p className="question">I don´t know how to swim and I can not afford private lessons. What can I do?</p>
        <p>Contact me and I will find the perfect buddy for you to share the lessons and make it more affordable and fun.</p>

        <p className="question">Do you offer Wellness and Fitness programs for companies?</p>
        <p>Sure thing! Contact me through the contact form on this website and tell me what kind of activities you would like to enjoy with your mates. Offering exercise at workplaces improves productivity, motivation and relationships.</p>
      </div>
    </section>
  );
}