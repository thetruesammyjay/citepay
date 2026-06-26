import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18A8FF",
        secondary: "#5DDCFF",
        accent: "#0B74FF",
        dark: {
          900: "#03111F",
          800: "#071F35",
          700: "#0B3154"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(93, 220, 255, 0.28)",
        violet: "0 0 60px rgba(24, 168, 255, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
