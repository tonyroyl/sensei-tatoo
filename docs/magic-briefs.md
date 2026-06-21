# Briefs Magic (21st.dev) — à utiliser dans une nouvelle session

> Le serveur MCP `magic` est installé (scope user) et connecté. Ses tools
> `21st_magic_*` se chargent **au démarrage** d'une session Claude Code.
> **Prochaine session** : ouvre ce repo, puis demande
> _« régénère la nav / la carte produit via Magic »_. Claude appellera Magic
> avec les briefs ci-dessous, puis intégrera le résultat aux tokens ICARE.

## Direction artistique à injecter dans chaque prompt Magic

- **Palette** : obsidienne `#0A0807`, or en fusion `#C8841E` / or clair `#E8A33D`,
  braise `#7A2410`, blanc solaire `#F4ECDD`.
- **Typo** : Fraunces (display/serif), Inter (corps).
- **Tokens Tailwind déjà dispo** : `bg-obsidian`, `text-solar`, `text-gold`,
  `text-gold-bright`, `bg-gold`, `border-gold/30`, `shadow-ember`, `shadow-gold`,
  `font-display`, `font-sans`, `tracking-myth`, classe `.eyebrow`.
- **Ton** : sombre, mythologique, doré, cinématique. Micro-interactions
  150–300 ms, `transform`/`opacity` uniquement, `prefers-reduced-motion` respecté.
- **Stack cible** : React + TypeScript + Tailwind (pas de styled-components).

---

## Brief 1 — Navigation (remplace `src/components/Nav.tsx`)

**Prompt Magic :**

> Crée une barre de navigation e-commerce premium, dark + accents or, pour une
> marque de streetwear « ICARE ».
> - Sticky en haut ; transparente en haut de page, puis fond
>   `obsidian/80 + backdrop-blur` + fine bordure or après défilement.
> - Wordmark « ICARE » à gauche (serif Fraunces, lettrage espacé).
> - Liens centraux : Manifeste, Collection, La Chute — avec **état actif**
>   (scroll-spy : surlignage du lien de la section visible) et underline animé au
>   survol (scaleX depuis la gauche).
> - À droite : bouton « Besace » (panier) avec icône sac, **badge compteur** doré.
> - **Menu mobile** : bouton burger → overlay plein écran animé (slide/fade),
>   liens en grand format Fraunces, fermeture au clic d'un lien et via Échap.
> - Accessibilité : focus visibles, `aria-current` sur le lien actif, piège de
>   focus dans l'overlay mobile, cibles ≥ 44px.
> - États hover/focus/active distincts. Micro-anims 150–300 ms.

**Intégration après génération :**
- Garder le câblage panier existant : `useCart()` → `count`, `open()`
  (voir `src/lib/cart.tsx`).
- Réutiliser `BagIcon` de `src/components/icons.tsx` (pas d'emoji).
- Brancher le scroll-spy sur les sections `#manifeste`, `#collection`, `#chute`
  (IntersectionObserver).
- Re-styliser aux tokens ICARE ci-dessus ; pas de couleurs en dur.

---

## Brief 2 — Carte produit (remplace `src/components/ProductCard.tsx`)

**Prompt Magic :**

> Crée une carte produit e-commerce premium (dark, accents or fondu) pour du
> streetwear haut de gamme.
> - Visuel en haut (ratio portrait), zoom doux de l'image au survol de la carte.
> - Badge « acte » en surimpression (coin haut-gauche) avec tooltip d'explication.
> - Nom (serif Fraunces), tagline en italique, prix en or (chiffres tabulaires).
> - **Quick-add au survol** : bouton « Ajout rapide » qui glisse depuis le bas du
>   visuel + **sélecteur de taille** inline (pills) avant l'ajout.
> - États : hover (élévation/zoom), focus clavier, indisponible/disabled.
> - Feedback : à l'ajout, micro-animation + déclenche un toast.
> - Accessibilité : la carte entière atteignable au clavier, libellés ARIA sur
>   le quick-add et les tailles, cibles ≥ 44px, contraste AA.
> - Responsive : 1 col mobile → 2 → 3 desktop.

**Intégration après génération :**
- Conserver le type `Product` et `formatPrice` (`src/lib/products.ts`).
- Réutiliser le placeholder `PhotoSlot` (ratio + consigne photo) tant que les
  visuels réels ne sont pas livrés.
- Câbler le quick-add sur `useCart().add(productId, size)` ; la modale détaillée
  `ProductModal` reste pour la fiche complète.
- Garder `Tooltip` maison (`src/components/Tooltip.tsx`) pour le badge d'acte.
- Re-styliser aux tokens ICARE ; conserver `tnum` pour les prix.

---

## Rappel workflow Magic

1. Lancer la génération via Magic (`/ui` ou builder) avec le prompt ci-dessus.
2. Choisir/raffiner la variante (`21st_magic_component_refiner` si besoin).
3. Copier le composant généré dans `src/components/`, remplacer les couleurs/typo
   par les tokens ICARE, brancher la logique (cart/scroll-spy), vérifier
   `npm run build` + accessibilité + `prefers-reduced-motion`.
