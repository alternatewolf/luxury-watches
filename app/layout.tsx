import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bodoni_Moda } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const ballinger = localFont({
  src: "./fonts/Ballinger Mono Regular.ttf",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const muli = localFont({
  src: [
    {
      path: "./fonts/Muli Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Muli ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-muli",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luxury Watches",
  description: "Discover our curated selection of luxury timepieces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${muli.className} ${muli.variable} ${bodoniModa.variable}`}
      >
        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
