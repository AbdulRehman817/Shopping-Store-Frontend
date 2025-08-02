"use client";
import { AuthProvider } from "./AuthContext/authcontext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./Navbar/page";
import Footer from "./footer/page";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const pathname = usePathname();

  useLenis(); // ✅ Global smooth scrolling using Lenis
  const hideLayoutRoutes = ["/login", "/signup"];
  const isHiddenLayout =
    pathname.startsWith("/admin") || hideLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {/* ✅ Wrap everything inside AuthProvider so Navbar and children can access user */}
          <AuthProvider>
            {/* ✅ Navbar uses user from AuthContext */}
            {!isHiddenLayout && <Navbar />}

            {children}
            {/* ✅ Footer */}
            <ToastContainer position="top-right" />
            {!isHiddenLayout && <Footer />}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
