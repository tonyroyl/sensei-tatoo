import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// ReactBits — SplitText. Splits a heading into words/letters and reveals them
// with a staggered rise when scrolled into view. Re-implemented locally on top
// of the GSAP/ScrollTrigger already used by the site. Reduced-motion safe.
type SplitTextProps = {
  text: string;
  className?: string;
  /** Split granularity. */
  by?: "words" | "chars";
  /** Per-unit stagger in seconds. */
  stagger?: number;
};

export function SplitText({
  text,
  className = "",
  by = "words",
  stagger = 0.045,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const units =
    by === "chars" ? Array.from(text) : text.split(/(\s+)/);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const parts = el.querySelectorAll<HTMLElement>("[data-split]");
    gsap.set(parts, { yPercent: 110, opacity: 0 });
    const tween = gsap.to(parts, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, stagger, text]);

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {units.map((u, i) =>
        /^\s+$/.test(u) ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-split className="inline-block will-change-transform" aria-hidden>
              {u}
            </span>
          </span>
        ),
      )}
    </span>
  );
}
