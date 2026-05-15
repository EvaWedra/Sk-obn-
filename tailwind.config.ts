import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7f4",
          100: "#dcede6",
          200: "#bbdacf",
          300: "#8fc0b0",
          400: "#5fa08e",
          500: "#3d8474",
          600: "#2d6a5f",
          700: "#25554d",
          800: "#1f443e",
          900: "#1a3834",
        },
        cream: {
          50: "#fffdf5",
          100: "#fff9e6",
          200: "#fef0c7",
          300: "#fde199",
        },
        amber: {
          400: "#f59e0b",
          500: "#d97706",
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
