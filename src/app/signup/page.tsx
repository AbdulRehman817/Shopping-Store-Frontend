"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Type for user state
interface SignupUser {
  name: string;
  email: string;
  password: string;
  image: File | null;
}

const Signup: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState<SignupUser>({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const [message, setMessage] = useState<string>("");

  // Handle text input changes
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setUser((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      if (user.image) {
        formData.append("image", user.image);
      }

      const response = await fetch(
        "https://shopping-store-alpha-eight.vercel.app/api/v1/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: { message?: string; user?: any } = await response.json();

      if (!response.ok) {
        setMessage(data.message || "❌ Registration failed. Check your data.");
        throw new Error(data.message || "Registration failed");
      }

      setMessage("✅ Registered successfully!");
      console.log("Registered:", data);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <motion.div
        className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-6 py-16 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-5xl bg-[#1E293B] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#334155]">
          {/* Left Panel for Branding */}
          <div className="hidden md:flex flex-col justify-center items-center bg-[#0F172A] w-1/2 p-10">
            <h2 className="text-3xl font-bold text-[#FACC15] mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-400 text-center">
              Sign up to get access to exclusive offers, new arrivals, and more.
            </p>
          </div>

          {/* Right Panel with Form */}
          <div className="w-full md:w-1/2 bg-[#1E293B] p-8 md:p-10">
            <h3 className="text-2xl font-bold text-[#FACC15] mb-6 text-center">
              Create Your Account
            </h3>
            <div className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={user.name}
                  onChange={handleInput}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Profile Image
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 px-4 bg-[#0F172A] text-gray-400 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-yellow-400">
                  <span>Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
                {user.image && (
                  <p className="text-sm text-gray-400 mt-2">
                    Selected: {user.image.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#E11D48] hover:bg-pink-600 transition text-white py-2 rounded-lg font-semibold"
              >
                Sign Up
              </button>

              {/* Show success/error message */}
              {message && (
                <p className="text-center text-sm mt-4 text-yellow-400">
                  {message}
                </p>
              )}
            </div>

            {/* Redirect to login page */}
            <p className="mt-6 text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#FACC15] font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </form>
  );
};
