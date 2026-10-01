import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coal: { DEFAULT: "#0e0d0c", soft: "#161311" },
        card: "#1b1815",
        line: "#2a2521",
        ink: "#f2ede6",
        muted: "#a89e93",
        ember: { DEFAULT: "#ff6a2b", light: "#ffb347" },
      },
    },
  },
  plugins: [],
};

export default config;
