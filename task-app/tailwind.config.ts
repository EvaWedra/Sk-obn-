import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eafaf7",
          100: "#d1f2ea",
          200: "#a3e5d5",
          300: "#75d8c0",
          400: "#5cc9b0",
          500: "#4dbba8",
          600: "#3d968a",
          700: "#2e716a",
          800: "#1f4d49",
          900: "#123330",
        },
        gold: {
          50: "#fef8ec",
          100: "#fdedc9",
          200: "#fbdb93",
          300: "#f9c65d",
          400: "#f6b53c",
          500: "#f5a623",
          600: "#d1861a",
          700: "#a86815",
          800: "#7d4d10",
          900: "#53340b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
