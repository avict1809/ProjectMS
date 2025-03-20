"use client";
import { ThemeProvider } from "next-themes";

export function MyThemeProvider({ children }:{ children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
