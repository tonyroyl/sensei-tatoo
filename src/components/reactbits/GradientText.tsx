import type { ReactNode } from "react";

// ReactBits — GradientText. An animated molten-gold gradient panned across the
// glyphs. Re-implemented locally and re-skinned to ICARE tokens.
export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`rb-gradient-text ${className}`}>{children}</span>;
}
