"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../Redux/cartSlice";
import { toast } from "react-toastify";

import type { RootState } from "../Redux/store";
import Image from "next/image";
import Loader from "../components/Loader";

/* ------------------------------------
🧾 Type Definitions
------------------------------------- */
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface OrderItem {
  productId: Product;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

interface TokenPayload {
  userId: string;
  email?: string;
  exp?: number;
}

/* 📦 Order Status Steps */
const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.allCart.cart || []);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  /* ✅ Load cart from localStorage on mount */
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart)));
    }
  }, [dispatch]);

  /* 💾 Sync cart to localStorage when it updates */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* 🚀 Fetch user's order data */
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const userId = decoded.userId;

        const res = await fetch(
          `https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/admin/user/${userId}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error("Failed to fetch orders.");
        setOrders(data.orders || []);
      } catch (err: any) {
        toast.error(err.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* 🧮 Helper: Calculate total cart price */

  // * Loading state
  if (loading)
    return (
      <p className="text-[#facc15] text-center mt-20 text-lg">
        <Loader />
      </p>
    );

  // * Error state

  // * No orders found
  if (!orders.length)
    return (
      <p className="text-[#facc15] text-center mt-20 text-lg">
        No recent orders found.
      </p>
    );

  // ✅ Use latest order
  const latestOrder = orders[0];

  const total = latestOrder.items
    .reduce((sum, item) => sum + item.quantity * item.productId.price, 0)
    .toFixed(2);

  // 🔄 Map order status to index
  const currentStepIndex =
    latestOrder.status === "Pending"
      ? 1
      : latestOrder.status === "Shipped"
      ? 2
      : latestOrder.status === "Delivered"
      ? 3
      : 0;

  return (
    <motion.div
      className="min-h-screen bg-[#1E293B] text-[#facc15] px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ Confirmation Header */}
      <div className="text-center mt-[40px] mb-12">
        <CheckCircle size={64} className="mx-auto text-[#facc15]" />
        <h1 className="text-4xl font-bold mt-4">Order Confirmed</h1>
        <p className="text-[#e2e8f0] mt-2">
          Your package will be delivered within 2–3 business days.
        </p>
      </div>

      {/* 🚚 Order Status Tracker */}
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl font-semibold mb-4">Order Status</h2>
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const isActive = i <= currentStepIndex;
            return (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isActive ? "bg-[#facc15] text-[#0F172A]" : "bg-gray-700"
                  }`}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-full h-1 mt-2 ${
                      i < currentStepIndex ? "bg-[#facc15]" : "bg-gray-700"
                    }`}
                  />
                )}
                <span className="mt-2 text-sm text-center">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🧾 Order Summary */}
      <div className="max-w-3xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow-2xl space-y-4">
        <h2 className="text-xl font-semibold border-b border-gray-600 pb-4">
          Your Order
        </h2>

        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-700 pb-4"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg border border-gray-600"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
            <div className="text-lg font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        <div className="flex justify-between text-lg font-bold pt-4">
          <span>Total</span>
          <span className="text-[#facc15]">${total}</span>
        </div>
      </div>

      {/* 🛒 Continue Shopping */}
      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-[#facc15] text-[#0F172A] rounded-full text-lg font-semibold hover:bg-yellow-400 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;
