import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "DelCaribe — Portafolio Personal",
  description:
    "Coleccionista de mundos. Música, anime, literatura, terror, código. Portafolio personal de DelCaribe.",
  openGraph: {
    title: "DelCaribe — Portafolio Personal",
    description: "Coleccionista de mundos. Música, anime, literatura, terror, código.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
