import type { Config } from "tailwindcss";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Paleta oficial Affida Partners — Manual de Marca, dez/2025.
 *
 * Primárias:   Dress Blues (TCX 19-4028) + Midnight Blue #173F65 (Pantone 18-4005 TCX) + Brown #423933 (Pantone 19-0712 TPX)
 * Secundárias: Greige #928475 (Pantone 16-1109 TCX) + UP #E1D9C6 (Pantone 2157)
 * Apoio:       Comoyoko #FFFFFF + Neutral Black #222222 (Pantone Neutral Black C)
 *
 * Mantemos os nomes de família (navy, champagne, forest) para preservar compatibilidade com
 * os componentes já construídos, mas todos os valores foram remapeados para a paleta oficial.
 */
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
        // Primária azul: escala de Dress Blues → Midnight Blue
        navy: {
          DEFAULT: "#173F65",
          50: "#EEF2F8",
          100: "#D9E2EE",
          200: "#B2C4D9",
          300: "#7F9DBD",
          400: "#4F7399",
          500: "#2C567E",
          600: "#1F4870",
          700: "#173F65", // Midnight Blue oficial (Pantone 18-4005 TCX)
          800: "#0F2B48",
          900: "#0B1E33", // Dress Blues oficial (Pantone 19-4028 TCX)
          950: "#06121F",
        },
        // Secundária neutra quente: UP → Greige (substitui o dourado anterior)
        champagne: {
          DEFAULT: "#E1D9C6",
          50: "#FAF6EE",
          100: "#F1EADB",
          200: "#E1D9C6", // UP oficial (Pantone 2157)
          300: "#CCC0A8",
          400: "#B5A78C",
          500: "#928475", // Greige oficial (Pantone 16-1109 TCX)
          600: "#7C7062",
          700: "#655B4F",
          800: "#4D4539",
          900: "#322D24",
        },
        // Accent escuro: Brown oficial (substitui o verde "forest" anterior)
        forest: {
          DEFAULT: "#423933",
          50: "#F2EFEC",
          100: "#DCD3CC",
          200: "#B3A59A",
          300: "#8B7B6E",
          400: "#6A5B4F",
          500: "#544740",
          600: "#423933", // Brown oficial (Pantone 19-0712 TPX)
          700: "#332C27",
          800: "#22201D",
          900: "#15130F",
        },
        // Apoio
        ivory: "#FFFFFF",          // Comoyoko (Pantone)
        sand: "#F5F1E8",           // fundo creme institucional
        ink: "#222222",            // Neutral Black C (Pantone)
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        serif: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        ultralight: "200",
        light: "300",
      },
      letterSpacing: {
        wider: "0.12em",
        widest: "0.24em",
        brand: "0.36em",
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.005em" }],
      },
      // Manual p.18 (DON'T): "Evite gradientes e qualquer efeito de
      // estilização não oficial". Sem gradientes — só pattern oficial.
      // Pattern construído a partir do símbolo extraído do Manual de Marca.
      backgroundImage: {
        "affida-pattern": `url('${basePath}/affida-pattern.png')`,
      },
      boxShadow: {
        premium: "0 20px 60px -20px rgba(23, 63, 101, 0.35)",
        gold: "0 0 0 1px rgba(146, 132, 117, 0.25), 0 20px 40px -20px rgba(146, 132, 117, 0.35)",
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
