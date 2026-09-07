import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dcaribx.vercel.app"),
  title: {
    default: "DelCaribe — Coleccionista de mundos",
    template: "%s — DelCaribe",
  },
  description:
    "Universo personal de DelCaribe: fotografía, música, cultura, motor, terror y código.",
  applicationName: "DelCaribe",
  authors: [{ name: "DelCaribe" }],
  creator: "DelCaribe",
  alternates: { canonical: "/" },
  openGraph: {
    title: "DelCaribe — Coleccionista de mundos",
    description: "Fotografía, música, cultura, motor, terror y código.",
    url: "/",
    siteName: "DelCaribe",
    locale: "es_PE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
