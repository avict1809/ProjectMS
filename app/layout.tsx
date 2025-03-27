"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

import "./globals.css";
import ProgressBar from "@/components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Prevent Hydration Errors */}
        {mounted ? (
          <ThemeProvider attribute="class"  enableSystem={false}>
            <ProgressBar />
            {children}
          </ThemeProvider>
        ) : (
          <div className="h-screen w-full bg-white dark:bg-black"></div>
        )}
      </body>
    </html>
  );
}
