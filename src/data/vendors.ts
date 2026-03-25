export interface Vendor {
  id: number;
  name: string;
  logo: string;
  url: string;
}

export const VENDORS: Vendor[] = [
  { id: 1, name: " Delicious Spanish Bites", logo: "/images/spanishbites.png", url: "https://deliciousspanishbites.com.au/" },
  { id: 2, name: "Latin Books", logo: "/images/latinbooks.png", url: "https://latinbooks.com.au/" },
  { id: 3, name: " Vida Free", logo: "/images/vidafree.png", url: "https://www.instagram.com/vidafreeaus/" },
  { id: 4, name: "Icote Treats by Maria", logo: "/images/icote_vendor_logo.png", url: "https://www.instagram.com/icote_treats_by_maria/" },
  { id: 5, name: "Pachamama Coffee", logo: "/images/pachamama_LOGO.png", url: "https://www.pachamamacoffee.com.au/" }

  // Añade todos los que necesites
]