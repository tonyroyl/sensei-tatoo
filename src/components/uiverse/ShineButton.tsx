import type { ButtonHTMLAttributes, ReactNode } from "react";

// Uiverse-inspired shine button (uiverse.io is network-blocked here, so this is
// an on-brand re-creation of the classic "light sweep on hover" pattern). The
// sweep lives in the .uiverse-shine class in index.css and is reduced-motion safe.
export function ShineButton({
  children,
  className = "",
  ...props
}: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`uiverse-shine inline-flex items-center justify-center rounded-full bg-gold px-5 font-sans text-sm font-semibold text-obsidian shadow-gold transition-transform duration-200 hover:scale-[1.03] active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
