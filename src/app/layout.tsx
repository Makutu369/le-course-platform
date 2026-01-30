import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love courses",
  description: "Access all love economy courses from this page",
};

import MobileNav from "@/components/mobile-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark antialiased pb-16 md:pb-0`}>
        <Header />
        {children}
        <MobileNav />
        <Toaster richColors />
      </body>
    </html>
  );
}
