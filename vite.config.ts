import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Local dev/preview serve from root; the GitHub Pages build is served from
  // /sensei-tatoo/ (the repo name = project-pages base path).
  base: command === "build" ? "/sensei-tatoo/" : "/",
  plugins: [react()],
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep the heavy WebGL engine out of the critical bundle.
          three: ["three"],
          gsap: ["gsap"],
        },
      },
    },
  },
}));
