"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, setCart } from "../Redux/cartSlice";
import type { RootState } from "../Redux/store";
import Image from "next/image";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.allCart.cart || []);

  // ✅ Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  // 💾 Sync cart to localStorage when cart updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🧮 Helper: Calculate total cart price
  const getTotalPrice = () =>
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white px-6 py-[100px]">
      {/* 🛒 Header */}
      <motion.h2
        className="text-3xl font-bold text-[#FACC15] mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Shopping Cart
      </motion.h2>

      {/* ⚠️ Empty Cart */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 🧾 Render all cart items */}
          {cart.map((item) => (
            <motion.div
              key={item._id}
              className="bg-[#1E293B] rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-6"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* 🖼️ Product Image */}
              <Image
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-contain bg-white p-2 rounded-lg"
              />

              {/* 📝 Product Info */}
              <div className="flex-1 space-y-1">
                <h3 className="text-xl font-semibold text-[#FACC15]">
                  {item.name}
                </h3>
                <p className="text-gray-300 text-sm">{item.type}</p>
                <div className="flex items-center gap-2 text-sm mt-2">
                  Quantity:
                  <span className="bg-[#FACC15] text-black font-semibold px-2 py-1 rounded">
                    {item.quantity}
                  </span>
                </div>
              </div>

              {/* 💲 Price + Remove Button */}
              <div className="text-right">
                <p className="text-green-500 text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeItem(item._id))}
                  className="text-red-500 hover:text-red-600 mt-3 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </motion.div>
          ))}

          {/* 🧮 Cart Summary Section */}
          <div className="text-right pt-6 border-t border-gray-700 mt-10">
            <p className="text-lg font-semibold text-[#FACC15]">
              Subtotal: ${getTotalPrice()}
            </p>
            <Link
              href="/checkout"
              className="inline-block mt-4 bg-[#FACC15] hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold transition"
            >
              Proceed to Shipping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
