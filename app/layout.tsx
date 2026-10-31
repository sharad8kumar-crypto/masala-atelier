import type { Metadata, Viewport } from "next";
import { DM_Sans, Pinyon_Script, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: `${site.name} | Modern Indian Cafe & Restaurant`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: `${site.name} | Modern Indian Cafe & Restaurant`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf5ec",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${pinyon.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <RestaurantJsonLd />
        <ScrollProgress />
        <SmoothScroll />
        <Navbar />
        <main id="main" className="pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <CartDrawer />
        <Toaster theme="light" position="top-center" />
      </body>
    </html>
  );
}