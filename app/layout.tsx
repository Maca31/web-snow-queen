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
  title: "La Reina de las Nieves – Story Experience",
  description:
    "Experiencia web cinematográfica de storytelling inspirada en 'La Reina de las Nieves', con animaciones GSAP y efectos inmersivos.",
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
