import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires Lenis smooth scroll into GSAP's ScrollTrigger so scroll-driven
 * timelines and the WebGL scene stay in lockstep with the scrollbar.
 *
 * When `enabled` is false (reduced-motion or no JS animation wanted), we skip
 * Lenis entirely and let the browser scroll natively — ScrollTrigger still
 * works against the native scroll position.
 */
export function useSmoothScroll(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => {
      // GSAP ticker time is seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Let layout settle, then recalc trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);

    return () => {
      cancelAnimationFrame(raf);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
    };
  }, [enabled]);
}
