import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IcarusHandle } from "../webgl/IcarusScene";
import { useReducedMotion } from "../lib/useReducedMotion";
import { ArrowDownIcon } from "./icons";

gsap.registerPlugin(ScrollTrigger);

const ACTS = [
  {
    eyebrow: "I · L'Ascension",
    title: "Conçu pour ceux qui montent quand même.",
    body: "Le sol s'éloigne. L'air se raréfie. Chaque plume tient encore.",
  },
  {
    eyebrow: "II · L'Apogée",
    title: "La cire chauffe. Une plume cède.",
    body: "Trop près du soleil. L'instant exact où la gloire bascule.",
  },
  {
    eyebrow: "III · La Chute",
    title: "Trop haut. Trop près. Trop tard.",
    body: "Ce qui monte redescend. La collection naît de la chute.",
  },
] as const;

function actFromProgress(p: number): 0 | 1 | 2 {
  if (p < 0.4) return 0;
  if (p < 0.72) return 1;
  return 2;
}

export function SignatureScene() {
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState<0 | 1 | 2>(0);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    // Reduced motion: never start WebGL or ScrollTrigger. Show all acts statically.
    if (reduced) {
      setWebglOk(false);
      return;
    }
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !sticky || !wrapper) return;

    let handle: IcarusHandle | null = null;
    let st: ScrollTrigger | null = null;
    let cancelled = false;
    const onResize = () => handle?.resize(sticky.clientWidth, sticky.clientHeight);

    // Lazy-load the Three.js engine so it stays off the critical path.
    import("../webgl/IcarusScene")
      .then(({ createIcarusScene }) => {
        if (cancelled) return;
        handle = createIcarusScene(canvas);
        if (!handle) {
          setWebglOk(false);
          return;
        }
        onResize();
        window.addEventListener("resize", onResize);

        let lastAct: 0 | 1 | 2 = 0;
        st = ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            handle?.setProgress(self.progress);
            const a = actFromProgress(self.progress);
            if (a !== lastAct) {
              lastAct = a;
              setAct(a);
            }
          },
          // Stop rendering when the scene is well off-screen (perf budget).
          onToggle: (self) => handle?.setRunning(self.isActive),
        });
        ScrollTrigger.refresh();
      })
      .catch(() => {
        if (!cancelled) setWebglOk(false);
      });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      st?.kill();
      handle?.dispose();
    };
  }, [reduced]);

  // ---- Static fallback (reduced motion or no WebGL) -----------------------
  if (reduced || !webglOk) {
    return (
      <section
        id="manifeste"
        className="relative overflow-hidden border-b border-gold/10 bg-obsidian py-28"
        aria-label="Le mythe d'Icare"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_20%,rgba(232,163,61,0.18),transparent_70%)]" />
        <div className="container-edge relative flex flex-col gap-16">
          {ACTS.map((a) => (
            <div key={a.eyebrow} className="max-w-2xl">
              <p className="eyebrow mb-3">{a.eyebrow}</p>
              <h2 className="font-display text-3xl font-black leading-tight text-solar sm:text-5xl">
                {a.title}
              </h2>
              <p className="mt-4 text-base text-solar/60">{a.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ---- Live WebGL sequence -------------------------------------------------
  return (
    <section
      id="manifeste"
      ref={wrapperRef}
      className="relative h-[320vh]"
      aria-label="Séquence du mythe d'Icare — l'ascension, l'apogée, la chute"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        {/* Legibility scrim over the WebGL for the copy. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/40" />

        <div className="container-edge relative flex h-full flex-col justify-end pb-24">
          {ACTS.map((a, i) => (
            <div
              key={a.eyebrow}
              className="absolute max-w-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: act === i ? 1 : 0,
                transform: act === i ? "translateY(0)" : "translateY(20px)",
              }}
              aria-hidden={act !== i}
            >
              <p className="eyebrow mb-3">{a.eyebrow}</p>
              <h2 className="font-display text-4xl font-black leading-[0.95] text-solar sm:text-6xl lg:text-7xl">
                {a.title}
              </h2>
              <p className="mt-5 max-w-md text-base text-solar/70 sm:text-lg">{a.body}</p>
            </div>
          ))}
        </div>

        {/* Skip affordance — design-system: always offer a way past immersive intros. */}
        <a
          href="#collection"
          className="absolute bottom-6 right-5 z-10 flex items-center gap-1.5 rounded-full border border-gold/30 bg-obsidian/50 px-4 py-2 text-xs font-medium text-solar/80 backdrop-blur transition-colors hover:border-gold hover:text-gold-bright sm:right-8"
        >
          Passer l'intro
          <ArrowDownIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
