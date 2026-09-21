import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

const winterSolace = localFont({
  src: [
    {
      path: "../fonts/Winter Solace-normal-500-100.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Winter Solace-normal-700-100.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-winter-solace",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Carcino Foundation - Breaking Down Cancer for Everyone",
  description: "Carcino Foundation helps people navigate the emotional and practical realities of cancer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${winterSolace.variable} ${robotoMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-[#0B0B0C]">{children}</body>
    </html>
  );
}
