import { lazy, Suspense } from "react";
import { CartProvider } from "./lib/cart";
import { ToastProvider } from "./lib/toast";
import { useReducedMotion } from "./lib/useReducedMotion";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SignatureScene } from "./components/SignatureScene";
import { CartDrawer } from "./components/CartDrawer";
import { Toaster } from "./components/Toaster";
import { Footer } from "./components/Footer";

// Shop carries reablocks (+ its motion dep), so it loads as its own async chunk
// off the critical path — it lives below the fold anyway.
const Shop = lazy(() =>
  import("./components/Shop").then((m) => ({ default: m.Shop })),
);

export default function App() {
  const reduced = useReducedMotion();
  // Smooth scroll only when motion is welcome.
  useSmoothScroll(!reduced);

  return (
    <ToastProvider>
      <CartProvider>
        <a href="#collection" className="skip-link">
          Aller à la collection
        </a>

        <Nav />

        <main>
          <Hero />
          <SignatureScene />
          <Suspense
            fallback={<div className="min-h-screen bg-obsidian" aria-hidden />}
          >
            <Shop />
          </Suspense>
        </main>

        <Footer />

        {/* Overlays */}
        <CartDrawer />
        <Toaster />
      </CartProvider>
    </ToastProvider>
  );
}
