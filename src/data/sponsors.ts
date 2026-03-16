export interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

export const SPONSORS: Sponsor[] = [
  { id: 1, name: "Kerplunk", logo: "/images/Kerplunk.png" },
  { id: 2, name: "Inti Massage & Myotherapy", logo: "/images/inti.png" },
  { id: 3, name: "Latin Temple Beauty", logo: "/images/ltb.png" },
  { id: 4, name: "Onkapa", logo: "/images/onkapa.png" },
  { id: 5, name: "Naturamed", logo: "/images/naturamed_logo.png" },
  { id: 6, name: "Art House", logo: "/images/Art_House_logo.png" },
  { id: 7, name: "Australian Steak", logo: "/images/Australian_Steak_logo.png" },

  // Añade todos los que necesites
]