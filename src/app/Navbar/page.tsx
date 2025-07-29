"use client"; // ! Zaroori hai jab aap client-side hooks use kar rahe ho like useState

import Link from "next/link";
import CartDropdown from "./CartDropdown";
import { ShoppingCart, LogIn, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // * Framer Motion for animations
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext/authcontext";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  // * State for mobile menu aur user profile open/close
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const totalItems = useSelector((state: any) =>
    state.allCart.cart.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0
    )
  );
  const router = useRouter(); // * Next.js navigation
  const { isLoggedIn, LogoutUser, user } = useAuth(); // * Auth context se data fetch kiya
  // console.log("User in Navbar:", user);

  // TODO: Logout function, user ko Login page pe redirect karta hai
  const SignoutUser = () => {
    LogoutUser();
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0F172A]/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* * Logo - Home page pe le jata hai */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-[#FACC15] tracking-wide"
        >
          JerseyBazaar
        </Link>

        {/* * Desktop Links - lg screen pe visible */}
        <div className="hidden lg:flex gap-8 text-white font-medium">
          <Link href="/" className="hover:text-[#FACC15] transition">
            Home
          </Link>
          <Link href="/teams" className="hover:text-[#FACC15] transition">
            Teams
          </Link>
          <Link href="/about" className="hover:text-[#FACC15] transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#FACC15] transition">
            Contact
          </Link>
        </div>

        {/* * Desktop Icons + Search bar */}
        <div className="hidden lg:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search shirts..."
            className="px-4 py-1 rounded-lg bg-[#1E293B] text-sm text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
          />

          <div className="relative">
            <button
              onClick={() => setShowCart(!showCart)}
              className="flex items-center gap-2"
            >
              <FaShoppingCart size={20} />
              <span className="bg-red-500 text-white rounded-full px-2 text-sm">
                {totalItems}
              </span>
            </button>
            {showCart && <CartDropdown />}
          </div>

          {!isLoggedIn ? (
            <Link href="/login">
              <LogIn
                className="text-white hover:text-[#FACC15] transition"
                size={22}
              />
            </Link>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 bg-[#1E293B] px-3 py-1 rounded-full hover:bg-[#334155] transition"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                {/* <User className="text-[#FACC15]" size={22} /> */}
                {user?.image && (
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                )}
              </button>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} // shuru mein invisible ho or thora upar jaye
                  animate={{ opacity: 1, y: 0 }} // Animate ho kar neeche aaye aur visible ho
                  exit={{ opacity: 0, y: -10 }} // Band hone par wapas halka ho jaye
                  transition={{ duration: 0.2, ease: "easeInOut" }} // Speed 0.2 seconds
                  className="absolute right-0 mt-2 w-56 bg-slate-800 text-white rounded-lg shadow-lg z-10"
                >
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 text-white rounded-lg shadow-lg z-10">
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="font-bold">
                        {user?.name || "Bonnie Green"}
                      </p>
                      <p className="text-[12px] text-gray-300">
                        {user?.email || "user@email.com"}
                      </p>
                    </div>
                    <button
                      onClick={SignoutUser}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* * Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* * Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} // shuru mein invisible ho or thora upar jaye
          animate={{ opacity: 1, y: 0 }} // Animate ho kar neeche aaye aur visible ho
          exit={{ opacity: 0, y: -10 }} // Band hone par wapas halka ho jaye
          transition={{ duration: 0.2, ease: "easeInOut" }} // Speed 0.2 seconds
        >
          <div className="lg:hidden bg-[#0F172A] px-6 pb-6 pt-4 space-y-4 border-t border-gray-700">
            <Link href="/" className="block text-white hover:text-[#FACC15]">
              Home
            </Link>
            <Link
              href="/teams"
              className="block text-white hover:text-[#FACC15]"
            >
              Teams
            </Link>
            <Link
              href="/about"
              className="block text-white hover:text-[#FACC15]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-white hover:text-[#FACC15]"
            >
              Contact
            </Link>

            <input
              type="text"
              placeholder="Search shirts..."
              className="w-full px-4 py-2 rounded bg-[#1E293B] text-white placeholder-gray-400 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
            />

            <div className="flex gap-4 pt-2">
              <Link href="/cart">
                <ShoppingCart
                  className="text-white hover:text-[#FACC15]"
                  size={22}
                />
              </Link>
              {!isLoggedIn ? (
                <Link href="/login">
                  <LogIn
                    className="text-white hover:text-[#FACC15]"
                    size={22}
                  />
                </Link>
              ) : (
                <div className="relative">
                  <button
                    className="flex items-center gap-2 bg-[#1E293B] px-3 py-1 rounded-full hover:bg-[#334155] transition"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <User className="text-[#FACC15]" size={22} />
                    <span className="text-white font-semibold">
                      {user?.name || "User"}
                    </span>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800 text-white rounded-lg shadow-lg z-10">
                      <div className="px-4 py-3 border-b border-slate-700">
                        <p className="font-bold">
                          {user?.name || "Bonnie Green"}
                        </p>
                        <p className="text-[12px] text-gray-300">
                          {user?.email || "user@email.com"}
                        </p>
                      </div>
                      <button
                        onClick={SignoutUser}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
