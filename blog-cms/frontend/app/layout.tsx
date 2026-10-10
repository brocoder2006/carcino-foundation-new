import React from "react";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

export const metadata = {
  title: "ApexPulse Headless Blog CMS",
  description: "Production headless blog publishing platform powered by Django and Next.js App Router.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
