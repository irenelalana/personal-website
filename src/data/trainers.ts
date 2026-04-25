// src/data/trainers.ts

export interface Trainer {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  url: string;
}

export const TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "Irene Lalana (Irela Aqua & Fitness)",
    role: "Sport Science & Fitness Coach",
    description: "Recognised as the 2025 National Group Exercise Leader of the Year with over 20 years' experience. She's dedicated to building inclusive, high-impact active lifestyles for the community.",
    image: "/images/irela.png",
    url: "https://www.irelaaquaandfitness.com/"
  },
  {
    id: 2,
    name: "Paola Castro",
    role: "Yoga & Pilates Instructor",
    description: "Certified Yoga teacher with a background in neuroscience and therapy. She leads accessible sessions ranging from 'Inner Child' family yoga to high-intensity mobility drills.",
    image: "/images/Paola.png",
    url: "https://www.instagram.com/yoga_with_pow/"
  },
  {
    id: 3,
    name: "Lala (Fuego Beats)",
    role: "Zumba Instructor & Nutritionist",
    description: "A certified fitness expert who treats dance as powerful medicine for the soul. Her 'Zumba with Intention' sessions combine HIIT and agility with a focus on emotional transformation.",
    image: "/images/lala.png",
    url: "https://www.zumba.com/en-US/p/FuegoBeats"
  },
  {
    id: 4,
    name: "Yaya (Xango Capoeira)",
    role: "Capoeira Instructor & Osteopath",
    description: "A professional Osteopath and Capoeira practitioner with 10 years under her belt. She blends martial arts with Yoga and Pilates for a unique, holistic approach to movement.",
    image: "/images/Yaya_foto.png",
    url: "https://xangocapoeira.com/"
  },
  {
    id: 5,
    name: "Karina (Natura Med)",
    role: "Nutritionist",
    description: "Qualified and certified naturopath based in Australia, with a background in medicine from Peru. She takes an integrative and evidence-informed approach to health, focusing on gut health, immune function, and both women's and men's health.",
    image: "/images/Karina_foto.png",
    url: "https://naturamed.com.au/"
  },
  {
    id: 6,
    name: "Denise (Move in Tune)",
    role: "Strength & Conditioning PT",
    description: "An Argentine Personal Trainer (Cert IV) specialising in functional circuits and mobility. She focuses on building strength and flexibility through sessions that really get you moving.",
    image: "/images/denise.png",
    url: "https://www.instagram.com/move.in.tune/"
  },
  {
    id: 7,
    name: "Manuela Osorio (Manu Fit)",
    role: "Fitness & Booty Specialist",
    description: "Qualified PT (Cert III & IV) leading intensive lower-body sessions. Her 30-minute 'Booty with Bands' classes are designed for maximum energy and toning.",
    image: "/images/Manu_foto.png",
    url: "https://www.instagram.com/__manufit/"
  },
  {
    id: 8,
    name: "Belén Roldán",
    role: "Zumba & Pilates Specialist",
    description: "With 11 years of experience in fitness and event management, Belén specialises in Zumba, Pilates and functional training to boost community wellbeing. She is passionate about creating inclusive activities that foster genuine connection.",
    image: "/images/belen_foto.png",
    url: "https://www.instagram.com/belen.roldanfit/"
  },
  {
    id: 9,
    name: "Gabriela (PCYC)",
    role: "Gymnastics for kids",
    description: "Gymnastics classes for kids aged 3-12, designed to build confidence, coordination and strength in a fun and supportive environment.",
    image: "/images/Gabriela_PHOTO.png",
    url: "https://www.pcyc.org.au"
  },
  {
    id: 10,
    name: "Robledo (Roblading)",
    role: " Inline skate sessions for kids",  
    description: "Inspiring children to skating through fun games and structured sessions, developing balance, coordination, and confidence while having a great time.",
    image: "/images/Roble_foto.png",
    url: "https://www.roblading.com.au/#home"
  },
  {
    id: 11,
    name: "Agus & Leo",
    role: "Zumba instructors",  
    description: "Argentinian instructors Leo (Buenos Aires) and Agus (Córdoba) bring over 10 years of Zumba Fitness® experience to Brisbane. Fusing their energy as a team to help you level up and smash your goals together through the power of dance.",
    image: "/images/LEO_AGUS_FOTO.png",
    url: "https://www.instagram.com/leopelayo_instructor/"
  },
  {
    id: 12,
    name: "Ileana (Rumbaile)",
    role: "Zumba instructor",  
    description: "Certified Zumba & Zumba Gold instructor bringing high energy and inclusive vibes to every class. I've been dancing since childhood and love making fitness feel like a party. My goal is to keep you moving, having fun, and leaving with a smile!",
    image: "/images/Ileana_foto.png",
    url: "https://www.instagram.com/rumbaile/"
  },
  {
    id: 13,
    name: "Elvira Cete",
    role: "Comedian",
    description: "A comedian who brings laughter and joy to the event. Her performances are designed to entertain and engage all participants.",
    image: "/images/Elvira_foto.png",
    url: "https://elviracete.com/"
  },
  {
    id: 14,
    name: "Helen Gomez (Vitalis)",
    role: "Nutritionist",
    description: "Clinical Nutritionist with over 10 years of experience helping people like you regain their well-being in a holistic ( the body as a whole connected mind-body spirit) and personalised way.",
    image: "/images/Helen_vitalis_redondo.png",
    url: "https://vitalisnutritionclinic.com.au/"
  },
  {
    id: 15,
    name: "Irene Usabiaga",
    role: "Massage Therapist",
    description: "Certified Remedial Massage Therapist with over 6 years of experience and a background as a former professional cyclist. Extensive experience across sports, clinical, and wellness environments.",
    image: "/images/Irene_redondo.png",
    url: "https://www.instagram.com/ireneusabiaga/"
  },
  {
    id: 16,
    name: "Pilar Martin",
    role: "Pelvic Health Physiotherapist",
    description: "Empowering individuals to overcome pelvic floor dysfunction with confidence and support. Discover how to optimise your pelvic health and enhance your fitness and overall wellbeing as part of a sustainable lifestyle.",
    image: "/images/pilar_redondo.png",
    url: "https://www.instagram.com/pilarespelvicos/"
  },
  {
    id: 17,
    name: "Lourdes Villalobos (It's Aura)",
    role: "Women's Health Coach",
    description: "Supporting women through different stages of life, helping them reconnect with their bodies, improving their wellbeing, and approaching their health with greater awareness.",
    image: "/images/Lourde_redondo.png",
    url: "https://www.instagram.com/itsaura.au/"
  },

];