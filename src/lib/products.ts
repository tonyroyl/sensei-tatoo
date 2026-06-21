// ICARE collection — "Héliade". Each piece is a station of the myth:
// l'ascension, l'apogée, la chute. Copy is written in the voice of the myth.

export type Product = {
  id: string;
  name: string;
  /** One-line myth voice, shown under the name. */
  tagline: string;
  /** Act of the myth this piece belongs to. */
  act: "Ascension" | "Apogée" | "Chute";
  category: string;
  price: number; // EUR
  description: string;
  materials: string[];
  sizes: string[];
  /** Photo slot guidance — to be replaced by the collection's real visuals. */
  photo: {
    ratio: "3 / 4" | "4 / 5" | "1 / 1";
    /** Shooting note for the brand's photographer. */
    note: string;
  };
};

export const CURRENCY = "EUR";

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(value);
}

export const PRODUCTS: Product[] = [
  {
    id: "rachis-jacket",
    name: "Veste Rachis",
    tagline: "L'armature des ailes. Avant le vol.",
    act: "Ascension",
    category: "Outerwear",
    price: 320,
    description:
      "La structure portante de la collection. Coupe technique, coutures apparentes comme les nervures d'une plume. Pensée pour l'élan — épaules dégagées, dos cintré.",
    materials: ["Coton ciré 12oz", "Doublure cupro", "Zip métal patiné or"],
    sizes: ["XS", "S", "M", "L", "XL"],
    photo: {
      ratio: "3 / 4",
      note: "Plan pied, fond obsidienne, lumière rasante latérale or pour révéler les nervures de couture.",
    },
  },
  {
    id: "ascension-hoodie",
    name: "Hoodie Ascension",
    tagline: "Conçu pour ceux qui montent quand même.",
    act: "Ascension",
    category: "Sweats",
    price: 180,
    description:
      "Maille lourde, capuche oversize qui encadre le regard vers le haut. Sérigraphie ton sur ton d'une trajectoire ascendante dans le dos.",
    materials: ["Molleton 480g/m²", "Cordons cire d'abeille", "Œillets laiton"],
    sizes: ["S", "M", "L", "XL"],
    photo: {
      ratio: "4 / 5",
      note: "Modèle vu de dos, capuche relevée, regard vers le haut hors-cadre. Halo doré en contre-jour.",
    },
  },
  {
    id: "wax-tee",
    name: "Tee La Cire",
    tagline: "La cire chauffe. Une plume cède.",
    act: "Apogée",
    category: "T-shirts",
    price: 75,
    description:
      "Jersey solaire. Impression haute densité d'une plume qui commence à fondre — l'instant exact où l'apogée bascule. Le point de non-retour, porté.",
    materials: ["Jersey 220g/m² peigné", "Encre puff dégradée or → braise"],
    sizes: ["XS", "S", "M", "L", "XL"],
    photo: {
      ratio: "1 / 1",
      note: "Plan poitrine serré sur l'impression. Lumière dure, ombre nette. Détail de la texture puff.",
    },
  },
  {
    id: "corona-cap",
    name: "Casquette Corona",
    tagline: "Trop près du soleil.",
    act: "Apogée",
    category: "Accessoires",
    price: 60,
    description:
      "Visière structurée, broderie corona solaire au fil métallisé. La pièce qui regarde le soleil en face.",
    materials: ["Sergé coton", "Broderie fil métallisé or", "Boucle laiton massif"],
    sizes: ["Unique"],
    photo: {
      ratio: "1 / 1",
      note: "Packshot 3/4 sur socle obsidienne, reflet doré contrôlé sur la broderie.",
    },
  },
  {
    id: "fall-cargo",
    name: "Cargo La Chute",
    tagline: "Trop haut. Trop près. Trop tard.",
    act: "Chute",
    category: "Pantalons",
    price: 210,
    description:
      "Cargo ample, poches descendantes, délavage braise sur l'ourlet comme une cendre qui remonte. La gravité faite vêtement.",
    materials: ["Ripstop coton délavé", "Sangles techniques", "Boutons pression patinés"],
    sizes: ["S", "M", "L", "XL"],
    photo: {
      ratio: "3 / 4",
      note: "Plan pied légèrement contre-plongée pour la verticalité de la chute. Dégradé braise visible en bas.",
    },
  },
  {
    id: "ember-knit",
    name: "Maille Braise",
    tagline: "Ce qui reste quand le vol s'arrête.",
    act: "Chute",
    category: "Mailles",
    price: 240,
    description:
      "Tricot torsadé, dégradé thermique obsidienne vers braise. Chaud, dense, terrestre — le retour au sol.",
    materials: ["Laine mérinos 70%", "Alpaga 30%", "Dégradé teinture pièce"],
    sizes: ["S", "M", "L", "XL"],
    photo: {
      ratio: "4 / 5",
      note: "Buste, lumière douce enveloppante pour la matière. Fond dégradé obsidienne → braise.",
    },
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
