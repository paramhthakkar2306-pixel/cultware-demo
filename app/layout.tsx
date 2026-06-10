import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import SozoBadge from "@/components/SozoBadge";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CULT WARE — Enter The Cult",
  description:
    "CULT WARE — dark streetwear forged in ritual and shadow. A cinematic concept experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <SozoBadge />
      </body>
    </html>
  );
}
