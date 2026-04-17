import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Suspense } from "react";
import MobileNav from "@/components/mobile-nav";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Love courses",
  description: "Access all love economy courses from this page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased pb-16 md:pb-0`}>
        <Suspense fallback={<div className="h-16 w-full border-b animate-pulse" />}>
          <Header />
        </Suspense>
        {children}
        <MobileNav />
        <Toaster richColors />
      </body>
    </html>
  );
}
