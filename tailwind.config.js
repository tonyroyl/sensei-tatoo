/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ICARE brand tokens — the myth's palette.
        obsidian: "#0A0807",
        gold: {
          DEFAULT: "#C8841E", // or en fusion
          bright: "#E8A33D",
        },
        ember: "#7A2410", // braise
        solar: "#F4ECDD", // blanc solaire
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        myth: "0.18em",
      },
      maxWidth: {
        edge: "88rem",
      },
      boxShadow: {
        ember: "0 0 60px -12px rgba(122, 36, 16, 0.55)",
        gold: "0 0 50px -10px rgba(200, 132, 30, 0.45)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translate3d(0, 12px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "toast-in": "toast-in 0.32s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};
