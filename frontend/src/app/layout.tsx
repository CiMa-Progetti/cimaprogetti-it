import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/cp/Nav";
import CookieConsent from "@/components/cp/CookieConsent";
import { ThemeProvider, themeNoFlashScript } from "@/components/theme/ThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

export const metadata: Metadata = {
  title: "CiMa Progetti | Software House di persone",
  description:
    "Software su misura, automazione dei processi, IA locale, cybersicurezza e formazione per PMI e professionisti. Sopralluogo gratuito.",
  icons: {
    icon: [
      { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body>
        <Script id="cp-theme" strategy="beforeInteractive">
          {themeNoFlashScript}
        </Script>
        <ThemeProvider>
          <Nav />
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
