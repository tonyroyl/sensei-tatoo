type CardProps = {
  name: string;
  role: string;
  blurb: string;
  tag: string;
  image: string;
};

export default function Card({ name, role, blurb, tag, image }: CardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-900 transition-all duration-300 hover:-translate-y-1 hover:border-cinnabar/50 hover:shadow-glow">
      {/* Visuel */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`Travail de ${name}`}
          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-cinnabar/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-bone">
          {tag}
        </span>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="font-brush text-xl font-bold">{name}</h3>
        <p className="mt-1 text-sm text-cinnabar-400">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-bone/65">{blurb}</p>

        <a
          href="#contact"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-bone transition-colors hover:text-cinnabar"
        >
          Voir le book
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}
