import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F2",
        blush: "#F8D7DA",
        roseGold: "#B76E79",
        gold: "#D4AF37",
        charcoal: "#2C2C2C",
        lightGray: "#F5F5F5",
      },
      fontFamily: {
        display: ["var(--font-playfair)"],
        sans: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },
      boxShadow: {
        'luxury': '0 20px 60px -15px rgba(183, 110, 121, 0.18)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #B76E79 0%, #D4AF37 100%)',
        'blush-gradient': 'linear-gradient(180deg, #FFF8F2 0%, #FFFFFF 100%)',
      }
    },
  },
  plugins: [],
};
export default config;
