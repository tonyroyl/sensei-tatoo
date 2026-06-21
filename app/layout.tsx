import type { Metadata } from "next";
import { Inter, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-brush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sensei Tattoo — Studio d'encre japonaise",
  description:
    "Studio de tatouage spécialisé dans l'irezumi et le trait fin. Sur rendez-vous.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${shippori.variable}`}>
      <body className="ink-grain min-h-screen">{children}</body>
    </html>
  );
}
