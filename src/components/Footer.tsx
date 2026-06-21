export function Footer() {
  return (
    <footer
      id="chute"
      className="relative scroll-mt-20 overflow-hidden border-t border-gold/10 bg-obsidian"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="container-edge py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl font-black tracking-tight text-solar">
              ICARE
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-solar/55">
              Ce qui monte redescend. Ce qui brûle laisse une trace. Habillez la
              vôtre.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <p className="eyebrow mb-4">Maison</p>
            <ul className="space-y-2.5 text-sm text-solar/60">
              <li><a className="transition-colors hover:text-solar" href="#collection">Collection</a></li>
              <li><a className="transition-colors hover:text-solar" href="#manifeste">Le mythe</a></li>
              <li><a className="transition-colors hover:text-solar" href="#top">Retour en haut</a></li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Rester proche du soleil</p>
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="newsletter"
                type="email"
                autoComplete="email"
                placeholder="votre@email.com"
                className="h-11 min-w-0 flex-1 rounded-full border border-gold/25 bg-obsidian/60 px-4 text-sm text-solar placeholder:text-solar/30 focus:border-gold"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-gold px-5 text-sm font-semibold text-obsidian transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Suivre
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-gold/10 pt-6 text-xs text-solar/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} ICARE. Tous droits réservés.</p>
          <p className="italic">« Conçu pour ceux qui montent quand même. »</p>
        </div>
      </div>
    </footer>
  );
}
