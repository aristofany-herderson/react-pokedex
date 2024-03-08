import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "React Pokedex | For advanced pokeinfo",
  description: "A advanced pokemon data",
  icons: "/icons/pokeball.svg",
  creator: "Aristofany Herderson",
  keywords: "Pokemon, Pokedex, Pokeapi",
  openGraph: {
    type: "website",
    images: "/images/open-graph.jpg",
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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
