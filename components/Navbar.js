"use client";

import { useState } from "react";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Galerie", href: "#galerie" },
  { label: "Flash", href: "#flash" },
  { label: "Boutique", href: "#boutique" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-ink/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/60 font-display text-lg text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
            墨
          </span>
          <span className="font-display text-lg tracking-wide text-neutral-100">
            Sensei <span className="text-gold">Tattoo</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-neutral-300 transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#contact"
          className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft md:inline-block"
        >
          Prendre RDV
        </a>

        {/* Burger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-ink-line text-neutral-200 md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-line bg-ink-soft md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-sm font-medium text-neutral-300 hover:bg-ink hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gold px-5 py-2 text-center text-sm font-semibold text-ink"
              >
                Prendre RDV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
