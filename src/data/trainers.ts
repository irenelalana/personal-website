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
    description: "Recognised as the 2025 National Group Exercise Leader of the Year with over 20 years' experience. Shes dedicated to building inclusive, high-impact active lifestyles for the community.",
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
    image: "/images/Yaya_foto.png",
  },
  {
    id: 5,
    name: "Karina (Natura Med)",
    role: "Nutritionist",
    description: "Nutritionist...",
    image: "/images/Karina_foto.png",
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
    name: "Manuela Osorio (Manu Fit)",
    role: "Fitness & Booty Specialist",
    description: "Qualified PT (Cert III & IV) leading intensive lower-body sessions. Her 30-minute 'Booty with Bands' classes are designed for maximum energy and toning.",
    image: "/images/Manu_foto.png",
  },
  {
    id: 8,
    name: "Belén Roldán",
    role: "Zumba & Pilates Specialist",
    description: "With 11 years of experience in fitness and event management, Belén specialises in Zumba, Pilates and functional training to boost community wellbeing. She is passionate about creating inclusive activities that foster genuine connection.",
    image: "/images/belen_foto.png",
  },
  {
    id: 9,
    name: "Gabriela (PCYC)",
    role: "Gymnastics for kids",
    description: "Gymnastics classes for kids aged 3-12, designed to build confidence, coordination and strength in a fun and supportive environment.",
    image: "/images/PCYC_logo.png",
  },
  {
    id: 10,
    name: "Elvira",
    role: "Comedian",
    description: "A comedian who brings laughter and joy to the event. Her performances are designed to entertain and engage all participants.",
    image: "/images/Elvira_foto.png",
  }
];