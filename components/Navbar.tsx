"use client";

import { useState } from "react";

const links = [
  { label: "Artistes", href: "#artistes" },
  { label: "Galerie", href: "#galerie" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cinnabar font-brush text-lg font-bold text-bone shadow-glow transition-transform group-hover:scale-105">
            先
          </span>
          <span className="font-brush text-lg font-bold tracking-wide">
            Sensei<span className="text-cinnabar">.</span>
          </span>
        </a>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm text-bone/70 transition-colors hover:text-bone after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-cinnabar after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#contact"
          className="hidden rounded-full border border-cinnabar/60 px-5 py-2 text-sm font-medium text-bone transition-colors hover:bg-cinnabar md:inline-block"
        >
          Prendre RDV
        </a>

        {/* Burger mobile */}
        <button
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-bone transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-bone transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-ink-700/60 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-bone/80 hover:text-cinnabar"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-cinnabar px-5 py-2 text-center text-sm font-medium text-bone"
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
