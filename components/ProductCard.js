"use client";

function formatPrice(value, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export default function ProductCard({
  name,
  category,
  price,
  oldPrice,
  rating = 0,
  image,
  badge,
  inStock = true,
  onAdd,
}) {
  const discounted = typeof oldPrice === "number" && oldPrice > price;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-2xl hover:shadow-black/40">
      {/* Visuel */}
      <div className="relative aspect-square overflow-hidden bg-neutral-900">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center font-display text-5xl text-ink-line">
            墨
          </div>
        )}

        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
            {badge}
          </span>
        )}

        {!inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-neutral-200">
            Rupture
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="mb-1 text-xs font-medium uppercase tracking-widest text-gold/80">
            {category}
          </span>
        )}

        <h3 className="font-display text-lg leading-snug text-neutral-100">
          {name}
        </h3>

        {/* Note */}
        <div className="mt-2 flex items-center gap-1" aria-label={`Note ${rating} sur 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className={`h-4 w-4 ${
                i < Math.round(rating) ? "text-gold" : "text-ink-line"
              }`}
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
          ))}
          {rating > 0 && (
            <span className="ml-1 text-xs text-neutral-500">{rating.toFixed(1)}</span>
          )}
        </div>

        {/* Prix + action */}
        <div className="mt-auto flex items-end justify-between pt-5">
          <div className="flex flex-col">
            {discounted && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
            <span className="font-display text-xl text-neutral-100">
              {formatPrice(price)}
            </span>
          </div>

          <button
            type="button"
            disabled={!inStock}
            onClick={onAdd}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:bg-ink-line disabled:text-neutral-500"
          >
            {inStock ? "Ajouter" : "Indisponible"}
          </button>
        </div>
      </div>
    </article>
  );
}
