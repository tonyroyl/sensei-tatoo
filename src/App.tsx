import { CartProvider } from "./lib/cart";
import { ToastProvider } from "./lib/toast";
import { useReducedMotion } from "./lib/useReducedMotion";
import { useSmoothScroll } from "./lib/useSmoothScroll";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SignatureScene } from "./components/SignatureScene";
import { Shop } from "./components/Shop";
import { CartDrawer } from "./components/CartDrawer";
import { Toaster } from "./components/Toaster";
import { Footer } from "./components/Footer";

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
          <Shop />
        </main>

        <Footer />

        {/* Overlays */}
        <CartDrawer />
        <Toaster />
      </CartProvider>
    </ToastProvider>
  );
}
