// ReactBits — ShinyText. A light sweep travels across the text.
// Re-implemented locally (reactbits.dev is network-blocked here) and re-skinned
// to ICARE's gold-on-solar palette via CSS in index.css.
type ShinyTextProps = {
  text: string;
  /** Seconds per sweep. */
  speed?: number;
  className?: string;
};

export function ShinyText({ text, speed = 5, className = "" }: ShinyTextProps) {
  return (
    <span
      className={`rb-shiny-text ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
}
