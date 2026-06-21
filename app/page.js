import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const PRODUCTS = [
  {
    name: "Crème cicatrisante Sensei",
    category: "Soin",
    price: 19.9,
    oldPrice: 24.9,
    rating: 4.8,
    badge: "Best-seller",
  },
  {
    name: "Baume protecteur SPF50",
    category: "Soin",
    price: 22.0,
    rating: 4.6,
  },
  {
    name: "Kit aftercare complet",
    category: "Coffret",
    price: 49.0,
    oldPrice: 59.0,
    rating: 4.9,
    badge: "-17%",
  },
  {
    name: "Film protecteur seconde peau",
    category: "Accessoire",
    price: 12.5,
    rating: 4.4,
    inStock: false,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="accueil">
        {/* Hero */}
        <section className="border-b border-ink-line">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Studio de tatouage
            </p>
            <h1 className="font-display text-4xl leading-tight text-neutral-100 sm:text-6xl">
              L'art de l'encre,
              <br />
              <span className="text-gold">maîtrisé.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-neutral-400">
              Tatouages sur-mesure, flash exclusifs et produits de soin pensés
              pour sublimer et protéger votre peau.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#boutique"
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Voir la boutique
              </a>
              <a
                href="#contact"
                className="rounded-full border border-ink-line px-6 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-gold hover:text-gold"
              >
                Prendre RDV
              </a>
            </div>
          </div>
        </section>

        {/* Boutique */}
        <section id="boutique" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl text-neutral-100">
                La boutique
              </h2>
              <p className="mt-1 text-neutral-400">
                Soins et accessoires sélectionnés par le studio.
              </p>
            </div>
            <a
              href="#"
              className="hidden text-sm font-medium text-gold hover:underline sm:block"
            >
              Tout voir →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="border-t border-ink-line bg-ink-soft"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-500 sm:px-6">
          © {new Date().getFullYear()} Sensei Tattoo — Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
