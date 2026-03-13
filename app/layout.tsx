import type { Metadata } from "next";
import { Playfair_Display, Nunito, Lora } from "next/font/google";
import "./globals.css";
import "../styles/character.css";
import { RootClient } from "@/components/RootClient";

const playfair = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const nunito = Nunito({
  variable: "--font-kids",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "La Reina de las Nieves | Cuento Interactivo Infantil",
  description:
    "Cuento animado e interactivo de La Reina de las Nieves para ninos. Experiencia web inmersiva con animaciones GSAP, scroll cinematografico y efectos de nieve. Basado en el clasico de Hans Christian Andersen.",
  keywords: [
    "cuento interactivo",
    "La Reina de las Nieves",
    "cuento infantil",
    "historia animada",
    "Hans Christian Andersen",
    "cuento web",
    "Snow Queen",
  ],
  authors: [{ name: "Maca31" }],
  openGraph: {
    title: "La Reina de las Nieves | Cuento Interactivo Infantil",
    description:
      "Vive la magica historia de Gerda y Kay en este cuento animado e interactivo. Toca, explora y descubre un mundo de hielo y amor.",
    type: "website",
    locale: "es_ES",
    siteName: "La Reina de las Nieves",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Reina de las Nieves | Cuento Interactivo",
    description:
      "Cuento animado e interactivo de La Reina de las Nieves. Toca, explora y descubre la historia.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${nunito.variable} ${lora.variable} bg-slate-950 text-slate-50 antialiased`}
      >
        <RootClient>{children}</RootClient>
      </body>
    </html>
  );
}
