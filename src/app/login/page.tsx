"use client";
import { motion } from "framer-motion";
import { useAuth } from "../AuthContext/authcontext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();     
  const { storetokenInLocalStorage } = useAuth();
  const [error, setError] = useState<string | null>(null); // ✅ Use string | null for error
  // * user state mein email, password, aur name store hota hai
  const [user, setUser] = useState({ name: "", password: "", email: "" });

  // TODO: Jab user input fields mein kuch likhta hai to ye function data update karta hai
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value, // * yeh sirf usi field ko update karega jahan user likh raha hai
    }));
  };

  // ! Login form submit hone par ye function call hota hai
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // * page ko reload hone se rokta hai

    try {
      // * backend API ko login data send karte hain
      const response = await fetch(`http://localhost:3000/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // ! agar response ok nahi hai to error throw karo
      const res_data = await response.json();
      if (!response.ok) {
        setError("Login failed");
        return;
      }
      if (response.ok && res_data.accessToken) {
        // toast.success("Login successful");
        storetokenInLocalStorage(res_data.accessToken);
        console.log(
          "Token stored in localStorage:",
          localStorage.getItem("token")
        );
        router.push("/");
      } else {
        setError("Invalid credentials");
        // toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
      // toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* * Page layout animation with framer-motion */}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-6 py-16 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* * Main container with shadow and border */}
        <div className="w-full max-w-5xl bg-[#1E293B] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#334155]">
          {/* ! Left Section - Info Panel (sirf large screens pe dikhega) */}
          <div className="hidden md:flex flex-col justify-center items-center bg-[#0F172A] w-1/2 p-10">
            <h2 className="text-3xl font-bold text-[#FACC15] mb-4">
              Welcome Back!
            </h2>
            <p className="text-gray-400 text-center">
              Log in to access your account, manage orders, and explore new
              arrivals!
            </p>
          </div>

          {/* ! Right Section - Login Form */}
          <div className="w-full md:w-1/2 bg-[#1E293B] p-8 md:p-10">
            <h3 className="text-2xl font-bold text-[#FACC15] mb-6 text-center">
              Login to Your Account
            </h3>

            <div className="space-y-5">
              {/* * Email Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  placeholder="you@example.com"
                  value={user.email}
                  className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              {/* * Password Input Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInput}
                  value={user.password}
                  placeholder="••••••••"
                  className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
              </div>

              {/* * Error Message */}
              {error && (
                <div className="text-red-400 text-sm text-center">{error}</div>
              )}

              {/* * Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#E11D48] hover:bg-pink-600 transition text-white py-2 rounded-lg font-semibold"
              >
                Login
              </button>
            </div>

            {/* * Link to Signup Page */}
            <p className="mt-6 text-sm text-center text-gray-400">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="text-[#FACC15] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default Login;
