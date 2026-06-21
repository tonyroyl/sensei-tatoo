import type { Product } from "../lib/products";

/**
 * Clearly-marked photo placeholder. Holds the exact aspect ratio of the final
 * shot (no layout shift on swap) and surfaces the shooting note for the team.
 * Replace by dropping the collection image in as a child / background later.
 */
export function PhotoSlot({
  photo,
  label,
  className = "",
}: {
  photo: Product["photo"];
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm border border-gold/15 bg-gradient-to-br from-obsidian to-[#161210] ${className}`}
      style={{ aspectRatio: photo.ratio }}
      role="img"
      aria-label={`Emplacement photo — ${label}. À remplacer par le visuel de la collection.`}
    >
      {/* Subtle ember vignette so empty slots still read as "on brand". */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(200,132,30,0.12),transparent_60%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="font-sans text-[10px] font-medium uppercase tracking-myth text-gold/60">
          Photo · {photo.ratio}
        </span>
        <span className="max-w-[26ch] font-sans text-[11px] leading-relaxed text-solar/40">
          {photo.note}
        </span>
      </div>
      {/* Corner crop marks to read as a deliberate photo slot, not a missing image. */}
      <Corner className="left-2 top-2" />
      <Corner className="right-2 top-2 rotate-90" />
      <Corner className="bottom-2 right-2 rotate-180" />
      <Corner className="bottom-2 left-2 -rotate-90" />
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute h-4 w-4 border-l border-t border-gold/40 ${className}`}
    />
  );
}
