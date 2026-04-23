import type { Config } from "tailwindcss";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1E3F",
          50: "#EEF2F8",
          100: "#D5DEEE",
          200: "#A8BBDC",
          300: "#7B98CA",
          400: "#4E75B8",
          500: "#2F568F",
          600: "#1F3E6B",
          700: "#143054",
          800: "#0A1E3F",
          900: "#061429",
          950: "#030A16",
        },
        champagne: {
          DEFAULT: "#E8DFC8",
          50: "#FAF7F0",
          100: "#F3EEDE",
          200: "#E8DFC8",
          300: "#D9C9A3",
          400: "#C8B88A",
          500: "#B19B6A",
          600: "#917D4F",
          700: "#70603C",
          800: "#4F4429",
          900: "#2E2818",
        },
        forest: {
          DEFAULT: "#1F4A3A",
          100: "#CFDBD3",
          200: "#9EB8A8",
          300: "#6E947D",
          400: "#457659",
          500: "#2D5E47",
          600: "#1F4A3A",
          700: "#16382B",
          800: "#0D241C",
          900: "#06120E",
        },
        ivory: "#FAF7F0",
        sand: "#E8DFC8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: {
        wider: "0.12em",
        widest: "0.24em",
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(180deg, #0A1E3F 0%, #061429 100%)",
        "gradient-gold": "linear-gradient(135deg, #E8DFC8 0%, #C8B88A 100%)",
        "affida-pattern": `url('${basePath}/pattern-affida.svg')`,
      },
      boxShadow: {
        premium: "0 20px 60px -20px rgba(10, 30, 63, 0.35)",
        gold: "0 0 0 1px rgba(200, 184, 138, 0.3), 0 20px 40px -20px rgba(200, 184, 138, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out both",
        "fade-up": "fadeUp 0.7s ease-out both",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
