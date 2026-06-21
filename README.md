# ICARE — Monte quand même

Site vitrine immersif et boutique pour la marque de streetwear **ICARE**,
inspirée du mythe d'Icare : _l'ascension, l'apogée, la chute_. Une expérience
narrative pilotée par le scroll, doublée d'une boutique fonctionnelle.

## Le moment signature

Une séquence solaire **WebGL réelle** (Three.js) :

- **Soleil volumétrique** — surface qui bout via un shader de bruit **FBM**,
  **corona** additive et **halo** fresnel.
- **Ailes modélisées** — plumes procédurales (rachis + barbes), couleur par
  vertex (obsidienne → or → braise).
- Le **scroll** pilote deux uniforms : `uHeat` (chaleur solaire) et
  `uDisintegration` (désintégration / chute des plumes) — la chute d'Icare,
  visualisée. Orchestré par **GSAP ScrollTrigger** + **Lenis** (smooth scroll).

Si `prefers-reduced-motion` est actif **ou** si le WebGL échoue, une version
statique entièrement révélée prend le relais — aucun contenu ni aucune vente
perdus.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · Three.js · GSAP/ScrollTrigger · Lenis

## Démarrer

```bash
npm install
npm run dev      # serveur de dev
npm run build    # typecheck + build de production
npm run preview  # prévisualiser le build
```

## Architecture

```
src/
  lib/
    products.ts         Catalogue (collection « Héliade »)
    cart.tsx            Panier — état en mémoire de SESSION (sessionStorage, jamais localStorage)
    toast.tsx           File de toasts (aria-live)
    useReducedMotion.ts Préférence de mouvement, en direct
    useSmoothScroll.ts  Pont Lenis ↔ ScrollTrigger
  webgl/
    IcarusScene.ts      Moteur Three.js (soleil + plumes) — chargé en lazy
    noise.glsl.ts       Bruit simplex 3D + FBM (GLSL)
  components/
    Hero · SignatureScene · Shop · ProductCard · ProductModal
    CartDrawer · Toaster · Nav · Footer · PhotoSlot · Reveal · icons
```

## Boutique

- Grille produits, fiches détaillées (taille, matières, description).
- **Panier latéral** (drawer) : ajout, quantités, total, toasts, checkout
  placeholder.
- État du panier persisté en **`sessionStorage`** (mémoire de session) —
  **localStorage n'est pas utilisé**, conformément au cahier des charges.

## Emplacements photo

Les visuels de la collection ne sont pas encore intégrés. Chaque produit
possède un **emplacement photo balisé** (`PhotoSlot`) qui :

- réserve le **ratio exact** du futur visuel (zéro layout shift au remplacement) ;
- affiche une **consigne de prise de vue** pour l'équipe photo.

Voir `photo: { ratio, note }` dans `src/lib/products.ts`. Pour intégrer un
visuel, remplacer le contenu de `PhotoSlot` par l'image (en conservant le
`aspect-ratio`).

## Accessibilité & performance

- `prefers-reduced-motion` respecté de bout en bout (CSS + JS + fallback WebGL).
- Focus visibles, navigation clavier, focus-trap sur modale/drawer, `aria-live`
  sur les toasts, skip-link.
- Lazy-loading du moteur Three.js (hors chemin critique), code-splitting
  `three` / `gsap`, `transform`/`opacity` uniquement pour les animations.

## Note outillage

Le brief prévoyait l'usage du MCP **21st.dev Magic** (`magic`) pour générer les
composants. Ce serveur MCP n'étant pas configuré dans cet environnement, les
composants ont été écrits à la main selon la même direction artistique. Une fois
le serveur `magic` installé, n'importe quel composant peut être régénéré/raffiné
via Magic — l'architecture ne s'y oppose pas.
