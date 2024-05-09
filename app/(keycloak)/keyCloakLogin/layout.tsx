import React from "react";
import { Providers } from "@/app/utilsFunctions/Providers/NextUIProvider";
import "./globals.css";
 import NextThemeProvider from "@/app/utilsFunctions/Providers/NextThemesProvider";
import { Inter } from "next/font/google";
import Favicon from "/public/favicon.ico";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes";

import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Torus 9X App",
  description: "Generated by create next app",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <NextUIProvider>
            <ThemeProvider>
          <NextThemeProvider>{children}</NextThemeProvider>
          </ThemeProvider>
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
