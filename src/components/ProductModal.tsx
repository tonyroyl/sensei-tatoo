import { useEffect, useRef, useState } from "react";
import { formatPrice, type Product } from "../lib/products";
import { useCart } from "../lib/cart";
import { PhotoSlot } from "./PhotoSlot";
import { CloseIcon } from "./icons";

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Reset selection whenever a new product opens.
  useEffect(() => {
    if (product) {
      setSize(product.sizes.length === 1 ? product.sizes[0] : null);
      setError(false);
    }
  }, [product]);

  // Focus management + scroll lock + Escape, only while open.
  useEffect(() => {
    if (!product) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel) {
        const focusable = panel.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!size) {
      setError(true);
      return;
    }
    add(product.id, size, 1);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm animate-[toast-in_0.25s_ease]"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-2xl border border-gold/15 bg-[#100c0a] shadow-ember animate-[toast-in_0.3s_cubic-bezier(0.16,1,0.3,1)] sm:rounded-2xl"
      >
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Fermer la fiche produit"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-obsidian/60 text-solar transition-colors hover:border-gold hover:text-gold-bright"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="grid gap-6 p-5 sm:grid-cols-2 sm:gap-8 sm:p-8">
          <PhotoSlot photo={product.photo} label={product.name} />

          <div className="flex flex-col">
            <p className="eyebrow mb-2">{product.act} · {product.category}</p>
            <h2
              id="product-modal-title"
              className="font-display text-3xl font-black leading-tight text-solar"
            >
              {product.name}
            </h2>
            <p className="mt-1 text-base italic text-solar/55">{product.tagline}</p>
            <p className="tnum mt-4 font-sans text-2xl font-semibold text-gold-bright">
              {formatPrice(product.price)}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-solar/70">
              {product.description}
            </p>

            <ul className="mt-5 space-y-1.5">
              {product.materials.map((mtl) => (
                <li
                  key={mtl}
                  className="flex items-center gap-2 text-sm text-solar/60"
                >
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />
                  {mtl}
                </li>
              ))}
            </ul>

            {/* Size selection */}
            <fieldset className="mt-6">
              <legend className="mb-2 font-sans text-xs font-medium uppercase tracking-myth text-solar/60">
                Taille
              </legend>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Taille">
                {product.sizes.map((s) => {
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setSize(s);
                        setError(false);
                      }}
                      className={`flex h-11 min-w-11 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors ${
                        active
                          ? "border-gold bg-gold text-obsidian"
                          : "border-gold/25 text-solar hover:border-gold/60"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {error && (
                <p role="alert" className="mt-2 text-sm text-gold-bright">
                  Choisis une taille pour continuer.
                </p>
              )}
            </fieldset>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-7 flex h-12 items-center justify-center rounded-full bg-gold px-8 font-sans text-sm font-semibold text-obsidian shadow-gold transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            >
              Ajouter à la besace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
