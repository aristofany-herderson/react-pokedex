import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-default",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "React Pokedex | For advanced pokeinfo",
  description: "A advanced pokemon data",
  icons: "/pokeball.ico",
  creator: "Aristofany Herderson",
  keywords: "Pokemon, Pokedex, Pokeapi",
  openGraph: {
    type: "website",
    images: "/images/open-graph.webp",
    title: "React Pokedex",
    description: "For advanced pokeinfo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body className={poppins.variable}>{children}</body>
    </html>
  );
}
