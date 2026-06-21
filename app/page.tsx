import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

const artists = [
  {
    name: "Kenji",
    role: "Irezumi · Traditionnel japonais",
    blurb:
      "Pièces larges au tracé classique : dragons, koi, vagues. Le travail à l'aiguille tebori sur demande.",
    tag: "Irezumi",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Yuki",
    role: "Fine line · Botanique",
    blurb:
      "Trait fin, fleurs et minéraux. Compositions délicates pensées pour épouser le corps.",
    tag: "Fine line",
    image:
      "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ren",
    role: "Blackwork · Géométrie",
    blurb:
      "Aplats noirs profonds et symétries. Le contraste comme signature de l'encre Sensei.",
    tag: "Blackwork",
    image:
      "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <p className="font-brush text-cinnabar-400 tracking-[0.3em] uppercase text-sm">
            先生 · Sensei Tattoo
          </p>
          <h1 className="mt-4 font-brush text-4xl sm:text-6xl font-bold leading-tight">
            L&apos;encre comme
            <span className="text-cinnabar"> discipline</span>.
          </h1>
          <p className="mt-6 max-w-xl text-bone/70">
            Studio de tatouage à l&apos;esprit japonais. Irezumi, trait fin et
            blackwork, sur rendez-vous uniquement.
          </p>
        </section>

        {/* Cartes artistes */}
        <section id="artistes" className="pb-24">
          <h2 className="font-brush text-2xl font-bold mb-8">Les artistes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((a) => (
              <Card key={a.name} {...a} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
