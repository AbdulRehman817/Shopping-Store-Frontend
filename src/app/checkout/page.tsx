"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// ✅ Type for decoded JWT token
type TokenPayload = {
  userId: string;
  email?: string;
  exp?: number;
};

const Checkout = () => {
  const router = useRouter();

  // ✅ Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    country: "",
    postalCode: "",
  });

  const [userId, setUserId] = useState<string | null>(null);     // 🧑 Authenticated User ID
  const [cartItems, setCartItems] = useState<any[]>([]);         // 🛒 Loaded Cart Items

  // 🔄 Load cart and decode token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedCart = localStorage.getItem("cart");

    // ✅ Decode user token
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUserId(decoded.userId);
        console.log("✅ Decoded Token:", decoded);
      } catch (err) {
        console.error("❌ Invalid token");
      }
    }

    // ✅ Load cart from localStorage
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      console.log("🛒 Loaded Cart Items:", parsedCart);
    }
  }, []);

  // 🖊 Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📦 Handle form submission (place order)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⚠️ Check for missing authentication or cart
    if (!userId) return alert("User not authenticated.");
    if (cartItems.length === 0) return alert("Cart is empty.");

    // 📨 Final payload to send to backend
    const payload = {
      userId,
      items: cartItems.map((item) => ({
        productId: item._id || item.productId,
        quantity: item.quantity,
      })),
      shippingInfo: formData,
    };

    try {
      const res = await fetch("http://localhost:3000/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        localStorage.removeItem("cart"); // ✅ Clear cart on successful order
        router.push("/orderconfirmation");
      } else {
        const data = await res.json();
        alert(data.message || "Order failed.");
      }
    } catch (error) {
      console.error("🚨 Order Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white px-6 py-12 mt-[60px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-[#1E293B] p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-[#FACC15] text-center mb-8">
          Shipping Details
        </h2>

        {/* 📋 Shipping Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* 🧍 Full Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* 📧 Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* ☎️ Phone Number */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="+92 300 1234567"
              className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* 🌍 Country */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Country</label>
            <input
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Pakistan"
              className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* 🏙️ City */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">City</label>
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Karachi"
              className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* 🔢 Zip Code */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Zip Code</label>
            <input
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
              required
              placeholder="74000"
              className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* 🏠 Address */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-1">Address</label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="House No, Street, Area"
              className="w-full bg-[#0F172A] border border-gray-600 px-4 py-2 rounded-lg text-white placeholder-gray-400"
            />
          </div>

          {/* ✅ Submit Button */}
          <div className="md:col-span-2 text-center pt-4">
            <button
              type="submit"
              className="bg-[#FACC15] text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Checkout;
