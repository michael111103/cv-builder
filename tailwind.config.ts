import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d7fd",
          300: "#a5bcfb",
          400: "#8197f8",
          500: "#6272f3",
          600: "#4a52e8",
          700: "#3d42d0",
          800: "#3237a8",
          900: "#2e3485",
          950: "#1c1f52",
        },
        accent: {
          400: "#f59e42",
          500: "#f97316",
          600: "#ea580c",
        },
        surface: {
          50: "#f8f9fc",
          100: "#f0f2f8",
          200: "#e4e7f0",
          800: "#1e2130",
          900: "#141624",
          950: "#0d0f1a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        japanese: ["Noto Sans JP", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
        "slide-in-right": "slideInRight 0.4s ease forwards",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(98, 114, 243, 0.3)",
        "glow-lg": "0 0 40px rgba(98, 114, 243, 0.4)",
        card: "0 4px 24px rgba(0,0,0,0.12)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
