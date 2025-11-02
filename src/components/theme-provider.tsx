"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
