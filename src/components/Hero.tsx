import { lazy, Suspense } from "react";
import { ArrowDownIcon } from "./icons";
import { ShinyText } from "./reactbits/ShinyText";
import { useReducedMotion } from "../lib/useReducedMotion";

// tsparticles is heavy — load the sparkles field as its own async chunk.
const SparklesCore = lazy(() =>
  import("./ui/sparkles").then((m) => ({ default: m.SparklesCore })),
);

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden"
    >
      {/* Layered solar glow behind the wordmark. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.35),rgba(200,132,30,0.12)_40%,transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(122,36,16,0.35),transparent_55%)]" />
      </div>

      {/* Feather dust: gold particles drifting around the ICARE "sun".
          Skipped under reduced-motion. */}
      {!reduced && (
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[88vmin] w-[96vmin] -translate-x-1/2 -translate-y-1/2">
          <Suspense fallback={null}>
            <SparklesCore
              background="transparent"
              minSize={0.6}
              maxSize={1.8}
              particleDensity={260}
              speed={1.8}
              particleColor="#E8A33D"
              className="h-full w-full [mask-image:radial-gradient(62%_62%_at_50%_45%,white,transparent_78%)]"
            />
          </Suspense>
        </div>
      )}

      <div className="container-edge relative flex flex-col items-center text-center">
        <p className="eyebrow mb-6 animate-fade-rise">
          <ShinyText text="Streetwear · Édition Héliade" speed={6} />
        </p>
        <h1 className="font-display text-[22vw] font-black leading-[0.82] tracking-tight text-solar animate-fade-rise sm:text-[18vw] lg:text-[14rem]">
          ICARE
        </h1>
        <p
          className="mt-6 max-w-xl text-balance text-lg text-solar/70 animate-fade-rise sm:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          Pour ceux qui montent quand même. L'ascension, l'apogée, la chute —
          portée comme une seconde peau.
        </p>
        <div
          className="mt-10 flex flex-col items-center gap-3 animate-fade-rise sm:flex-row"
          style={{ animationDelay: "220ms" }}
        >
          <a
            href="#collection"
            className="flex h-12 items-center justify-center rounded-full bg-gold px-8 font-sans text-sm font-semibold text-obsidian shadow-gold transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Voir la collection
          </a>
          <a
            href="#manifeste"
            className="flex h-12 items-center justify-center rounded-full border border-gold/30 px-8 font-sans text-sm font-medium text-solar transition-colors hover:border-gold hover:text-gold-bright"
          >
            Vivre le mythe
          </a>
        </div>
      </div>

      <a
        href="#manifeste"
        aria-label="Défiler vers le mythe"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70 transition-colors hover:text-gold-bright"
      >
        <ArrowDownIcon className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
