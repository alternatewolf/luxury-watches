import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";

const ballinger = localFont({
  src: "./fonts/Ballinger Mono Regular.ttf",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
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
      <body className={ballinger.className}>
        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
