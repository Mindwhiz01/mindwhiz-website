import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        // header switches from hamburger to full nav here
        nav: "1200px",
      },
      // `*-screen` utilities go through the viewport-unit vars from
      // globals.css so they stay truly full-screen under the short-laptop
      // `zoom: 0.8`.
      height: { screen: "calc(var(--vh) * 100)" },
      minHeight: { screen: "calc(var(--vh) * 100)" },
      maxHeight: { screen: "calc(var(--vh) * 100)" },
      width: { screen: "calc(var(--vw) * 100)" },
      minWidth: { screen: "calc(var(--vw) * 100)" },
      maxWidth: { screen: "calc(var(--vw) * 100)" },
      colors: {
        brand: {
          green: "#9CCC3C",
          greenDark: "#7DB022",
          magenta: "#F00C60",
          magentaDark: "#C40A4E",
          ink: "#0F1B2D",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        // normal state -> green glow -> back, for the footer "Hiring" badge
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(156, 204, 60, 0)",
            textShadow: "0 0 0 rgba(156, 204, 60, 0)",
          },
          "50%": {
            boxShadow: "0 0 12px 1px rgba(156, 204, 60, 0.65)",
            textShadow: "0 0 8px rgba(156, 204, 60, 0.75)",
          },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
