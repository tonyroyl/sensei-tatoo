import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Reveals content on scroll into view. If the user prefers reduced motion,
 * content is shown immediately with no transform — the safety fallback the
 * brief requires.
 */
export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const Tag = as as "div";
  const motionClass = reduced
    ? ""
    : `transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${motionClass} ${className}`}
      style={reduced ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
