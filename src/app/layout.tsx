import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.scss";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "React Pokedex | For advanced pokeinfo",
  description: "A advanced pokemon data",
  icons: "/icons/pokeball.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
