import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CiMa Progetti | Digital Architecture & Integration",
  description:
    "Progettiamo la struttura digitale del vostro business. Portali, database, e-commerce, automazioni IA e cybersicurezza.",
  icons: {
    icon: [
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for third-party domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Material Symbols with swap for faster first paint */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          as="font"
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHAPMtMT7kjjj0P.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Optimize LCP by reducing render-blocking resources */}
        <meta name="viewport" content="viewport-fit=cover" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
