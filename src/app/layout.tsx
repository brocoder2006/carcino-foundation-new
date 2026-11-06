import type { Metadata } from "next";
import { Inter, Roboto_Mono, Instrument_Serif, Space_Grotesk, Syne } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://carcinofoundationofficial.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Carcino Foundation - Breaking Down Cancer for Everyone",
    template: "%s | The Carcino Foundation",
  },
  description:
    "From rural cancer care infrastructure and veterinary oncology to youth-driven cancer literacy, The Carcino Foundation turns knowledge into early detection and action.",
  keywords: [
    "Carcino Foundation",
    "The Carcino Foundation",
    "carcinofoundationofficial.org",
    "Cancer Literacy",
    "Oncology",
    "Cancer Support Foundation",
    "Cancer Awareness and Guidance",
    "Early Cancer Detection",
    "Rural Cancer Care",
    "Veterinary Oncology",
    "FinFlare 2025",
    "Cancer Patient Navigation",
    "Oncology Emotional Support",
    "Cancer Education Resources",
  ],
  authors: [{ name: "The Carcino Foundation" }],
  creator: "The Carcino Foundation",
  publisher: "The Carcino Foundation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "The Carcino Foundation - Breaking Down Cancer for Everyone",
    description:
      "Turning knowledge into action: rural cancer care, veterinary oncology, and cancer literacy for earlier detection.",
    siteName: "The Carcino Foundation",
    images: [
      {
        url: "/tcf-ribbon-clean.png",
        width: 1200,
        height: 630,
        alt: "The Carcino Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Carcino Foundation",
    description: "Breaking Down Cancer for Everyone.",
    creator: "@carcinoofficial",
    images: ["/tcf-ribbon-clean.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${winterSolace.variable} ${robotoMono.variable} ${spaceGrotesk.variable} ${syne.variable}`}
    >
      <body suppressHydrationWarning className="antialiased min-h-screen bg-[#0B0B0C]">
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}

