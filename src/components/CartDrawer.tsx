import { useEffect, useRef, useState } from "react";
import { useCart } from "../lib/cart";
import { formatPrice } from "../lib/products";
import { useToast } from "../lib/toast";
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "./icons";

export function CartDrawer() {
  const { isOpen, close, resolvedLines, total, count, setQty, remove, clear } =
    useCart();
  const { notify } = useToast();
  const panelRef = useRef<HTMLDivElement>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  // Scroll lock + Escape while open.
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const handleCheckout = () => {
    // Placeholder checkout — real payment flow plugs in here.
    setCheckingOut(true);
    window.setTimeout(() => {
      setCheckingOut(false);
      clear();
      close();
      notify("Commande simulée", "Le paiement réel sera branché ici.");
    }, 1100);
  };

  return (
    <>
      {/* Scrim */}
      <div
        className={`fixed inset-0 z-[90] bg-obsidian/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden
      />

      <aside
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-[95] flex w-full max-w-md flex-col border-l border-gold/15 bg-[#100c0a] shadow-ember transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Votre besace"
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-solar">
            <BagIcon className="h-5 w-5 text-gold-bright" />
            Besace
            <span className="tnum text-sm font-normal text-solar/50">({count})</span>
          </h2>
          <button
            type="button"
            data-autofocus
            onClick={close}
            aria-label="Fermer la besace"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-solar transition-colors hover:border-gold hover:text-gold-bright"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {resolvedLines.length === 0 ? (
            <EmptyState onClose={close} />
          ) : (
            <ul className="space-y-4">
              {resolvedLines.map((line) => (
                <li
                  key={`${line.productId}-${line.size}`}
                  className="flex gap-4 rounded-lg border border-gold/10 bg-obsidian/40 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-base font-semibold text-solar">
                          {line.product.name}
                        </p>
                        <p className="text-xs text-solar/50">Taille {line.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.productId, line.size)}
                        aria-label={`Retirer ${line.product.name} taille ${line.size}`}
                        className="shrink-0 text-solar/40 transition-colors hover:text-gold-bright"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-gold/20">
                        <QtyButton
                          label={`Diminuer la quantité de ${line.product.name}`}
                          onClick={() =>
                            setQty(line.productId, line.size, line.qty - 1)
                          }
                        >
                          <MinusIcon className="h-4 w-4" />
                        </QtyButton>
                        <span className="tnum w-7 text-center text-sm font-medium text-solar">
                          {line.qty}
                        </span>
                        <QtyButton
                          label={`Augmenter la quantité de ${line.product.name}`}
                          onClick={() =>
                            setQty(line.productId, line.size, line.qty + 1)
                          }
                        >
                          <PlusIcon className="h-4 w-4" />
                        </QtyButton>
                      </div>
                      <span className="tnum text-sm font-semibold text-gold-bright">
                        {formatPrice(line.subtotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / total / checkout */}
        {resolvedLines.length > 0 && (
          <footer className="border-t border-gold/10 px-5 py-5">
            <div className="mb-1 flex items-center justify-between text-sm text-solar/60">
              <span>Sous-total</span>
              <span className="tnum">{formatPrice(total)}</span>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-base font-semibold text-solar">
                Total
              </span>
              <span className="tnum font-display text-xl font-bold text-gold-bright">
                {formatPrice(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="flex h-12 w-full items-center justify-center rounded-full bg-gold px-6 font-sans text-sm font-semibold text-obsidian shadow-gold transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {checkingOut ? "Traitement…" : "Passer commande"}
            </button>
            <p className="mt-3 text-center text-[11px] text-solar/40">
              Paiement de démonstration · les frais de port s'affichent à l'étape
              suivante.
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}

function QtyButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-solar transition-colors hover:text-gold-bright"
    >
      {children}
    </button>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <BagIcon className="h-10 w-10 text-gold/40" />
      <div>
        <p className="font-display text-lg text-solar">La besace est vide.</p>
        <p className="mt-1 text-sm text-solar/50">
          Rien à porter pour la montée. Pas encore.
        </p>
      </div>
      <a
        href="#collection"
        onClick={onClose}
        className="mt-2 rounded-full border border-gold/30 px-6 py-2.5 text-sm font-medium text-solar transition-colors hover:border-gold hover:text-gold-bright"
      >
        Voir la collection
      </a>
    </div>
  );
}
