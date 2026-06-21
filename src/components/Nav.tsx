import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import { BagIcon } from "./icons";

export function Nav() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-gold/10 bg-obsidian/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-edge flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-display text-xl font-black tracking-myth text-solar"
          aria-label="ICARE — retour en haut"
        >
          ICARE
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="#manifeste">Manifeste</NavLink>
          <NavLink href="#collection">Collection</NavLink>
          <NavLink href="#chute">La Chute</NavLink>
        </div>

        <button
          type="button"
          onClick={open}
          className="relative flex h-11 items-center gap-2 rounded-full border border-gold/30 px-4 text-sm font-medium text-solar transition-colors hover:border-gold hover:text-gold-bright"
          aria-label={`Ouvrir la besace, ${count} article${count > 1 ? "s" : ""}`}
        >
          <BagIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Besace</span>
          {count > 0 && (
            <span className="tnum absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-obsidian">
              {count}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="font-sans text-sm font-medium text-solar/70 transition-colors hover:text-solar"
    >
      {children}
    </a>
  );
}
