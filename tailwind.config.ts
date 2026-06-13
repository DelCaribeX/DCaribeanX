import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: "var(--gold)",
        "gold-soft": "var(--gold-soft)",
        surface: "var(--surface)",
        "surface-border": "var(--surface-border)",
        "muted-foreground": "var(--muted-foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
