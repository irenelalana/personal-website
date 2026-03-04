// src/data/trainers.ts

export interface Trainer {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

export const TRAINERS: Trainer[] = [
  {
    id: 1,
    name: "Irene Lalana (Irela Aqua & Fitness)",
    role: "Sport Science & Fitness Coach",
    description: "Recognised as the 2025 National Group Exercise Leader of the Year with over 20 years’ experience. She’s dedicated to building inclusive, high-impact active lifestyles for the community.",
    image: "/images/irela.png",
  },
  {
    id: 2,
    name: "Paola Castro",
    role: "Yoga & Pilates Instructor",
    description: "Certified Yoga teacher with a background in neuroscience and therapy. She leads accessible sessions ranging from 'Inner Child' family yoga to high-intensity mobility drills.",
    image: "/images/Paola.png",
  },
  {
    id: 3,
    name: "Lala (Fuego Beats)",
    role: "Zumba Instructor & Nutritionist",
    description: "A certified fitness expert who treats dance as powerful medicine for the soul. Her 'Zumba with Intention' sessions combine HIIT and agility with a focus on emotional transformation.",
    image: "/images/lala.png",
  },
  {
    id: 4,
    name: "Yaya (Xango Capoeira)",
    role: "Capoeira Instructor & Osteopath",
    description: "A professional Osteopath and Capoeira practitioner with 10 years under her belt. She blends martial arts with Yoga and Pilates for a unique, holistic approach to movement.",
    image: "/images/Xango.png",
  },
  {
    id: 5,
    name: "Carla (Booty Beats)",
    role: "PT & PE Teacher",
    description: "Physical Education teacher and founder of the 'Booty Beats' method. She specialises in resistance band training focused on muscle activation and high-energy tracks.",
    image: "/images/lala.png",
  },
  {
    id: 6,
    name: "Denise (Move in Tune)",
    role: "Strength & Conditioning PT",
    description: "An Argentine Personal Trainer(Cert IV) specialising in functional circuits and mobility. She focuses on building strength and flexibility through sessions that really get you moving.",
    image: "/images/denise.png",
  },
  {
    id: 7,
    name: "Manuela Osorio",
    role: "Fitness & Booty Specialist",
    description: "Qualified PT (Cert III & IV) leading intensive lower-body sessions. Her 30-minute 'Booty with Bands' classes are designed for maximum energy and toning.",
    image: "/images/lala.png",
  },
  {
    id: 8,
    name: "Belén Roldán",
    role: "Yoga & Mindfulness Coach",
    description: "Focused on holistic health and genuine connection. She leads sessions that balance energy and relaxation to get your mind and body perfectly in sync.",
    image: "/images/lala.png",
  }
];