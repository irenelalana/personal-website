export interface Vendor {
  id: number;
  name: string;
  logo: string;
}

export const VENDORS: Vendor[] = [
  { id: 1, name: " Delicious Spanish Bites", logo: "/images/spanishbites.png" },
  { id: 2, name: "Latin Books", logo: "/images/latinbooks.png" },
  { id: 3, name: " Vida Free", logo: "/images/vidafree.png" },

  // Añade todos los que necesites
]