import { useState } from "react";
import { PRODUCTS, type Product } from "../lib/products";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { Reveal } from "./Reveal";

export function Shop() {
  const [active, setActive] = useState<Product | null>(null);

  return (
    <section
      id="collection"
      className="relative scroll-mt-20 border-t border-gold/10 bg-obsidian py-24 sm:py-32"
    >
      <div className="container-edge">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-3">La Collection · Héliade</p>
          <h2 className="font-display text-4xl font-black leading-tight text-solar sm:text-6xl">
            Chaque pièce, une station du vol.
          </h2>
          <p className="mt-4 text-base text-solar/60">
            Six pièces, trois actes. De l'armature des ailes à la cendre de la
            chute — la garde-robe de ceux qui montent quand même.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal as="div" key={product.id} delay={(i % 3) * 70}>
              <ProductCard product={product} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}
