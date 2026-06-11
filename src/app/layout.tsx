import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display, Caveat, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/Layout/SmoothScroll";
import CustomCursor from "@/components/Layout/CustomCursor";
import Header from "@/components/Layout/Header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krrish Raj — Builder, Engineer, Creator",
  description: "Personal scrapbook and design case study of Krrish Raj. A creative developer exploring the boundaries of AI, software engineering, and premium digital design.",
  keywords: ["Krrish Raj", "Creative Developer", "Software Engineer", "Scrapbook Portfolio", "Interactive Story", "AI Engineer", "Next.js Portfolio"],
  authors: [{ name: "Krrish Raj" }],
  openGraph: {
    title: "Krrish Raj — Builder, Engineer, Creator",
    description: "Personal scrapbook and design case study of Krrish Raj.",
    type: "website",
    locale: "en_US",
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
      className={`${spaceGrotesk.variable} ${playfair.variable} ${syne.variable} ${caveat.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-charcoal text-parchment font-sans selection:bg-amber-accent selection:text-charcoal min-h-screen antialiased overflow-x-hidden">
        <CustomCursor />
        <Header />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
