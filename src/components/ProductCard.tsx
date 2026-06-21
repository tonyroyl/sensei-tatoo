import { formatPrice, type Product } from "../lib/products";
import { PhotoSlot } from "./PhotoSlot";

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block w-full text-left"
        aria-label={`Voir la fiche de ${product.name}`}
      >
        <div className="overflow-hidden rounded-sm">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <PhotoSlot photo={product.photo} label={product.name} />
          </div>
        </div>
        <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-obsidian/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-myth text-gold-bright backdrop-blur">
          {product.act}
        </span>
      </button>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight text-solar">
            {product.name}
          </h3>
          <p className="mt-0.5 text-sm italic text-solar/55">{product.tagline}</p>
        </div>
        <span className="tnum shrink-0 font-sans text-base font-semibold text-gold-bright">
          {formatPrice(product.price)}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onOpen(product)}
        className="mt-4 flex h-11 items-center justify-center rounded-full border border-gold/25 font-sans text-sm font-medium text-solar transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold-bright"
      >
        Choisir
      </button>
    </article>
  );
}
