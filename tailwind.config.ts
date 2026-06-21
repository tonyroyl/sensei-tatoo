import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0b",
          900: "#101012",
          800: "#17171a",
          700: "#222226",
          600: "#34343a",
        },
        cinnabar: {
          DEFAULT: "#c4302b",
          400: "#e0483f",
          500: "#c4302b",
          600: "#9c211d",
        },
        bone: "#e8e4dc",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        brush: ["var(--font-brush)", "serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(196,48,43,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
