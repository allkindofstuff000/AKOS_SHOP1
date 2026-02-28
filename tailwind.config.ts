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
        brand: {
          bg: "#070709",
          soft: "#0b0b10",
          card: "#0f0f16",
          neonRed: "#ff4d6d",
          neonPink: "#ff4fc6",
          neonPurple: "#a855f7",
          neonCyan: "#22d3ee",
        },
      },
      animation: {
        "float-slow": "float-slow 16s ease-in-out infinite",
        "float-fast": "float-fast 11s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2.3s ease-in-out infinite",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(24px, -18px, 0) scale(1.08)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(-16px, 22px, 0) scale(1.05)" },
        },
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(168, 85, 247, 0.2)" },
          "50%": { boxShadow: "0 0 22px rgba(34, 211, 238, 0.35)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
