"use client";
// import { ThemeProvider } from "next-themes";
import { Sidebar } from "../../components/sidebar";
import { SlimSidebar } from "../../components/slimSider";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues by ensuring this runs only on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-full bg-white dark:bg-black"></div>; // Placeholder until theme is applied
  }

  return (
    // <ThemeProvider attribute="class" defaultTheme="light">
      <div className="flex h-screen">
        <Sidebar />
        <div className="py-5 lg:px-5 w-full h-screen overflow-auto dark:bg-black dark:text-white">
          {children}
        </div>
        <SlimSidebar />
      </div>
    // </ThemeProvider> 
  );
}
