"use client";

import type { Metadata } from "next";
import { AuthProvider } from "./AuthContext/authcontext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./Navbar/page";
import Footer from "./footer/page";

// ✅ Import fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useLenis(); // ✅ Global smooth scrolling using Lenis

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Wrap everything inside AuthProvider so Navbar and children can access user */}
        <AuthProvider>
          {/* ✅ Navbar uses user from AuthContext */}
          <Navbar />

          {children}

          {/* ✅ Footer */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
