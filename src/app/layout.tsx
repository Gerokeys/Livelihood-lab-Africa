import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Livelihood Lab Africa | Research, Strategy & Impact",
    template: "%s | Livelihood Lab Africa",
  },
  description:
    "Evidence-based research, strategic consulting, MEAL, and capacity development for inclusive and sustainable development across Kenya and Africa.",
  keywords: [
    "development research",
    "MEAL",
    "strategic consulting",
    "Kenya",
    "Africa",
    "livelihoods",
    "evidence",
    "policy",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Livelihood Lab Africa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
