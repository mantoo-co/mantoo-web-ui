import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";
import SiteNavbar from "../components/SiteNavbar";
import SiteFooter from "../components/SiteFooter";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mantoo",
  description: "Wearable blankets hechos en Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} d-flex flex-column min-vh-100`} suppressHydrationWarning>
        <BootstrapClient />
        <SiteNavbar />
        <main className="flex-grow-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
