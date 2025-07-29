"use client";
import { AuthProvider } from "./AuthContext/authcontext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./Navbar/page";
import Footer from "./footer/page";
import { Provider } from "react-redux";
import store from "./Redux/store";
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
        <Provider store={store}>
          {/* ✅ Wrap everything inside AuthProvider so Navbar and children can access user */}
          <AuthProvider>
            {/* ✅ Navbar uses user from AuthContext */}
            <Navbar />

            {children}
            {/* ✅ Footer */}
            {/* <ToastContainer position="top-right" /> */}
            <Footer />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
