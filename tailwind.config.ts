import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#05050a",
          900: "#070710",
          800: "#0b0b12",
          700: "#12121c",
        },
        gold: {
          DEFAULT: "#c8a35a",
          light: "#d9b777",
          dark: "#9a7a3c",
        },
        bone: "#ece6d8",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -3%)" },
          "30%": { transform: "translate(3%, -2%)" },
          "50%": { transform: "translate(-1%, 2%)" },
          "70%": { transform: "translate(2%, 1%)" },
          "90%": { transform: "translate(-3%, 2%)" },
        },
      },
      animation: {
        grain: "grain 8s steps(6) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
